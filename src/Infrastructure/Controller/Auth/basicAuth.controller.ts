import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import {LocalAuthPassportGuard } from "../../Guard/Auth/local-auth.passport.guard";

@Controller()
export class BasicAuthController {

  @UseGuards(LocalAuthPassportGuard)
  @Post('auth')
  async login(@Request() req) {
    return req.user;
  }

}