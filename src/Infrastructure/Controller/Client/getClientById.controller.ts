import { Controller, Get, Param, Request, UseGuards } from "@nestjs/common";
import { GetClientByIdUseCase } from "../../../Application/Client/getClientById.useCase";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { Client } from "../../../Domain/client";
import { JwtAuthPassportGuard } from "../../Guard/Auth/jwt-auth.passport.guard";
import { NOT_FOUND_HTTP_CODE, NOT_FOUND_MESSAGE, NotFoundAppError } from "../../../Domain/Error/notFound.appError";
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ACCESS_DENIED_HTTP_CODE, ACCESS_DENIED_MESSAGE } from "../../../Domain/Error/accessDenied.appError";

@ApiTags('Clients')
@Controller()
export class GetClientByIdController {

  constructor(private getClientByIdUseCase: GetClientByIdUseCase) {}

  @ApiResponse({ status: 200, description: 'Client returned successfully'})
  @ApiResponse({ status: ACCESS_DENIED_HTTP_CODE, description: ACCESS_DENIED_MESSAGE})
  @ApiResponse({ status: NOT_FOUND_HTTP_CODE, description: NOT_FOUND_MESSAGE})
  @ApiBearerAuth()
  @ApiParam({name: 'clientId', description: 'A client Id', example: 'a0ece5db-cd14-4f21-812f-966633e7be86'})
  @UseGuards(JwtAuthPassportGuard)
  @Get('clients/:clientId')
  async getClientById(
    @Request() req,
    @Param() params: any
  ): Promise<AppResponseDto> {
    const userLoggedId = req.user.id;
    const client = await this.getClientByIdUseCase.handle(params.clientId, userLoggedId);
    return AppResponseDto.ok({ client: client.jsonSerialize() });
  }

}
