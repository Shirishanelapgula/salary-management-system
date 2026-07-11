import { RuleBasedProvider } from "../ai/rule-based.provider.js";
import { aiQueryExecutor } from "../ai/query-executor.js";

export class AIService {
  private provider = new RuleBasedProvider();

  async execute(query: string) {
    const intent = await this.provider.parse(query);

    const result = await aiQueryExecutor.execute(intent);

    return {
      query,
      parsedIntent: intent,
      result,
    };
  }
}

export const aiService = new AIService();