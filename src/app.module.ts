import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientController } from "./Infrastructure/Controller/client.controller";
import { PolicyController } from "./Infrastructure/Controller/policy.controller";

@Module({
  imports: [],
  controllers: [ClientController, PolicyController],
  providers: [AppService],
})
export class AppModule {}
