import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getNextQuests,
  getPrerequisiteQuests,
  getQuestById,
} from "@/lib/quests";

type QuestPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: QuestPageProps) {
  const { id } = await params;
  const quest = getQuestById(id);

  if (!quest) {
    return (
      <main className="w-full max-w-4xl mx-auto py-10 px-6">
        <Card>
          <CardHeader>
            <CardTitle>Quest not found</CardTitle>
            <CardDescription>
              No quest exists for the requested progression entry.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  const nextQuests = getNextQuests(quest);
  const prerequisiteQuests = getPrerequisiteQuests(quest);

  return (
    <main className="w-full max-w-4xl mx-auto py-10 px-6">
      <header className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{quest.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Level {quest.level}</Badge>
              <Badge>{quest.location}</Badge>
              {quest.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <Button asChild>
            <Link href={`/journey/${quest.id}`}>View Quest Tree</Link>
          </Button>
        </div>
      </header>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>What this quest is about</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{quest.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What should I do next?</CardTitle>
            <CardDescription>Quests unlocked by this step</CardDescription>
          </CardHeader>
          <CardContent>
            {nextQuests.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No follow-up quests are currently listed.
              </p>
            ) : (
              <ul className="list-disc pl-5 space-y-2">
                {nextQuests.map((nextQuest) => (
                  <li key={nextQuest.id} className="text-sm">
                    <Link
                      href={`/quests/${nextQuest.id}`}
                      className="font-medium underline-offset-4 hover:underline"
                    >
                      {nextQuest.name}
                    </Link>{" "}
                    <span className="text-muted-foreground">
                      Level {nextQuest.level}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Prerequisites</CardTitle>
              <CardDescription>Things required before you can start</CardDescription>
            </CardHeader>
            <CardContent>
              {quest.prerequisites.length === 0 ? (
                <p className="text-sm text-muted-foreground">None</p>
              ) : (
                <ul className="list-disc pl-5 space-y-1">
                  {prerequisiteQuests.map((prerequisiteQuest) => (
                    <li key={prerequisiteQuest.id} className="text-sm">
                      <Link
                        href={`/quests/${prerequisiteQuest.id}`}
                        className="font-medium underline-offset-4 hover:underline"
                      >
                        {prerequisiteQuest.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Unlocks</CardTitle>
              <CardDescription>Content you gain access to</CardDescription>
            </CardHeader>
            <CardContent>
              {nextQuests.length === 0 ? (
                <p className="text-sm text-muted-foreground">None</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {nextQuests.map((nextQuest) => (
                    <Badge key={nextQuest.id} asChild>
                      <Link href={`/quests/${nextQuest.id}`}>
                        {nextQuest.name}
                      </Link>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Rewards</CardTitle>
            <CardDescription>Quest completion rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {quest.rewards.xp !== undefined && (
                <Badge variant="secondary">{quest.rewards.xp} XP</Badge>
              )}
              {quest.rewards.emeralds !== undefined && (
                <Badge variant="secondary">
                  {quest.rewards.emeralds} emeralds
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
