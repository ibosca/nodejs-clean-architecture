import { Inject, Injectable } from "@nestjs/common";
import { Client } from "../../Domain/client";
import { ClientRepositoryInterface } from "../../Domain/Repository/Client/client.repository.interface";

@Injectable()
export class GetClientByEmailUseCase {

  constructor(
    @Inject('ClientRepositoryInterface')
    private readonly clientRepository: ClientRepositoryInterface) {}

  public async handle(email: string): Promise<Client> {
    return await this.clientRepository.getByEmail(email);
  }
}