import { Controller, Get, Param } from "@nestjs/common";
import { GetClientByIdUseCase } from "../../../Application/Client/getClientById.useCase";

@Controller()
export class GetClientByIdController {

  constructor(private getClientByIdUseCase: GetClientByIdUseCase) {}

  @Get('clients/:clientId')
  async getClientById(@Param() params): Promise<any> {
    return await this.getClientByIdUseCase.handle(params.clientId);
  }

}
