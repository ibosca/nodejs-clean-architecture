import { Controller, Get, Param, Request, UseGuards } from "@nestjs/common";
import { GetPolicyListByClientIdUseCase } from "../../../Application/Policy/getPolicyListByClientId.useCase";
import { Policy } from "../../../Domain/policy";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { JwtAuthPassportGuard } from "../../Guard/Auth/jwt-auth.passport.guard";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags('Policies')
@Controller()
export class GetPolicyListByClientIdController {

  constructor(private getPolicyListByClientId: GetPolicyListByClientIdUseCase) {}

  @ApiBearerAuth()
  @ApiParam({
    name: 'clientId',
    description: 'A client Id',
    example: 'a0ece5db-cd14-4f21-812f-966633e7be86'
  })
  @UseGuards(JwtAuthPassportGuard)
  @Get('clients/:clientId/policies')
  async getPoliciesByClientId(
    @Request() req,
    @Param() params: any
  ): Promise<AppResponseDto> {
    const userLoggedId = req.user.id;
    const policyList = await this.getPolicyListByClientId.handle(params.clientId, userLoggedId);
    return this.buildResponse(policyList)

  }

  private buildResponse(policyList: Policy[]): AppResponseDto {
    return AppResponseDto.ok({
      policies: policyList.map((policy: Policy) => policy.jsonSerialize())
    });
  }

}
