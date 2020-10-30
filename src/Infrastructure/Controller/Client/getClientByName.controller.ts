import { Controller, Get, HttpException, HttpStatus, Request, UseGuards } from "@nestjs/common";
import { Client } from "../../../Domain/client";
import { GetClientByNameUseCase } from "../../../Application/Client/getClientByName.useCase";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { JwtAuthPassportGuard } from "../../Guard/Auth/jwt-auth.passport.guard";

@Controller()
export class GetClientByNameController {

  constructor(private getClientByNameUseCase: GetClientByNameUseCase,) {}

  @UseGuards(JwtAuthPassportGuard)
  @Get('/clients')
  async getClientByUsername(@Request() req): Promise<AppResponseDto> {
    const clientName = req.query.name;
    this.guardValidateRequestData(clientName);
    const client = await this.getClientByNameUseCase.handle(clientName);
    return this.buildResponse(client);
  }

  private guardValidateRequestData(clientName: string): void {
    if (!clientName) {
      throw new HttpException(AppResponseDto.badRequest(), HttpStatus.BAD_REQUEST);
    }
  }

  private buildResponse(client: Client): AppResponseDto {

    if (!client) {
      throw new HttpException(AppResponseDto.notFound(), HttpStatus.NOT_FOUND);
    }

    return AppResponseDto.ok(client.jsonSerialize());

  }

}
