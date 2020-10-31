import { Controller, Get, Param, Request, UseGuards } from "@nestjs/common";
import { GetPolicyListByClientIdUseCase } from "../../../Application/Policy/getPolicyListByClientId.useCase";
import { Policy } from "../../../Domain/policy";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { JwtAuthPassportGuard } from "../../Guard/Auth/jwt-auth.passport.guard";
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BAD_REQUEST_HTTP_CODE, BAD_REQUEST_MESSAGE } from "../../../Domain/Error/badRequest.appError";
import { NOT_FOUND_HTTP_CODE, NOT_FOUND_MESSAGE } from "../../../Domain/Error/notFound.appError";
import { ACCESS_DENIED_HTTP_CODE, ACCESS_DENIED_MESSAGE } from "../../../Domain/Error/accessDenied.appError";

@ApiTags('Policies')
@Controller()
export class GetPolicyListByClientIdController {

  constructor(private getPolicyListByClientId: GetPolicyListByClientIdUseCase) {}

  @ApiResponse({ status: 200, description: 'Return client successfully'})
  @ApiResponse({ status: BAD_REQUEST_HTTP_CODE, description: BAD_REQUEST_MESSAGE})
  @ApiResponse({ status: NOT_FOUND_HTTP_CODE, description: NOT_FOUND_MESSAGE})
  @ApiResponse({ status: ACCESS_DENIED_HTTP_CODE, description: ACCESS_DENIED_MESSAGE})
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
