import { Controller, Get, HttpException, HttpStatus, Request, UseGuards } from "@nestjs/common";
import { Client } from "../../../Domain/client";
import { GetClientByNameUseCase } from "../../../Application/Client/getClientByName.useCase";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { JwtAuthPassportGuard } from "../../Guard/Auth/jwt-auth.passport.guard";
import { NotFoundAppError } from "../../../Domain/Error/notFound.appError";
import { BadRequestAppError } from "../../../Domain/Error/badRequest.appError";

@Controller()
export class GetClientByNameController {

  constructor(private getClientByNameUseCase: GetClientByNameUseCase,) {}

  @UseGuards(JwtAuthPassportGuard)
  @Get('/clients')
  async getClientByUsername(@Request() req): Promise<AppResponseDto> {
    const clientName = req.query.name;
    const userLoggedId = req.user.id;
    this.guardValidateRequestData(clientName);
    const client = await this.getClientByNameUseCase.handle(clientName, userLoggedId);
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

    return AppResponseDto.ok(client.jsonSerialize());

  }

}
