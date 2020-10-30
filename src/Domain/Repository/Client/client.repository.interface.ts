import { Client } from "../../client";

export interface ClientRepositoryInterface {
  getById(clientId: string): Promise<Client>;
  getByName(name: string): Promise<Client>;
  getByEmail(email: string): Promise<Client>;
}