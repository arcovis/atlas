"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { filterQuests } from "@/lib/search/quests";
import type { Quest } from "@/types/quest";

type QuestSearchProps = {
  quests: Quest[];
  selectedQuestId?: string;
  onSelectQuest?: (questId: string) => void;
};

export function QuestSearch({
  quests,
  selectedQuestId,
  onSelectQuest,
}: QuestSearchProps) {
  const [query, setQuery] = useState("");

  const filteredQuests = useMemo(
    () => filterQuests(quests, query),
    [quests, query]
  );

  return (
    <section className="flex h-full min-h-0 flex-col gap-5">
      <header className="shrink-0">
        <h1 className="text-sm font-semibold uppercase tracking-[0.26em] text-[#d8b35b]">
          Search
        </h1>
      </header>

      <Input
        id="quest-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a quest..."
        className="h-12 shrink-0 border-[#6b4f25]/42 bg-[#0d0d0a]/72 px-4 text-[#f2ead6] shadow-[inset_0_1px_8px_rgba(0,0,0,0.2)] placeholder:text-[#8f7953]/82 transition-all duration-200 focus-visible:border-[#d8b35b]/88 focus-visible:ring-[#d8b35b]/22 focus-visible:shadow-[inset_0_1px_8px_rgba(0,0,0,0.22),0_0_20px_rgba(216,179,91,0.11)]"
      />

      {filteredQuests.length === 0 ? (
        <div className="rounded-xl bg-[rgba(22,20,16,0.5)] p-5 text-sm text-[#bfa66f]">
          No quests found.
        </div>
      ) : (
        <section className="grid min-h-0 gap-4 overflow-y-auto pr-1">
          {filteredQuests.map((quest) => (
            <button
              key={quest.id}
              type="button"
              className={
                quest.id === selectedQuestId
                  ? "block rounded-xl border border-[#6fbf3f]/85 bg-[linear-gradient(135deg,rgba(39,78,29,0.86),rgba(17,38,17,0.82))] p-4 text-left shadow-[inset_0_1px_0_rgba(165,220,112,0.1),0_12px_28px_rgba(75,143,47,0.16)] transition-all duration-200 ease-out hover:-translate-y-px hover:border-[#84d757]/90"
                  : "block rounded-xl border border-[#5a4322]/24 bg-[rgba(22,20,16,0.48)] p-4 text-left shadow-[0_8px_22px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out hover:-translate-y-px hover:border-[#8a6a32]/52 hover:bg-[rgba(31,28,20,0.66)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.18)]"
              }
              onClick={() => onSelectQuest?.(quest.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-medium text-[#f2ead6]/95">
                    {quest.name}
                  </div>
                  <div className="mt-1.5 truncate text-sm text-[#bfa66f]">
                    {quest.location}
                  </div>
                </div>
                <div className="shrink-0 text-sm font-semibold text-[#d8b35b]">
                  Lv. {quest.combatLevel}
                </div>
              </div>
            </button>
          ))}
        </section>
      )}
    </section>
  );
}
