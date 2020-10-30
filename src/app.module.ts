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
import { GetClientByEmailUseCase } from "./Application/Client/getClientByEmail.useCase";
import { ValidateUserByBasicAuthUseCase } from "./Application/Auth/validateUserByBasicAuth.useCase";
import { BasicAuthController, jwtConstants } from "./Infrastructure/Controller/Auth/basicAuth.controller";
import { LocalStrategyPassportAuth } from "./Infrastructure/Auth/localStrategy.passport.auth";
import { JwtModule, JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: jwtConstants.secret, //TODO: Extract to a ENV var
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [
    GetClientByIdController,
    GetClientByNameController,
    GetPolicyListByClientIdController,
    GetPolicyByIdController,
    BasicAuthController
  ],
  providers: [
    GetClientByIdUseCase,
    GetClientByNameUseCase,
    GetPolicyListByClientIdUseCase,
    GetPolicyByIdUseCase,
    GetClientByEmailUseCase,
    ValidateUserByBasicAuthUseCase,
    {
      provide: 'ClientRepositoryInterface',
      useClass: MockyClientRepository
    },
    {
      provide: 'PolicyRepositoryInterface',
      useClass: MockyPolicyRepository
    },
    LocalStrategyPassportAuth,
  ],
})
export class AppModule {}
