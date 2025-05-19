import { Test, TestingModule } from '@nestjs/testing';
import { MithyllAgentsController } from './mithyll-agents.controller';

describe('AgentsController', () => {
  let controller: MithyllAgentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MithyllAgentsController],
    }).compile();

    controller = module.get<MithyllAgentsController>(MithyllAgentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
