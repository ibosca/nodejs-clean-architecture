import { Controller, Get, Param } from "@nestjs/common";
import { GetPolicyByIdUseCase } from "../../Application/Policy/getPolicyById.useCase";
import { Policy } from "../../Domain/policy";

@Controller('policies')
export class PolicyController {

  constructor(
    private getPolicyById: GetPolicyByIdUseCase
  ) {}

  @Get(':policyId')
  async getUserById(@Param() params): Promise<Policy> {
    return await this.getPolicyById.handle(params.policyId);
  }

}
