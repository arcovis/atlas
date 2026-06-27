import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProgressiveQuestTree } from "@/components/quests/ProgressiveQuestTree";
import { buildQuestTree } from "@/lib/quests";

type JourneyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { id } = await params;
  const questTree = buildQuestTree(id, 0);

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

      <ProgressiveQuestTree node={questTree} />
    </main>
  );
}
