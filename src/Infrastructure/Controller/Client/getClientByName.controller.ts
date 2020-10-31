import { Controller, Get, Query, Request, UseGuards } from "@nestjs/common";
import { Client } from "../../../Domain/client";
import { GetClientByNameUseCase } from "../../../Application/Client/getClientByName.useCase";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { JwtAuthPassportGuard } from "../../Guard/Auth/jwt-auth.passport.guard";
import { NotFoundAppError } from "../../../Domain/Error/notFound.appError";
import { BadRequestAppError } from "../../../Domain/Error/badRequest.appError";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('Clients')
@Controller()
export class GetClientByNameController {

  constructor(private getClientByNameUseCase: GetClientByNameUseCase,) {}

  @ApiBearerAuth()
  @ApiQuery({ name: 'name', description: 'The name of the user', example: 'Britney' })
  @UseGuards(JwtAuthPassportGuard)
  @Get('/clients')
  async getClientByUsername(
    @Request() req,
    @Query() query: any
  ): Promise<AppResponseDto> {
    const name = query.name
    const userLoggedId = req.user.id;
    this.guardValidateRequestData(name);
    const client = await this.getClientByNameUseCase.handle(name, userLoggedId);
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

    return AppResponseDto.ok({
      client: client.jsonSerialize()
    });

  }

}
