"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getNextQuests, type QuestTreeNode } from "@/lib/quests";
import type { Quest } from "@/types/quest";

const MAX_QUEST_TREE_DEPTH = 6;

type ProgressiveQuestTreeProps = {
  node: QuestTreeNode;
  selectedQuestId?: string;
  onSelectQuest?: (questId: string) => void;
};

type QuestTreeNodeViewProps = {
  quest: Quest;
  depth: number;
  path: string[];
  selectedQuestId?: string;
  onSelectQuest?: (questId: string) => void;
};

function getAvailableChildren(quest: Quest, path: string[]): Quest[] {
  const visitedQuestIds = new Set(path);

  return getNextQuests(quest).filter(
    (childQuest) => !visitedQuestIds.has(childQuest.id)
  );
}

function QuestTreeNodeView({
  quest,
  depth,
  path,
  selectedQuestId,
  onSelectQuest,
}: QuestTreeNodeViewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const children = useMemo(() => getAvailableChildren(quest, path), [quest, path]);
  const canRenderChildren = depth < MAX_QUEST_TREE_DEPTH;
  const hasChildren = children.length > 0;
  const isExpandable = hasChildren;
  const shouldShowChildren = isExpanded && canRenderChildren && hasChildren;
  const shouldShowDepthPlaceholder =
    isExpanded && !canRenderChildren && hasChildren;

  return (
    <div className="space-y-7">
      <Card
        className={
          depth === 1
            ? "mx-auto w-full max-w-[19rem] border-[#6fbf3f]/80 bg-[linear-gradient(135deg,rgba(39,78,29,0.9),rgba(17,38,17,0.86))] py-3.5 text-[#f2ead6] shadow-[inset_0_1px_0_rgba(165,220,112,0.1),0_14px_32px_rgba(75,143,47,0.16)] ring-0 transition-all duration-200"
            : quest.id === selectedQuestId
              ? "mx-auto w-full max-w-[19rem] border-[#6fbf3f]/78 bg-[rgba(22,20,16,0.76)] py-3.5 text-[#f2ead6] shadow-[0_12px_26px_rgba(75,143,47,0.13)] ring-0 transition-all duration-200"
              : "mx-auto w-full max-w-[19rem] border-[#5a4322]/38 bg-[rgba(22,20,16,0.62)] py-3.5 text-[#f2ead6] shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition-all duration-200 hover:-translate-y-px hover:border-[#8a6a32]/64 hover:bg-[rgba(31,28,20,0.76)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.2)]"
        }
      >
        <CardHeader className="px-4">
          <div className="flex items-start justify-between gap-3">
            <button
              type="button"
              className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm text-[#bfa66f] outline-none transition-colors duration-200 hover:text-[#e2bd63] focus-visible:ring-3 focus-visible:ring-[#6b4f25]/40 disabled:opacity-0"
              aria-expanded={isExpandable ? isExpanded : undefined}
              disabled={!isExpandable}
              onClick={() => {
                if (isExpandable) {
                  setIsExpanded((currentValue) => !currentValue);
                }
              }}
            >
              {isExpandable ? (
                isExpanded ? (
                  <ChevronDown className="size-4" aria-hidden="true" />
                ) : (
                  <ChevronRight className="size-4" aria-hidden="true" />
                )
              ) : null}
            </button>
            <button
              type="button"
              className="min-w-0 flex-1 space-y-1.5 text-left outline-none focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-[#6b4f25]/40"
              onClick={() => onSelectQuest?.(quest.id)}
            >
              <CardTitle className="text-[0.95rem] text-[#f2ead6]/95">
                {quest.name}
              </CardTitle>
              <CardDescription className="text-xs text-[#bfa66f]">
                Lv. {quest.combatLevel}
              </CardDescription>
            </button>
          </div>
        </CardHeader>
      </Card>

      {(shouldShowChildren || shouldShowDepthPlaceholder) && (
        <div className="border-l border-[#4b8f2f]/62 pl-5 md:pl-7">
          <div className="space-y-7">
            {shouldShowChildren &&
              children.map((childQuest) => (
                <div key={childQuest.id} className="relative">
                  <div className="absolute -left-5 top-8 h-px w-5 bg-[#4b8f2f]/62 md:-left-7 md:w-7" />
                  <QuestTreeNodeView
                    quest={childQuest}
                    depth={depth + 1}
                    path={[...path, childQuest.id]}
                    selectedQuestId={selectedQuestId}
                    onSelectQuest={onSelectQuest}
                  />
                </div>
              ))}

            {shouldShowDepthPlaceholder && (
              <div className="relative">
                <div className="absolute -left-5 top-8 h-px w-5 bg-[#4b8f2f]/62 md:-left-7 md:w-7" />
                <button
                  type="button"
                  className="block w-full text-left"
                  onClick={() => onSelectQuest?.(quest.id)}
                >
                  <Card className="mx-auto w-full max-w-[19rem] border-dashed border-[#5a4322]/48 bg-[rgba(22,20,16,0.58)] py-3.5 text-[#f2ead6] transition-all duration-200 hover:-translate-y-px hover:border-[#8a6a32]/68">
                    <CardHeader>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-1">
                          <CardTitle className="text-sm text-[#f3c766]">
                            View more
                          </CardTitle>
                          <CardDescription className="text-xs text-[#c6aa78]">
                            Continue the tree from {quest.name}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-[#6b4f25] text-[#c6aa78]"
                        >
                          Depth limit
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProgressiveQuestTree({
  node,
  selectedQuestId,
  onSelectQuest,
}: ProgressiveQuestTreeProps) {
  return (
    <div className="mx-auto w-full max-w-md">
      <QuestTreeNodeView
        quest={node.quest}
        depth={1}
        path={[node.quest.id]}
        selectedQuestId={selectedQuestId}
        onSelectQuest={onSelectQuest}
      />
    </div>
  );
}
