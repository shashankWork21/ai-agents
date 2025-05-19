import { Controller, Get, Param } from '@nestjs/common';
import { PartnersService } from './partners.service';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get(':email')
  async getPartnerByEmail(@Param('email') email: string) {
    const partner = await this.partnersService.findPartnerByEmail(email);
    if (!partner) {
      return { message: 'Partner not found' };
    }
    return partner;
  }
}
