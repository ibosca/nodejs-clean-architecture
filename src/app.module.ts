import { HttpModule, Module } from "@nestjs/common";
import { GetClientByIdUseCase } from "./Application/Client/getClientById.useCase";
import { MockyClientRepository } from "./Infrastructure/Repository/Client/mocky.client.repository";
import { GetClientByNameUseCase } from "./Application/Client/getClientByName.useCase";
import { MockyPolicyRepository } from "./Infrastructure/Repository/Policy/mocky.policy.repository";
import { GetPolicyListByClientIdUseCase } from "./Application/Policy/getPolicyListByClientId.useCase";
import { GetPolicyByIdUseCase } from "./Application/Policy/getPolicyById.useCase";
import { GetClientByIdController } from "./Infrastructure/Controller/Client/getClientById.controller";
import { GetClientByNameController } from "./Infrastructure/Controller/Client/getClientByName.controller";
import { GetPolicyListByClientIdController } from "./Infrastructure/Controller/Policy/getPolicyListByClientId.controller";
import { GetPolicyByIdController } from "./Infrastructure/Controller/Policy/getPolicyById.controller";

@Module({
  imports: [
    HttpModule
  ],
  controllers: [
    GetClientByIdController,
    GetClientByNameController,
    GetPolicyListByClientIdController,
    GetPolicyByIdController
  ],
  providers: [
    GetClientByIdUseCase,
    GetClientByNameUseCase,
    GetPolicyListByClientIdUseCase,
    GetPolicyByIdUseCase,
    {
      provide: 'ClientRepositoryInterface',
      useClass: MockyClientRepository
    },
    {
      provide: 'PolicyRepositoryInterface',
      useClass: MockyPolicyRepository
    }
  ],
})
export class AppModule {}
