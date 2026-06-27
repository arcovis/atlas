import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buildQuestTree, type QuestTreeNode } from "@/lib/quests";

const QUEST_TREE_DEPTH = 6;

type JourneyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type QuestTreeProps = {
  node: QuestTreeNode;
  branchLabel?: "Main path" | "Side branch";
};

function QuestTree({ node, branchLabel }: QuestTreeProps) {
  return (
    <div className="space-y-3">
      <Link href={`/quests/${node.quest.id}`} className="block">
        <Card className="transition-colors hover:bg-muted/40">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <CardTitle>{node.quest.name}</CardTitle>
                <CardDescription>{node.quest.location}</CardDescription>
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                {branchLabel && (
                  <Badge variant="outline">{branchLabel}</Badge>
                )}
                <Badge variant="secondary">Level {node.quest.level}</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>
      </Link>

      {node.children.length > 0 && (
        <div className="ml-4 border-l border-border pl-4 md:ml-8 md:pl-6">
          <div className="space-y-4">
            {node.children.map((childNode, index) => (
              <div key={childNode.quest.id} className="relative">
                <div className="absolute -left-4 top-6 h-px w-4 bg-border md:-left-6 md:w-6" />
                <QuestTree
                  node={childNode}
                  branchLabel={index === 0 ? "Main path" : "Side branch"}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { id } = await params;
  const questTree = buildQuestTree(id, QUEST_TREE_DEPTH);

  if (!questTree) {
    return (
      <main className="w-full max-w-4xl mx-auto px-6 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Quest tree not found</CardTitle>
            <CardDescription>
              No quest exists for the requested journey starting point.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  return (
    <main className="w-full max-w-4xl mx-auto px-6 py-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Branching Story Tree
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Multiple forward paths starting from {questTree.quest.name}.
        </p>
      </header>

      <QuestTree node={questTree} />
    </main>
  );
}
