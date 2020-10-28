import { Client } from "../../client";

export interface ClientRepositoryInterface {
  getById(clientId: string): Promise<Client>;
  getByName(name: string): Client;
}