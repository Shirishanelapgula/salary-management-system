import { ParsedIntent } from "../types/ai.types.js";

export interface AIProvider {
    parse(query: string): Promise<ParsedIntent>;
}