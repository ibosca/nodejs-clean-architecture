import { Controller, Get, Query, Request, UseGuards } from "@nestjs/common";
import { Client } from "../../../Domain/client";
import { GetClientByNameUseCase } from "../../../Application/Client/getClientByName.useCase";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { JwtAuthPassportGuard } from "../../Guard/Auth/jwt-auth.passport.guard";
import { NOT_FOUND_HTTP_CODE, NOT_FOUND_MESSAGE, NotFoundAppError } from "../../../Domain/Error/notFound.appError";
import {
  BAD_REQUEST_HTTP_CODE,
  BAD_REQUEST_MESSAGE,
  BadRequestAppError
} from "../../../Domain/Error/badRequest.appError";
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ACCESS_DENIED_HTTP_CODE, ACCESS_DENIED_MESSAGE } from "../../../Domain/Error/accessDenied.appError";

@ApiTags('Clients')
@Controller()
export class GetClientByNameController {

  constructor(private getClientByNameUseCase: GetClientByNameUseCase,) {}

  @ApiResponse({ status: 200, description: 'Return client successfully'})
  @ApiResponse({ status: BAD_REQUEST_HTTP_CODE, description: BAD_REQUEST_MESSAGE})
  @ApiResponse({ status: NOT_FOUND_HTTP_CODE, description: NOT_FOUND_MESSAGE})
  @ApiResponse({ status: ACCESS_DENIED_HTTP_CODE, description: ACCESS_DENIED_MESSAGE})
  @ApiBearerAuth()
  @ApiQuery({ name: 'name', description: 'The name of the user', example: 'Britney' })
  @UseGuards(JwtAuthPassportGuard)
  @Get('/clients')
  async getClientByUsername(
    @Request() req,
    @Query() query: any
  ): Promise<AppResponseDto> {
    const name = query.name
    const userLoggedId = req.user.id;
    this.guardValidateRequestData(name);
    const client = await this.getClientByNameUseCase.handle(name, userLoggedId);
    return this.buildResponse(client);
  }

  private guardValidateRequestData(clientName: string): void {
    if (!clientName) {
      throw new BadRequestAppError();
    }
  }

  private buildResponse(client: Client): AppResponseDto {

    if (!client) {
      throw new NotFoundAppError();
    }

    return AppResponseDto.ok({
      client: client.jsonSerialize()
    });

  }

}
