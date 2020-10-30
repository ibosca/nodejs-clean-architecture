import { Controller, Get, HttpException, HttpStatus, Request, UseGuards } from "@nestjs/common";
import { GetClientByIdUseCase } from "../../../Application/Client/getClientById.useCase";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { Client } from "../../../Domain/client";
import { JwtAuthPassportGuard } from "../../Guard/Auth/jwt-auth.passport.guard";

@Controller()
export class GetClientByIdController {

  constructor(private getClientByIdUseCase: GetClientByIdUseCase) {}

  @UseGuards(JwtAuthPassportGuard)
  @Get('clients/:clientId')
  async getClientById(@Request() req): Promise<AppResponseDto> {
    const clientId = req.params.clientId;
    const userLoggedId = req.user.id;
    const client = await this.getClientByIdUseCase.handle(clientId, userLoggedId);
    return this.buildResponse(client);
  }

  private buildResponse(client: Client): AppResponseDto {

    if (!client) {
      throw new HttpException(AppResponseDto.notFound(), HttpStatus.NOT_FOUND);
    }

    return AppResponseDto.ok(client.jsonSerialize());

  }

}
