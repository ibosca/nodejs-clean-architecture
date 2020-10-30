import {Injectable } from "@nestjs/common";
import { Client } from "../../Domain/client";
import { GetClientByEmailUseCase } from "../Client/getClientByEmail.useCase";

@Injectable()
export class ValidateUserByBasicAuthUseCase {

  constructor(private getClientByEmail: GetClientByEmailUseCase) {}

  async handle(email: string, pass: string): Promise<any> {

    const client = await this.getClientByEmail.handle(email);

    if (!client) {
      return null;
    }

    if(!this.isValidPassword(client, pass)) {
      return null;
    }

    return client;
  }

  private isValidPassword(client: Client, plainPassword: string): boolean {
    // In a real world app, our client user should have a hashed password
    // We can then, hash the plainPassword received and compare it with the user one
    return plainPassword == client.getPassword();
  }
}