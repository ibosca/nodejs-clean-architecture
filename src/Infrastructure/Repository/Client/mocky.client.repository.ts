import { ClientRepositoryInterface } from "../../../Domain/Repository/Client/client.repository.interface";
import { Client } from "../../../Domain/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MockyClientRepository implements ClientRepositoryInterface {

  getById(clientId: string): Client {
    return undefined;
  }

  getByName(name: string): Client {
    return undefined;
  }

}