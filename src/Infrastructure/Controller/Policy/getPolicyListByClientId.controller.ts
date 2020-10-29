import { Controller, Get, Param } from "@nestjs/common";
import { GetPolicyListByClientIdUseCase } from "../../../Application/Policy/getPolicyListByClientId.useCase";
import { Policy } from "../../../Domain/policy";

@Controller()
export class GetPolicyListByClientIdController {

  constructor(private getPolicyListByClientId: GetPolicyListByClientIdUseCase) {}

  @Get('clients/:clientId/policies')
  async getPoliciesByClientId(@Param() params): Promise<Policy[]> {
    return await this.getPolicyListByClientId.handle(params.clientId);
  }

}
