import { Inject, Injectable } from "@nestjs/common";
import { AuthRepositoryInterface } from "../../Domain/Repository/Auth/auth.repository.interface";
import { Client } from "../../Domain/client";

@Injectable()
export class IssueTokenUseCase {

  constructor(
    @Inject('AuthRepositoryInterface')
    private readonly authRepositoryInterface: AuthRepositoryInterface) {}

  handle(client: Client): string {
    return this.authRepositoryInterface.issueToken(client);
  }

}