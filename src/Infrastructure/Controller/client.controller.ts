import { Controller, Get, Param, Query } from "@nestjs/common";
import { GetClientByIdUseCase } from "../../Application/Client/getClientById.useCase";
import { GetClientByNameUseCase } from "../../Application/Client/getClientByName.useCase";

@Controller('clients')
export class ClientController {

  constructor(
    private getClientByIdUseCase: GetClientByIdUseCase,
    private getClientByNameUseCase: GetClientByNameUseCase,
  ) {}

  @Get(':clientId')
  async getClientById(@Param() params): Promise<any> {
    return await this.getClientByIdUseCase.handle(params.clientId);
  }

  @Get()
  async getClientByUsername(@Query('clientName') clientName: string): Promise<any> {
    return await this.getClientByNameUseCase.handle(clientName);
  }

  @Get(':clientId/policies')
  getPoliciesByClientId(@Param() params): string {
    return `This endpoint will return a policy list for ${params.clientId} client id`;
  }

}
