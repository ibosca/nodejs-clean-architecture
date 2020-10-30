import { Client } from "../../../Domain/client";
import { Injectable } from "@nestjs/common";
import { AuthRepositoryInterface } from "../../../Domain/Repository/Auth/auth.repository.interface";
import { JwtService } from "@nestjs/jwt";

export const jwtConstants = {
  secret: 'secretKey',
};

@Injectable()
export class PassportAuthRepository implements AuthRepositoryInterface {

  constructor(private jwtService: JwtService) {}

  issueToken(client: Client): string {

    const payload = {
      id: client.getId(),
      email: client.getEmail(),
      role: client.getRole()
    };

    return this.jwtService.sign(payload);

  }


}
