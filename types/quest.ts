export type QuestId = string;

export type QuestLength = "Short" | "Medium" | "Long";

export type QuestDifficulty = "Easy" | "Medium" | "Hard";

export interface QuestRewards {
  xp?: number;
  emeralds?: number;
  items?: string[];
}

export interface Quest {
  id: QuestId;
  name: string;
  length: QuestLength;
  difficulty: QuestDifficulty;
  location: string;
  combatLevel: number;
  starterNpc: string;
  prerequisites: QuestId[];
  unlocks: QuestId[];
  rewards: QuestRewards;
}
