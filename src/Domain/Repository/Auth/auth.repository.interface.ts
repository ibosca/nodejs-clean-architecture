import { Client } from "../../client";

export interface AuthRepositoryInterface {
  issueToken(client: Client): string;
}