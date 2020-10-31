import { BasicStrategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserByBasicAuthUseCase } from "../../Application/Auth/validateUserByBasicAuth.useCase";

@Injectable()
export class BasicStrategyPassportAuth extends PassportStrategy(BasicStrategy) {
  constructor(private validateUserByBasicAuthUseCase: ValidateUserByBasicAuthUseCase) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.validateUserByBasicAuthUseCase.handle(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}