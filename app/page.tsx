import { QuestWorkspace } from "@/components/quests/QuestWorkspace";
import { quests } from "@/lib/data/quests";

export default function Home() {
  return <QuestWorkspace quests={quests} />;
}
