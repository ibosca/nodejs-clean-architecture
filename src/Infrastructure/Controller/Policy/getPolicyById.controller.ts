import { Controller, Get, HttpException, HttpStatus, Request, UseGuards } from "@nestjs/common";
import { GetPolicyByIdUseCase } from "../../../Application/Policy/getPolicyById.useCase";
import { Policy } from "../../../Domain/policy";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";
import { JwtAuthPassportGuard } from "../../Guard/Auth/jwt-auth.passport.guard";

@Controller()
export class GetPolicyByIdController {

  constructor(private getPolicyById: GetPolicyByIdUseCase) {}

  @UseGuards(JwtAuthPassportGuard)
  @Get('policies/:policyId')
  async getUserById(@Request() req): Promise<AppResponseDto> {
    const policyId = req.params.policyId;
    const policy = await this.getPolicyById.handle(policyId);
    return this.buildResponse(policy)
  }

  private buildResponse(policy: Policy): AppResponseDto {

    if (!policy) {
      throw new HttpException(AppResponseDto.notFound(), HttpStatus.NOT_FOUND);
    }

    return AppResponseDto.ok(policy.jsonSerialize());

  }

}
