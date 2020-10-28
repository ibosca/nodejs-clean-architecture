import { Inject, Injectable } from "@nestjs/common";
import { PolicyRepositoryInterface } from "../../Domain/Repository/Policy/policy.repository.interface";
import { Policy } from "../../Domain/policy";

@Injectable()
export class GetPolicyListByClientIdUseCase {

  constructor(
    @Inject('PolicyRepositoryInterface')
    private readonly policyRepository: PolicyRepositoryInterface) {}

  public async handle(clientId: string): Promise<Policy[]> {
    return await this.policyRepository.getListByClientId(clientId);
  }
}