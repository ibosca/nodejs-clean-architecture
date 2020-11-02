import { Client } from "../../../src/Domain/client";

export class ClientMother {

  public static create(id: string, name: string, email: string, role: string): Client {
    return new Client(id, name, email, role);
  }

  public static basic(): Client {
    return this.create('1',
      'Isaac Boscà',
      'an_email@gmail.com',
      'admin'
    );
  }
}