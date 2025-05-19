/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MithyllAgentsModule } from './mithyll-agents/mithyll-agents.module';
import { DbModule } from './db/db.module';
import { PartnersService } from './partners/partners.service';
import { PartnersModule } from './partners/partners.module';
import { TokenUsageModule } from './token-usage/token-usage.module';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    ConfigModule.forRoot({ isGlobal: false }),
    MithyllAgentsModule,
    DbModule,
    PartnersModule,
    TokenUsageModule,
  ],
  controllers: [AppController],
  providers: [AppService, PartnersService],
})
export class AppModule {}
