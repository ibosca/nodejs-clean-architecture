import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { GetPolicyListByClientIdUseCase } from "../../../Application/Policy/getPolicyListByClientId.useCase";
import { Policy } from "../../../Domain/policy";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { JwtAuthPassportGuard } from "../../Guard/Auth/jwt-auth.passport.guard";

@Controller()
export class GetPolicyListByClientIdController {

  constructor(private getPolicyListByClientId: GetPolicyListByClientIdUseCase) {}

  @UseGuards(JwtAuthPassportGuard)
  @Get('clients/:clientId/policies')
  async getPoliciesByClientId(@Request() req): Promise<AppResponseDto> {

    const clientId = req.params.clientId;
    const userLoggedId = req.user.id;
    const policyList = await this.getPolicyListByClientId.handle(clientId, userLoggedId);
    return this.buildResponse(policyList)

  }

  private buildResponse(policyList: Policy[]): AppResponseDto {
    return AppResponseDto.ok({
      policies: policyList.map((policy: Policy) => policy.jsonSerialize())
    });
  }

}
