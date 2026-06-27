"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getNextQuests, type QuestTreeNode } from "@/lib/quests";
import type { Quest } from "@/types/quest";

const MAX_QUEST_TREE_DEPTH = 6;

type BranchLabel = "Main path" | "Side branch";

type ProgressiveQuestTreeProps = {
  node: QuestTreeNode;
};

type QuestTreeNodeViewProps = {
  quest: Quest;
  depth: number;
  path: string[];
  branchLabel?: BranchLabel;
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
  branchLabel,
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
    <div className="space-y-3">
      <Card className="transition-colors hover:bg-muted/40">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <button
              type="button"
              className="flex min-w-0 flex-1 items-start gap-3 text-left outline-none focus-visible rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-expanded={isExpandable ? isExpanded : undefined}
              disabled={!isExpandable}
              onClick={() => {
                if (isExpandable) {
                  setIsExpanded((currentValue) => !currentValue);
                }
              }}
            >
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-muted-foreground">
                {isExpandable ? (
                  isExpanded ? (
                    <ChevronDown className="size-4" aria-hidden="true" />
                  ) : (
                    <ChevronRight className="size-4" aria-hidden="true" />
                  )
                ) : null}
              </span>
              <span className="min-w-0 space-y-1">
                <CardTitle>{quest.name}</CardTitle>
                <CardDescription>{quest.location}</CardDescription>
              </span>
            </button>
            <div className="flex flex-wrap justify-end gap-2">
              {branchLabel && <Badge variant="outline">{branchLabel}</Badge>}
              <Badge variant="secondary">Level {quest.level}</Badge>
              <Button asChild variant="ghost" size="sm">
                <Link href={`/quests/${quest.id}`}>View quest</Link>
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {(shouldShowChildren || shouldShowDepthPlaceholder) && (
        <div className="ml-4 border-l border-border pl-4 md:ml-8 md:pl-6">
          <div className="space-y-4">
            {shouldShowChildren &&
              children.map((childQuest, index) => (
                <div key={childQuest.id} className="relative">
                  <div className="absolute -left-4 top-6 h-px w-4 bg-border md:-left-6 md:w-6" />
                  <QuestTreeNodeView
                    quest={childQuest}
                    depth={depth + 1}
                    path={[...path, childQuest.id]}
                    branchLabel={index === 0 ? "Main path" : "Side branch"}
                  />
                </div>
              ))}

            {shouldShowDepthPlaceholder && (
              <div className="relative">
                <div className="absolute -left-4 top-6 h-px w-4 bg-border md:-left-6 md:w-6" />
                <Link href={`/journey/${quest.id}`} className="block">
                  <Card className="border-dashed transition-colors hover:bg-muted/40">
                    <CardHeader>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-1">
                          <CardTitle>View more</CardTitle>
                          <CardDescription>
                            Continue the tree from {quest.name}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">Depth limit</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProgressiveQuestTree({ node }: ProgressiveQuestTreeProps) {
  return (
    <QuestTreeNodeView quest={node.quest} depth={1} path={[node.quest.id]} />
  );
}
