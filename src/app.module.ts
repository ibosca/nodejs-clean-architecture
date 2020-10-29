import { HttpModule, Module } from "@nestjs/common";
import { ClientController } from "./Infrastructure/Controller/client.controller";
import { PolicyController } from "./Infrastructure/Controller/policy.controller";
import { GetClientByIdUseCase } from "./Application/Client/getClientById.useCase";
import { MockyClientRepository } from "./Infrastructure/Repository/Client/mocky.client.repository";
import { GetClientByNameUseCase } from "./Application/Client/getClientByName.useCase";
import { MockyPolicyRepository } from "./Infrastructure/Repository/Policy/mocky.policy.repository";
import { GetPolicyListByClientIdUseCase } from "./Application/Policy/getPolicyListByClientId.useCase";
import { GetPolicyByIdUseCase } from "./Application/Policy/getPolicyById.useCase";

@Module({
  imports: [
    HttpModule
  ],
  controllers: [
    ClientController,
    PolicyController
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
