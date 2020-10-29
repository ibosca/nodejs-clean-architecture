import { Policy } from "../../policy";

export interface PolicyRepositoryInterface {
  getById(policyId: string): Promise<Policy>;
  getListByClientId(clientId: string): Promise<Policy[]>;
}