import { QuestWorkspace } from "@/components/quests/QuestWorkspace";
import { quests } from "@/lib/data/quests";

type QuestPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function QuestPage({ params }: QuestPageProps) {
  const { id } = await params;

  return <QuestWorkspace quests={quests} initialQuestId={id} />;
}
