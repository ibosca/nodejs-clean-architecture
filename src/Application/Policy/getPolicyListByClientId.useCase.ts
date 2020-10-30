import { Inject, Injectable } from "@nestjs/common";
import { PolicyRepositoryInterface } from "../../Domain/Repository/Policy/policy.repository.interface";
import { Policy } from "../../Domain/policy";
import { ClientRepositoryInterface } from "../../Domain/Repository/Client/client.repository.interface";
import { Client } from "../../Domain/client";

@Injectable()
export class GetPolicyListByClientIdUseCase {

  constructor(
    @Inject('PolicyRepositoryInterface')
    private readonly policyRepository: PolicyRepositoryInterface,
    @Inject('ClientRepositoryInterface')
    private readonly clientRepository: ClientRepositoryInterface
    ) {}

  public async handle(clientId: string, userLoggedId: string): Promise<Policy[]> {
    const userLogged = await this.clientRepository.getById(userLoggedId);

    if (!this.hasPermission(clientId, userLogged)) {
      throw new AccessDeniedError();
    }

    return await this.policyRepository.getListByClientId(clientId);
  }

  private hasPermission(clientId: string, userLogged: Client): boolean
  {

    if (userLogged.isRoleAdmin()) {
      return true;
    }

    if (userLogged.getId() == clientId) {
      return true;
    }

    return false;
  }
}