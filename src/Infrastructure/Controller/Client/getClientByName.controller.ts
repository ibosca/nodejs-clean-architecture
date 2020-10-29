import { Controller, Get, Query } from "@nestjs/common";
import { Client } from "../../../Domain/client";
import { GetClientByNameUseCase } from "../../../Application/Client/getClientByName.useCase";

@Controller()
export class GetClientByNameController {

  constructor(private getClientByNameUseCase: GetClientByNameUseCase,) {}

  @Get('/clients')
  async getClientByUsername(@Query('name') clientName: string): Promise<Client> {
    return await this.getClientByNameUseCase.handle(clientName);
  }

}
