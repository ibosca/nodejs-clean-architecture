import { Controller, Get, Param, Request, UseGuards } from "@nestjs/common";
import { GetClientByIdUseCase } from "../../../Application/Client/getClientById.useCase";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { Client } from "../../../Domain/client";
import { JwtAuthPassportGuard } from "../../Guard/Auth/jwt-auth.passport.guard";
import { NotFoundAppError } from "../../../Domain/Error/notFound.appError";
import { ApiParam } from "@nestjs/swagger";

@Controller()
export class GetClientByIdController {

  constructor(private getClientByIdUseCase: GetClientByIdUseCase) {}

  @ApiParam({name: 'clientId', description: 'A client Id', example: 'a0ece5db-cd14-4f21-812f-966633e7be86'})
  @UseGuards(JwtAuthPassportGuard)
  @Get('clients/:clientId')
  async getClientById(
    @Request() req,
    @Param() clientId: string
  ): Promise<AppResponseDto> {
    const userLoggedId = req.user.id;
    const client = await this.getClientByIdUseCase.handle(clientId, userLoggedId);
    return this.buildResponse(client);
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
