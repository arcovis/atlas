export type QuestId = string;

export type QuestTag = "main" | "side" | "dungeon-related";

export interface QuestRewards {
  xp?: number;
  emeralds?: number;
}

export interface Quest {
  id: QuestId;
  name: string;
  level: number;
  location: string;
  description: string;
  prerequisites: QuestId[];
  unlocks: QuestId[];
  rewards: QuestRewards;
  tags: QuestTag[];
}
