import { HttpModule, Module } from "@nestjs/common";
import { ClientController } from "./Infrastructure/Controller/client.controller";
import { PolicyController } from "./Infrastructure/Controller/policy.controller";
import { GetClientByIdUseCase } from "./Application/Client/getClientById.useCase";
import { MockyClientRepository } from "./Infrastructure/Repository/Client/mocky.client.repository";
import { GetClientByNameUseCase } from "./Application/Client/getClientByName.useCase";

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
    {
      provide: 'ClientRepositoryInterface',
      useClass: MockyClientRepository
    }
  ],
})
export class AppModule {}
