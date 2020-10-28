import { Policy } from "../../policy";

export interface PolicyRepositoryInterface {
  getListByClientId(clientId: string): Promise<Policy[]>;
}