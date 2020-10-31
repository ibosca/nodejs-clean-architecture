import { Controller, Request, Post, UseGuards, HttpCode } from "@nestjs/common";
import { Client } from "../../../Domain/client";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { IssueTokenUseCase } from "../../../Application/Auth/issueToken.useCase";
import { BasicAuthPassportGuard } from "../../Guard/Auth/basic-auth.passport.guard";
import { ApiBasicAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Authentication')
@Controller()
export class BasicAuthController {

  constructor(private issueToken: IssueTokenUseCase) {}

  @ApiBasicAuth()
  @UseGuards(BasicAuthPassportGuard)
  @Post('auth')
  @HttpCode(201)
  async login(@Request() req) {
    const client: Client = req.user;
    return AppResponseDto.created({
      token: this.issueToken.handle(client)
    });

  }

}