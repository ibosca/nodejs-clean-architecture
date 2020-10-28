import { Controller, Get, Param, Query } from "@nestjs/common";
import { GetClientByIdUseCase } from "../../Application/Client/getClientById.useCase";

@Controller('clients')
export class ClientController {

  constructor(private getClientByIdUseCase: GetClientByIdUseCase) {
  }

  @Get(':clientId')
  async getClientById(@Param() params): Promise<any> {
    const client = await this.getClientByIdUseCase.handle(params.clientId);
    return client;
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
