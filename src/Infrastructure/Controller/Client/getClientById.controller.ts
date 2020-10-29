import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { GetClientByIdUseCase } from "../../../Application/Client/getClientById.useCase";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { Client } from "../../../Domain/client";

@Controller()
export class GetClientByIdController {

  constructor(private getClientByIdUseCase: GetClientByIdUseCase) {}

  @Get('clients/:clientId')
  async getClientById(@Param() params): Promise<AppResponseDto> {
    const clientId = params.clientId;
    const client = await this.getClientByIdUseCase.handle(clientId);
    return this.buildResponse(client);
  }

  private buildResponse(client: Client): AppResponseDto {

    if (!client) {
      throw new HttpException(AppResponseDto.notFound(), HttpStatus.NOT_FOUND);
    }

    return AppResponseDto.ok(client.jsonSerialize());

  }

}
