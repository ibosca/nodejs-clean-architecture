import { Inject, Injectable } from "@nestjs/common";
import { Client } from "../../Domain/client";
import { ClientRepositoryInterface } from "../../Domain/Repository/Client/client.repository.interface";

@Injectable()
export class GetClientByIdUseCase {

  constructor(
    @Inject('ClientRepositoryInterface')
    private readonly clientRepository: ClientRepositoryInterface) {}


  public handle(clientId: string): Client {
    return this.clientRepository.getById(clientId);
  }
}