"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import { getNextQuests, getPrerequisiteQuests } from "@/lib/quests";
import type { Quest } from "@/types/quest";

const MAX_VISIBLE_DEPTH = 6;

type ProgressiveQuestTreeProps = {
  quest: Quest;
  onSelectQuest?: (questId: string) => void;
};

type QuestNodeProps = {
  quest: Quest;
  depth: number;
  path: string[];
  expandedQuestIds: Set<string>;
  onToggleQuest: (questId: string) => void;
  onSelectQuest?: (questId: string) => void;
};

function getVisibleChildren(quest: Quest, path: string[]) {
  const visitedQuestIds = new Set(path);

  return getNextQuests(quest).filter(
    (childQuest) => !visitedQuestIds.has(childQuest.id)
  );
}

function RoadmapSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#9d895b]/82">
        {label}
      </h3>
      {children}
    </section>
  );
}

function QuestButton({
  quest,
  isCurrent = false,
  onSelectQuest,
}: {
  quest: Quest;
  isCurrent?: boolean;
  onSelectQuest?: (questId: string) => void;
}) {
  return (
    <button
      type="button"
      className={
        isCurrent
          ? "relative w-full overflow-hidden rounded-2xl border border-[#6fbf3f]/78 bg-[radial-gradient(circle_at_84%_18%,rgba(130,215,87,0.16),transparent_34%),linear-gradient(135deg,rgba(39,78,29,0.9),rgba(17,38,17,0.86))] px-5 py-4 text-left text-[#f2ead6] shadow-[inset_0_1px_0_rgba(165,220,112,0.12),0_0_26px_rgba(75,143,47,0.14),0_16px_34px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#84d757]/88"
          : "w-full rounded-xl border border-[#5a4322]/26 bg-[linear-gradient(180deg,rgba(22,20,16,0.56),rgba(13,12,10,0.62))] px-4 py-3 text-left text-[#f2ead6] shadow-[0_8px_22px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8a6a32]/56 hover:bg-[rgba(31,28,20,0.72)] hover:shadow-[0_12px_26px_rgba(0,0,0,0.18)]"
      }
      onClick={() => onSelectQuest?.(quest.id)}
    >
      <span
        className={
          isCurrent
            ? "block text-[1.05rem] font-semibold leading-6"
            : "block text-[0.92rem] font-medium leading-6 text-[#f2ead6]/92"
        }
      >
        {quest.name}
      </span>
      <span className="mt-1 block text-xs text-[#bfa66f]/88">
        Lv. {quest.combatLevel}
      </span>
    </button>
  );
}

function ExpandableQuestNode({
  quest,
  depth,
  path,
  expandedQuestIds,
  onToggleQuest,
  onSelectQuest,
}: QuestNodeProps) {
  const children = useMemo(() => getVisibleChildren(quest, path), [quest, path]);
  const hasChildren = children.length > 0;
  const isExpanded = expandedQuestIds.has(quest.id);
  const canRenderChildren = depth < MAX_VISIBLE_DEPTH;
  const shouldShowChildren = hasChildren && canRenderChildren && isExpanded;
  const shouldShowDepthPlaceholder =
    hasChildren && !canRenderChildren && isExpanded;

  return (
    <div className="animate-in fade-in slide-in-from-top-1 duration-300">
      <div className="flex gap-3">
        <button
          type="button"
          className="mt-3 flex size-7 shrink-0 items-center justify-center rounded-full border border-[#8a6a32]/34 bg-[rgba(14,13,10,0.72)] text-[#bfa66f] shadow-[inset_0_1px_0_rgba(243,199,102,0.04)] transition-all duration-200 hover:border-[#d8b35b]/48 hover:bg-[rgba(31,28,20,0.76)] hover:text-[#e2bd63] disabled:border-transparent disabled:bg-transparent disabled:opacity-0 disabled:shadow-none"
          aria-expanded={hasChildren ? isExpanded : undefined}
          disabled={!hasChildren}
          onClick={() => onToggleQuest(quest.id)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="size-4" aria-hidden="true" />
            ) : (
              <ChevronRight className="size-4" aria-hidden="true" />
            )
          ) : null}
        </button>
        <QuestButton quest={quest} onSelectQuest={onSelectQuest} />
      </div>

      {(shouldShowChildren || shouldShowDepthPlaceholder) && (
        <div className="relative ml-[0.85rem] mt-4 pl-8">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-full w-5 rounded-bl-3xl border-b-2 border-l-2 border-[#6f8f45]/42"
          />
          <div className="space-y-4">
            {shouldShowChildren &&
              children.map((childQuest) => (
                <ExpandableQuestNode
                  key={childQuest.id}
                  quest={childQuest}
                  depth={depth + 1}
                  path={[...path, childQuest.id]}
                  expandedQuestIds={expandedQuestIds}
                  onToggleQuest={onToggleQuest}
                  onSelectQuest={onSelectQuest}
                />
              ))}

            {shouldShowDepthPlaceholder && (
              <button
                type="button"
                className="animate-in fade-in slide-in-from-top-1 duration-300 w-full rounded-xl border border-dashed border-[#8a6a32]/42 bg-[rgba(22,20,16,0.54)] px-4 py-3 text-left text-sm text-[#f3c766] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d8b35b]/62 hover:bg-[rgba(31,28,20,0.68)]"
                onClick={() => onSelectQuest?.(quest.id)}
              >
                View more
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProgressiveQuestTree({
  quest,
  onSelectQuest,
}: ProgressiveQuestTreeProps) {
  const [expandedQuestIds, setExpandedQuestIds] = useState<Set<string>>(
    () => new Set()
  );
  const previousQuests = getPrerequisiteQuests(quest);
  const nextQuests = getNextQuests(quest);

  function handleToggleQuest(questId: string) {
    setExpandedQuestIds((currentQuestIds) => {
      const nextQuestIds = new Set(currentQuestIds);

      if (nextQuestIds.has(questId)) {
        nextQuestIds.delete(questId);
      } else {
        nextQuestIds.add(questId);
      }

      return nextQuestIds;
    });
  }

  return (
    <div className="relative w-full space-y-9">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[34%] size-40 -translate-x-1/2 rounded-full border border-[#d8b35b]/5 opacity-80"
      />
      <RoadmapSection label="Previous">
        {previousQuests.length > 0 ? (
          <div className="space-y-4">
            {previousQuests.map((previousQuest) => (
              <QuestButton
                key={previousQuest.id}
                quest={previousQuest}
                onSelectQuest={onSelectQuest}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-[#8f7953]">No prerequisites.</p>
        )}
      </RoadmapSection>

      <RoadmapSection label="Current">
        <QuestButton quest={quest} isCurrent onSelectQuest={onSelectQuest} />
      </RoadmapSection>

      <RoadmapSection label="Next">
        {nextQuests.length > 0 ? (
          <div className="space-y-4">
            {nextQuests.map((nextQuest) => (
              <ExpandableQuestNode
                key={nextQuest.id}
                quest={nextQuest}
                depth={2}
                path={[quest.id, nextQuest.id]}
                expandedQuestIds={expandedQuestIds}
                onToggleQuest={handleToggleQuest}
                onSelectQuest={onSelectQuest}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm leading-6 text-[#8f7953]">
            No direct unlocks.
          </p>
        )}
      </RoadmapSection>
    </div>
  );
}
