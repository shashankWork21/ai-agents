import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TokenUsageService {
  constructor(private readonly prisma: DbService) {}

  async getTokenUsage() {
    return await this.prisma.aiTokenUsage.findMany();
  }

  async createTokenUsage(data: any) {
    return await this.prisma.aiTokenUsage.create({
      data,
    });
  }

  async deleteTokenUsageByPartner(email: string) {
    return await this.prisma.aiTokenUsage.deleteMany({
      where: {
        partner: { email },
      },
    });
  }
}
