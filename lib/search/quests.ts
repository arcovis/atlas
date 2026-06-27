import type { Quest } from "@/types/quest";

export type QuestSearchFilters = {
  location?: string;
  minLevel?: number;
  maxLevel?: number;
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

    const matchesMinLevel =
      filters.minLevel === undefined || quest.level >= filters.minLevel;

    const matchesMaxLevel =
      filters.maxLevel === undefined || quest.level <= filters.maxLevel;

    return (
      matchesName && matchesLocation && matchesMinLevel && matchesMaxLevel
    );
  });
}
