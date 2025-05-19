// src/agents/agents.controller.ts
import { Controller, Post, Delete, Body } from '@nestjs/common';
import { MithyllAgentsService } from './mithyll-agents.service';

@Controller('mithyll') // this prefixes all routes with /mithyll
export class MithyllAgentsController {
  constructor(private readonly mithyllAgentsService: MithyllAgentsService) {}

  @Post('business-roadmap')
  async generateBusinessRoadmap(@Body() body: any) {
    // In a real app, define a DTO class for validation; using any for brevity.
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
