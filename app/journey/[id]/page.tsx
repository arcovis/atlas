import { QuestWorkspace } from "@/components/quests/QuestWorkspace";
import { quests } from "@/lib/data/quests";

type JourneyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { id } = await params;

  return <QuestWorkspace quests={quests} initialQuestId={id} />;
}
