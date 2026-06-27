import { quests } from "@/lib/data/quests";
import type { Quest } from "@/types/quest";

const DEFAULT_QUEST_TREE_DEPTH = 3;

export interface QuestTreeNode {
  quest: Quest;
  children: QuestTreeNode[];
}

export function getQuestById(id: string): Quest | undefined {
  return quests.find((quest) => quest.id === id);
}

export function getNextQuests(quest: Quest): Quest[] {
  return quest.unlocks
    .map((questId) => getQuestById(questId))
    .filter((nextQuest): nextQuest is Quest => Boolean(nextQuest));
}

export function getPrerequisiteQuests(quest: Quest): Quest[] {
  return quest.prerequisites
    .map((questId) => getQuestById(questId))
    .filter((prerequisite): prerequisite is Quest => Boolean(prerequisite));
}

export function buildQuestTree(
  startQuestId: string,
  depth = DEFAULT_QUEST_TREE_DEPTH
): QuestTreeNode | undefined {
  const startQuest = getQuestById(startQuestId);

  if (!startQuest) {
    return undefined;
  }

  return buildQuestTreeNode(startQuest, Math.max(0, depth), new Set<string>());
}

function buildQuestTreeNode(
  quest: Quest,
  remainingDepth: number,
  visitedQuestIds: Set<string>
): QuestTreeNode {
  const nextVisitedQuestIds = new Set(visitedQuestIds);
  nextVisitedQuestIds.add(quest.id);

  if (remainingDepth === 0) {
    return {
      quest,
      children: [],
    };
  }

  const children = quest.unlocks
    .map((questId) => getQuestById(questId))
    .filter(
      (childQuest): childQuest is Quest =>
        childQuest !== undefined && !nextVisitedQuestIds.has(childQuest.id)
    )
    .map((childQuest) =>
      buildQuestTreeNode(childQuest, remainingDepth - 1, nextVisitedQuestIds)
    );

  return {
    quest,
    children,
  };
}
