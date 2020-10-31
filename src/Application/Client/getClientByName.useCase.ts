import { Inject, Injectable } from "@nestjs/common";
import { Client } from "../../Domain/client";
import { ClientRepositoryInterface } from "../../Domain/Repository/Client/client.repository.interface";
import { AccessDeniedAppError } from "../../Domain/Error/accessDenied.appError";

@Injectable()
export class GetClientByNameUseCase {

  constructor(
    @Inject('ClientRepositoryInterface')
    private readonly clientRepository: ClientRepositoryInterface) {}

  public async handle(name: string, userLoggedId: string): Promise<Client> {
    const userLogged = await this.clientRepository.getById(userLoggedId);

    if (!this.hasPermission(userLogged)) {
      throw new AccessDeniedAppError();
    }

    return await this.clientRepository.getByName(name);
  }

  private hasPermission(userLogged: Client): boolean
  {
    if (userLogged.isRoleUser()) {
      return true;
    }

    if (userLogged.isRoleAdmin()) {
      return true;
    }

    return false;
  }

}