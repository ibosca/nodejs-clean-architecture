import { Controller, Get, Param, Query } from "@nestjs/common";
import { GetClientByIdUseCase } from "../../Application/Client/getClientById.useCase";
import { Client } from "../../Domain/client";

@Controller('clients')
export class ClientController {

  constructor(private getClientByIdUseCase: GetClientByIdUseCase) {
  }

  @Get(':clientId')
  getClientById(@Param() params): Client {
    return this.getClientByIdUseCase.handle(params.clientId);
  }

  @Get()
  getClientByUsername(@Query('clientName') clientName: string): string {
    return `This endpoint will return a client for ${clientName} username`;
  }

  @Get(':clientId/policies')
  getPoliciesByClientId(@Param() params): string {
    return `This endpoint will return a policy list for ${params.clientId} client id`;
  }

}
