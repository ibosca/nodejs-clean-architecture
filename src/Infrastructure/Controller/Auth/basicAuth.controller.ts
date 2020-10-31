import { Controller, Request, Post, UseGuards, HttpCode } from "@nestjs/common";
import { Client } from "../../../Domain/client";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { IssueTokenUseCase } from "../../../Application/Auth/issueToken.useCase";
import { BasicAuthPassportGuard } from "../../Guard/Auth/basic-auth.passport.guard";
import { ApiBasicAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ACCESS_DENIED_HTTP_CODE, ACCESS_DENIED_MESSAGE } from "../../../Domain/Error/accessDenied.appError";
import { NOT_FOUND_HTTP_CODE, NOT_FOUND_MESSAGE } from "../../../Domain/Error/notFound.appError";

@ApiTags('Authentication')
@Controller()
export class BasicAuthController {

  constructor(private issueToken: IssueTokenUseCase) {}

  @ApiResponse({ status: 201, description: 'Token issued successfully.'})
  @ApiResponse({ status: ACCESS_DENIED_HTTP_CODE, description: ACCESS_DENIED_MESSAGE})
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