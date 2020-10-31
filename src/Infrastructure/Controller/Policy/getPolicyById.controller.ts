import { Controller, Get, HttpException, HttpStatus, Param, Request, UseGuards } from "@nestjs/common";
import { GetPolicyByIdUseCase } from "../../../Application/Policy/getPolicyById.useCase";
import { Policy } from "../../../Domain/policy";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { JwtAuthPassportGuard } from "../../Guard/Auth/jwt-auth.passport.guard";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags('Policies')
@Controller()
export class GetPolicyByIdController {

  constructor(private getPolicyById: GetPolicyByIdUseCase) {}

  @ApiBearerAuth()
  @ApiParam({
    name: 'policyId',
    description: 'A policy Id',
    example: 'a0ece5db-cd14-4f21-812f-966633e7be86'
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
