import { QuestSearch } from "@/components/quests/QuestSearch";
import { quests } from "@/lib/data/quests";

export default function SearchPage() {
  return <QuestSearch quests={quests} />;
}
