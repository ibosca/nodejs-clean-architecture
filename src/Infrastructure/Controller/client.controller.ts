import { Controller, Get, Param, Query } from "@nestjs/common";

@Controller('clients')
export class ClientController {

  @Get(':clientId')
  getUserById(@Param() params): string {
    return `This endpoint will return a client for ${params.clientId} id`;
  }

  @Get()
  getUserByUsername(@Query('clientName') clientName: string): string {
    return `This endpoint will return a client for ${clientName} username`;
  }

  @Get(':clientId/policies')
  getPoliciesByUserId(@Param() params): string {
    return `This endpoint will return a policy list for ${params.clientId} client id`;
  }

}
