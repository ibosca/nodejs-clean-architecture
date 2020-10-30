import { Controller, Request, Post, UseGuards, HttpCode } from "@nestjs/common";
import {LocalAuthPassportGuard } from "../../Guard/Auth/local-auth.passport.guard";
import { Client } from "../../../Domain/client";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { IssueTokenUseCase } from "../../../Application/Auth/issueToken.useCase";

@Controller()
export class BasicAuthController {

  constructor(private issueToken: IssueTokenUseCase) {}

  @UseGuards(LocalAuthPassportGuard)
  @Post('auth')
  @HttpCode(201)
  async login(@Request() req) {
    const client: Client = req.user;
    return AppResponseDto.created({
      token: this.issueToken.handle(client)
    });

  }

}