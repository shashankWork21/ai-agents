// src/agents/agents.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { OpenAI } from 'openai'; // OpenAI SDK
import { DbService } from 'src/db/db.service';
import { PartnersService } from '../partners/partners.service';
import { TokenUsageService } from '../token-usage/token-usage.service';

@Injectable()
export class MithyllAgentsService {
  private openAI: OpenAI;

  constructor(
    private readonly prisma: DbService,
    private readonly partnersService: PartnersService,
    private readonly tokenUsageService: TokenUsageService,
  ) {
    this.openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async generateBusinessRoadmap(input: any): Promise<any> {
    const {
      userValues,
      skillsLoved,
      skillsUnderutilised,
      activities,
      targetAudienceData,
      passionData,
      uspData,
    } = input;

    const { minAge, maxAge, genders, educationLevel, values } =
      targetAudienceData;
    const { problem, resonance, energy, impact } = passionData;
    const { coreStrength, approach, results, experience, secretSauce } =
      uspData;

    const messages = {
      systemMessage:
        'You are an expert Business Coach and Content Strategist. You help me, an entrepreneur, define my target audience, align my passions with market needs, identify my unique value proposition (USP), and develop products/services that solve clear pain points. You provide clarity, structured thinking, and practical business strategy tailored to my specific inputs.',

      userMessage: `My top 3 personal values are: ${userValues.join(
        ', ',
      )}.\nThe three skills I enjoy using the most are: ${skillsLoved.join(
        ', ',
      )}.\nSkills I possess that I haven't fully utilised in my business are: ${skillsUnderutilised.join(
        ', ',
      )}.\nThree activities that make me lose track of my time are: ${activities.join(
        ', ',
      )}.\n\nMy target audience profile is as follows:\nAge Range: ${minAge} - ${maxAge}.\nGender(s): ${genders.join(
        ', ',
      )}.\nEducation Level: ${educationLevel}.\nAudience Values: ${values.join(
        ', ',
      )}.\n\My Passion-Market Fit is as follows:\nThe Problem I'm Passionate About Solving: ${problem}.\nWhy I Personally Resonate with this problem: ${resonance}.\nWhat fuels my energy (Even If Unpaid): ${energy}.\nImpact that I want to create: ${impact}.\nMy Unique Selling Proposition (USP) includes:\nCore Strength: ${coreStrength}.\nUnique Approach/Methodology: ${approach}.\nResults Achieved: ${results}.\nExperience That Validates Their Expertise: ${experience}.\nSecret Sauce That Makes Their Solution Impossible to Copy: ${secretSauce}.`,
    };

    try {
      const modelResponse = await this.openAI.responses.create({
        instructions: messages.systemMessage,
        input: messages.userMessage,
        model: 'o4-mini-2025-04-16',
        max_output_tokens: 7500,
        text: {
          format: {
            type: 'json_schema',
            name: 'business_growth_plan',
            schema: {
              type: 'object',
              properties: {
                targetAudienceInformation: {
                  type: 'object',
                  properties: {
                    painPoints: {
                      type: 'string',
                      description:
                        'What pain points do my target audience face?',
                    },
                    consequences: {
                      type: 'string',
                      description:
                        'What are the consequences of not availing my solutions?',
                    },
                    currentSolutions: {
                      type: 'string',
                      description:
                        'What are the current solutions that my target audience is using?',
                    },
                    marketGap: {
                      type: 'string',
                      description:
                        "What is missing in the current solutions that they're using?",
                    },
                  },
                  required: [
                    'painPoints',
                    'consequences',
                    'currentSolutions',
                    'marketGap',
                  ],
                  additionalProperties: false,
                },
                productsAndServices: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      description: { type: 'string' },
                      solutionType: {
                        type: 'string',
                        enum: ['product', 'service'],
                      },
                      features: { type: 'array', items: { type: 'string' } },
                      monetisationModels: {
                        type: 'string',
                        description:
                          'How can I generate revenue from this product or service?',
                      },
                    },
                    required: [
                      'name',
                      'solutionType',
                      'description',
                      'features',
                      'monetisationModels',
                    ],
                    additionalProperties: false,
                  },
                  description:
                    '5 unique products and services that I can pitch to my target audience',
                },
                contentStrategy: {
                  type: 'object',
                  properties: {
                    contentPillars: {
                      type: 'array',
                      description:
                        '4 distinct content pillars that I can use to create content for my target audience',
                      items: {
                        type: 'object',
                        properties: {
                          title: { type: 'string' },
                          details: {
                            type: 'string',
                          },
                        },
                        required: ['title', 'details'],
                        additionalProperties: false,
                      },
                    },
                    contentCategories: {
                      type: 'array',
                      description:
                        '5 distinct content categories that I can use to create content for my target audience',
                      items: {
                        type: 'object',
                        properties: {
                          title: { type: 'string' },
                          details: {
                            type: 'string',
                          },
                        },
                        required: ['title', 'details'],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ['contentPillars', 'contentCategories'],
                  additionalProperties: false,
                },
                businessRoadMap: {
                  type: 'array',
                  description:
                    'A step-by-step roadmap to achieve my business goals broken down to 4 phases',
                  items: {
                    type: 'object',
                    properties: {
                      phase: { type: 'integer' },
                      goal: { type: 'string' },
                      keyActions: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            title: { type: 'string' },
                            steps: { type: 'array', items: { type: 'string' } },
                            shouldRepeat: {
                              type: 'boolean',
                              description: 'Is this a recurring action?',
                            },
                            frequency: {
                              type: 'number',
                              description:
                                'After how many milliseconds should this action be taken again?',
                            },
                          },
                          required: [
                            'title',
                            'steps',
                            'shouldRepeat',
                            'frequency',
                          ],
                          additionalProperties: false,
                        },
                        description:
                          '5 distinct actions that I need to take in this phase which includes all aspects of my business necessary for this phase to be successful',
                      },
                      monetizationAndRevenueStreams: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                        description:
                          '3 different revenue streams that I can build in this phase',
                      },
                      timeframe: { type: 'string' },
                    },
                    required: [
                      'phase',
                      'goal',
                      'keyActions',
                      'monetizationAndRevenueStreams',
                      'timeframe',
                    ],
                    additionalProperties: false,
                  },
                },
              },
              required: [
                'targetAudienceInformation',
                'productsAndServices',
                'contentStrategy',
                'businessRoadMap',
              ],
              additionalProperties: false,
            },
          },
        },
      });
      // Parse the OpenAI response text (expected to be JSON per schema)
      const outputData = JSON.parse(modelResponse.output_text);

      // 2. Ensure the Partner exists (equivalent to find or create).
      const email = 'connect@miithyldave.com'; // default partner email (could be in config)

      let partner = await this.partnersService.findPartnerByEmail(email);
      if (!partner) {
        partner = await this.partnersService.createPartner({
          email,
          name: 'Mithyll Dave',
          phone: '+919136640283',
          orgName: 'Vihtribez Content Lab',
        });
      }

      await this.tokenUsageService.createTokenUsage({
        partnerId: partner.id,
        agentName: 'Business Roadmap',
        inputTokenCount: modelResponse?.usage?.input_tokens || 0,
        cachedInputTokenCount:
          modelResponse?.usage?.input_tokens_details?.cached_tokens || 0,
        outputTokenCount: modelResponse?.usage?.output_tokens || 0,
      });

      return outputData;
    } catch (err) {
      throw new BadRequestException('Failed to generate business roadmap');
    }
  }

  async deleteTokens(): Promise<void> {
    const email = 'connect@miithyldave.com';
    await this.tokenUsageService.deleteTokenUsageByPartner(email);
  }
}
