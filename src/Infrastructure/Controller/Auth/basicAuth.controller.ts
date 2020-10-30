import { Controller, Request, Post, UseGuards, HttpCode } from "@nestjs/common";
import {LocalAuthPassportGuard } from "../../Guard/Auth/local-auth.passport.guard";
import { JwtService } from "@nestjs/jwt";
import { Client } from "../../../Domain/client";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";

export const jwtConstants = {
  secret: 'secretKey',
};

@Controller()
export class BasicAuthController {

  constructor(private jwtService: JwtService) {}

  @UseGuards(LocalAuthPassportGuard)
  @Post('auth')
  @HttpCode(201)
  async login(@Request() req) {
    const client: Client = req.user;

    const payload = {
      id: client.getId(),
      email: client.getEmail(),
      role: client.getRole()
    };

    const token = this.jwtService.sign(payload);

    return AppResponseDto.created({token});

  }

}