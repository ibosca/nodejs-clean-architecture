import { Inject, Injectable } from "@nestjs/common";
import { Client } from "../../Domain/client";
import { ClientRepositoryInterface } from "../../Domain/Repository/Client/client.repository.interface";
import { AccessDeniedAppError } from "../../Domain/Error/accessDenied.appError";
import { NotFoundAppError } from "../../Domain/Error/notFound.appError";

@Injectable()
export class GetClientByIdUseCase {

  constructor(
    @Inject('ClientRepositoryInterface')
    private readonly clientRepository: ClientRepositoryInterface) {}

  public async handle(clientId: string, userLoggedId: string): Promise<Client> {
    const userLogged = await this.clientRepository.getById(userLoggedId);

    if (!this.hasPermission(userLogged)) {
      throw new AccessDeniedAppError();
    }

    const client = await this.clientRepository.getById(clientId);

    if (!client) {
      throw new NotFoundAppError();
    }

    return client;
  }

  private hasPermission(userLogged: Client): boolean
  {
    if (!userLogged) {
      return false;
    }

    if (userLogged.isRoleUser()) {
      return true;
    }

    if (userLogged.isRoleAdmin()) {
      return true;
    }

    return false;
  }
}