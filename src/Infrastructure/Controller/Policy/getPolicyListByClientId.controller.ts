import { Controller, Get, Param } from "@nestjs/common";
import { GetPolicyListByClientIdUseCase } from "../../../Application/Policy/getPolicyListByClientId.useCase";
import { Policy } from "../../../Domain/policy";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";

@Controller()
export class GetPolicyListByClientIdController {

  constructor(private getPolicyListByClientId: GetPolicyListByClientIdUseCase) {}

  @Get('clients/:clientId/policies')
  async getPoliciesByClientId(@Param() params): Promise<AppResponseDto> {
    const policyList = await this.getPolicyListByClientId.handle(params.clientId);
    return this.buildResponse(policyList)
  }

  private buildResponse(policyList: Policy[]): AppResponseDto {
    return AppResponseDto.ok(policyList.map((policy: Policy) => policy.jsonSerialize()));
  }

}
