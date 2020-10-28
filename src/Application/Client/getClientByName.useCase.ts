import { Inject, Injectable } from "@nestjs/common";
import { Client } from "../../Domain/client";
import { ClientRepositoryInterface } from "../../Domain/Repository/Client/client.repository.interface";

@Injectable()
export class GetClientByNameUseCase {

  constructor(
    @Inject('ClientRepositoryInterface')
    private readonly clientRepository: ClientRepositoryInterface) {}

  public async handle(name: string): Promise<Client> {
    return await this.clientRepository.getByName(name);
  }
}