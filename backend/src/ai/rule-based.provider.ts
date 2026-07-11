import { AIProvider } from "./provider.js";
import { parseIntent } from "./intent-parser.js";
import { ParsedIntent } from "../types/ai.types.js";

export class RuleBasedProvider implements AIProvider {

    async parse(query: string): Promise<ParsedIntent> {
        return parseIntent(query);
    }

}