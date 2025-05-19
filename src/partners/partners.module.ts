import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { DbService } from 'src/db/db.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [PartnersController],
  providers: [PartnersService, DbService],
})
export class PartnersModule {}
