import { Module } from '@nestjs/common';
import { TokenUsageController } from './token-usage.controller';
import { TokenUsageService } from './token-usage.service';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';

@Module({
  imports: [DbModule],
  controllers: [TokenUsageController],
  providers: [TokenUsageService, DbService],
})
export class TokenUsageModule {}
