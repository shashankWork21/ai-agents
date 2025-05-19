import { Controller, Get } from '@nestjs/common';
import { TokenUsageService } from './token-usage.service';

@Controller('token-usage')
export class TokenUsageController {
  constructor(private readonly tokenUsageService: TokenUsageService) {}
  @Get()
  async getTokenUsage() {
    return await this.tokenUsageService.getTokenUsage();
  }
}
