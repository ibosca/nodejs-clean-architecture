import { Controller, Get, Param } from "@nestjs/common";

@Controller('policies')
export class PolicyController {

  @Get(':policyId')
  getUserById(@Param() params): string {
    return `This endpoint will return a policy for ${params.policyId} id`;
  }

}
