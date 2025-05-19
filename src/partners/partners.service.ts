import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: DbService) {}
  async findPartnerByEmail(email: string) {
    const partner = await this.prisma.partner.findUnique({
      where: { email },
    });
    return partner;
  }

  async createPartner(data: any) {
    return await this.prisma.partner.create({
      data,
    });
  }
}
