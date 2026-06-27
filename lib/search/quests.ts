import type { Quest } from "@/types/quest";

export type QuestSearchFilters = {
  location?: string;
  minCombatLevel?: number;
  maxCombatLevel?: number;
};

export function filterQuests(
  quests: Quest[],
  query: string,
  filters: QuestSearchFilters = {}
): Quest[] {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedLocation = filters.location?.trim().toLowerCase() ?? "";

  return quests.filter((quest) => {
    const matchesName =
      normalizedQuery.length === 0 ||
      quest.name.toLowerCase().includes(normalizedQuery);

    const matchesLocation =
      normalizedLocation.length === 0 ||
      quest.location.toLowerCase().includes(normalizedLocation);

    const matchesMinCombatLevel =
      filters.minCombatLevel === undefined ||
      quest.combatLevel >= filters.minCombatLevel;

    const matchesMaxCombatLevel =
      filters.maxCombatLevel === undefined ||
      quest.combatLevel <= filters.maxCombatLevel;

    return (
      matchesName &&
      matchesLocation &&
      matchesMinCombatLevel &&
      matchesMaxCombatLevel
    );
  });
}
