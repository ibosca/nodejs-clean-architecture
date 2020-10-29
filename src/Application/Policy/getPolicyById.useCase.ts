import { Inject, Injectable } from "@nestjs/common";
import { PolicyRepositoryInterface } from "../../Domain/Repository/Policy/policy.repository.interface";
import { Policy } from "../../Domain/policy";

@Injectable()
export class GetPolicyByIdUseCase {

  constructor(
    @Inject('PolicyRepositoryInterface')
    private readonly policyRepository: PolicyRepositoryInterface) {}

  public async handle(policyId: string): Promise<Policy> {
    return await this.policyRepository.getById(policyId);
  }
}