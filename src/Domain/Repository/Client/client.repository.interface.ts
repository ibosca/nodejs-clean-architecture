import { Client } from "../../client";

export interface ClientRepositoryInterface {
  getById(clientId: string): Client;
  getByName(name: string): Client;
}