import { Controller, Get, HttpException, HttpStatus, Param, Request, UseGuards } from "@nestjs/common";
import { GetPolicyByIdUseCase } from "../../../Application/Policy/getPolicyById.useCase";
import { Policy } from "../../../Domain/policy";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { JwtAuthPassportGuard } from "../../Guard/Auth/jwt-auth.passport.guard";
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { NOT_FOUND_HTTP_CODE, NOT_FOUND_MESSAGE } from "../../../Domain/Error/notFound.appError";
import { ACCESS_DENIED_HTTP_CODE, ACCESS_DENIED_MESSAGE } from "../../../Domain/Error/accessDenied.appError";

@ApiTags('Policies')
@Controller()
export class GetPolicyByIdController {

  constructor(private getPolicyById: GetPolicyByIdUseCase) {}

  @ApiResponse({ status: 200, description: 'Return policy successfully'})
  @ApiResponse({ status: NOT_FOUND_HTTP_CODE, description: NOT_FOUND_MESSAGE})
  @ApiResponse({ status: ACCESS_DENIED_HTTP_CODE, description: ACCESS_DENIED_MESSAGE})
  @ApiBearerAuth()
  @ApiParam({
    name: 'policyId',
    description: 'A policy Id',
    example: '64cceef9-3a01-49ae-a23b-3761b604800b'
  })
  @UseGuards(JwtAuthPassportGuard)
  @Get('policies/:policyId')
  async getUserById(
    @Request() req,
    @Param() params: any
  ): Promise<AppResponseDto> {
    const policy = await this.getPolicyById.handle(params.policyId);
    return this.buildResponse(policy)
  }

  private buildResponse(policy: Policy): AppResponseDto {

    if (!policy) {
      throw new HttpException(AppResponseDto.notFound(), HttpStatus.NOT_FOUND);
    }

    return AppResponseDto.ok({
      policy: policy.jsonSerialize()
    });

  }

}
