import { Controller, Post, Delete, Body } from '@nestjs/common';
import { MithyllAgentsService } from './mithyll-agents.service';

@Controller('mithyll')
export class MithyllAgentsController {
  constructor(private readonly mithyllAgentsService: MithyllAgentsService) {}

  @Post('business-roadmap')
  async generateBusinessRoadmap(@Body() body: any) {
    const result =
      await this.mithyllAgentsService.generateBusinessRoadmap(body);
    return result;
  }

  @Delete('tokens')
  async deleteTokens() {
    await this.mithyllAgentsService.deleteTokens();
    return { message: 'Tokens deleted successfully' };
  }
}
