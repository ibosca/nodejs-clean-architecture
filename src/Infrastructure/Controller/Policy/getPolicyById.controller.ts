import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { GetPolicyByIdUseCase } from "../../../Application/Policy/getPolicyById.useCase";
import { Policy } from "../../../Domain/policy";
import { AppResponseDto } from "../../../Domain/DTO/Response/appResponse.dto";

@Controller()
export class GetPolicyByIdController {

  constructor(private getPolicyById: GetPolicyByIdUseCase) {}

  @Get('policies/:policyId')
  async getUserById(@Param() params): Promise<AppResponseDto> {
    const policy = await this.getPolicyById.handle(params.policyId);
    return this.buildResponse(policy)
  }

  private buildResponse(policy: Policy): AppResponseDto {

    if (!policy) {
      throw new HttpException(AppResponseDto.notFound(), HttpStatus.NOT_FOUND);
    }

    return AppResponseDto.ok(policy.jsonSerialize());

  }

}
