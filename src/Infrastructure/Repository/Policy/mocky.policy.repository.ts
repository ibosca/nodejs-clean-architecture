import { HttpService, Injectable } from "@nestjs/common";
import { PolicyRepositoryInterface } from "../../../Domain/Repository/Policy/policy.repository.interface";
import { Policy } from "../../../Domain/policy";

@Injectable()
export class MockyPolicyRepository implements PolicyRepositoryInterface {

  constructor(private httpService: HttpService) {}

  async getById(policyId: string): Promise<Policy> {
    const policyList = await this.getCompletePolicyList();
    return policyList.find((policy: Policy) => policy.id == policyId);
  }

  async getListByClientId(clientId: string): Promise<Policy[]> {
    const policyList = await this.getCompletePolicyList();
    return policyList.filter((policy: Policy) => policy.clientId == clientId);
  }


  private async getCompletePolicyList(): Promise<Policy[]> {
    const providerResponse = await this.fetchPolicyResponse();

    return providerResponse.data.policies.map(clientData => {
      return Policy.fromJson(clientData);
    });
  }

  private async fetchPolicyResponse(): Promise<any> {
    return this.httpService.get('http://www.mocky.io/v2/580891a4100000e8242b75c5').toPromise();
  }



}