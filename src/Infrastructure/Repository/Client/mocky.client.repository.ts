import { ClientRepositoryInterface } from "../../../Domain/Repository/Client/client.repository.interface";
import { Client } from "../../../Domain/client";
import { HttpService, Injectable } from "@nestjs/common";

@Injectable()
export class MockyClientRepository implements ClientRepositoryInterface {

  constructor(private httpService: HttpService) {}

  async getById(clientId: string): Promise<Client> {
    const clientList = await this.getCompleteClientList();
    return clientList.find((client: Client) => client.getId() == clientId);
  }

  async getByName(name: string): Promise<Client> {
    const clientList = await this.getCompleteClientList();
    return clientList.find((client: Client) => client.getName() == name);
  }

  async getByEmail(email: string): Promise<Client> {
    const clientList = await this.getCompleteClientList();
    return clientList.find((client: Client) => client.getEmail() == email);
  }

  private async getCompleteClientList(): Promise<Client[]> {
    const providerResponse = await this.fetchClientResponse();

    return providerResponse.data.clients.map(clientData => {
      return Client.fromJson(clientData);
    });
  }

  private async fetchClientResponse(): Promise<any> {
    return this.httpService.get('http://www.mocky.io/v2/5808862710000087232b75ac').toPromise();
  }

}