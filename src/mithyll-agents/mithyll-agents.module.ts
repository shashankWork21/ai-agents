import { Module } from '@nestjs/common';
import { MithyllAgentsController } from './mithyll-agents.controller';
import { MithyllAgentsService } from './mithyll-agents.service';
import { PartnersModule } from 'src/partners/partners.module';
import { TokenUsageModule } from 'src/token-usage/token-usage.module';
import { DbService } from 'src/db/db.service';
import { PartnersService } from 'src/partners/partners.service';
import { TokenUsageService } from 'src/token-usage/token-usage.service';

@Module({
  imports: [PartnersModule, TokenUsageModule],
  controllers: [MithyllAgentsController],
  providers: [
    MithyllAgentsService,
    DbService,
    PartnersService,
    TokenUsageService,
  ],
})
export class MithyllAgentsModule {}
