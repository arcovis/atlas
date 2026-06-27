"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { ProgressiveQuestTree } from "@/components/quests/ProgressiveQuestTree";
import { QuestDetailsPanel } from "@/components/quests/QuestDetailsPanel";
import { QuestSearch } from "@/components/quests/QuestSearch";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buildQuestTree } from "@/lib/quests";
import type { Quest } from "@/types/quest";

type QuestWorkspaceProps = {
  quests: Quest[];
  initialQuestId?: string;
};

function getQuestUrl(questId: string) {
  return `/quest/${questId}`;
}

export function QuestWorkspace({ quests, initialQuestId }: QuestWorkspaceProps) {
  const fallbackQuestId = quests[0]?.id;
  const [selectedQuestId, setSelectedQuestId] = useState(() =>
    initialQuestId !== undefined &&
    quests.some((quest) => quest.id === initialQuestId)
      ? initialQuestId
      : fallbackQuestId
  );

  const questById = useMemo(
    () => new Map(quests.map((quest) => [quest.id, quest])),
    [quests]
  );

  const selectedQuest =
    selectedQuestId !== undefined ? questById.get(selectedQuestId) : undefined;
  const questTree =
    selectedQuestId !== undefined ? buildQuestTree(selectedQuestId, 0) : undefined;

  useEffect(() => {
    if (!selectedQuest && fallbackQuestId !== undefined) {
      setSelectedQuestId(fallbackQuestId);
    }
  }, [fallbackQuestId, selectedQuest]);

  useEffect(() => {
    const handlePopState = () => {
      const questId = window.location.pathname.match(/^\/quest\/([^/]+)$/)?.[1];

      if (questId !== undefined && questById.has(questId)) {
        setSelectedQuestId(questId);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [questById]);

  useEffect(() => {
    if (selectedQuestId === undefined) {
      return;
    }

    const nextUrl = getQuestUrl(selectedQuestId);

    if (window.location.pathname !== nextUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [selectedQuestId]);

  function handleSelectQuest(questId: string) {
    setSelectedQuestId(questId);

    const nextUrl = getQuestUrl(questId);

    if (window.location.pathname !== nextUrl) {
      window.history.pushState(null, "", nextUrl);
    }
  }

  if (!selectedQuest || !questTree) {
    return (
      <main className="flex h-full w-full items-start overflow-hidden p-5 text-[#f2ead6]">
        <Card className="border-[#5a4322]/55 bg-[linear-gradient(180deg,rgba(24,24,22,0.78),rgba(12,12,11,0.82))] text-[#f2ead6] shadow-[inset_0_1px_0_rgba(243,199,102,0.06),0_18px_50px_rgba(0,0,0,0.34)] backdrop-blur-md">
          <CardHeader>
            <CardTitle>No quest selected</CardTitle>
            <CardDescription>
              No quests are available for the workspace.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex h-full min-h-0 w-full flex-col overflow-hidden text-[#f2ead6]">
      <header className="flex shrink-0 items-center gap-5 bg-[linear-gradient(180deg,rgba(5,7,6,0.42),rgba(5,7,6,0.06)_80%,transparent)] px-8 py-6">
        <Image
          src="/images/atlas-logo.png"
          alt="Atlas logo"
          width={80}
          height={80}
          className="h-[80px] w-[80px] shrink-0 object-contain drop-shadow-[0_5px_16px_rgba(0,0,0,0.45)]"
          priority
        />
        <div className="min-w-0">
          <div className="font-logo text-[2.65rem] font-semibold leading-none tracking-[0.18em] text-[#f1c567]">
            ATLAS
          </div>
          <div className="mt-2 text-sm tracking-[0.22em] text-[#a99462]">
            Wynncraft Companion
          </div>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 gap-5 overflow-hidden px-5 pb-5 lg:grid-cols-[minmax(18rem,0.25fr)_minmax(28rem,0.47fr)_minmax(21rem,0.28fr)]">
        <aside className="min-h-0 overflow-hidden rounded-xl border border-[#5a4322]/38 bg-[linear-gradient(180deg,rgba(29,28,24,0.74),rgba(12,12,10,0.78))] p-5 shadow-[inset_0_1px_0_rgba(243,199,102,0.06),inset_0_-1px_0_rgba(0,0,0,0.22),0_18px_48px_rgba(0,0,0,0.25)] backdrop-blur-md">
          <QuestSearch
            quests={quests}
            selectedQuestId={selectedQuest.id}
            onSelectQuest={handleSelectQuest}
          />
        </aside>

        <section className="min-h-0 overflow-y-auto rounded-xl border border-[#6b4f25]/48 bg-[linear-gradient(180deg,rgba(30,29,25,0.79),rgba(12,12,10,0.83))] p-8 shadow-[inset_0_1px_0_rgba(243,199,102,0.075),inset_0_-1px_0_rgba(0,0,0,0.24),0_22px_58px_rgba(0,0,0,0.32)] backdrop-blur-md">
          <QuestDetailsPanel
            quest={selectedQuest}
            onSelectQuest={handleSelectQuest}
          />
        </section>

        <aside className="flex min-h-0 flex-col overflow-y-auto rounded-xl border border-[#5a4322]/38 bg-[linear-gradient(180deg,rgba(29,28,24,0.74),rgba(12,12,10,0.78))] p-5 shadow-[inset_0_1px_0_rgba(243,199,102,0.06),inset_0_-1px_0_rgba(0,0,0,0.22),0_18px_48px_rgba(0,0,0,0.25)] backdrop-blur-md">
          <header className="mb-7 shrink-0 space-y-3 text-center">
            <h2 className="font-display text-[1rem] font-semibold uppercase tracking-[0.28em] text-[#e0b85e]">
              Quest Journey
            </h2>
            <p className="mx-auto max-w-xs text-[0.95rem] leading-6 text-[#bfa66f]">
              Explore the questline and see where it leads...
            </p>
          </header>
          <div className="flex min-h-[20rem] flex-1 items-center">
            <ProgressiveQuestTree
              key={selectedQuest.id}
              node={questTree}
              selectedQuestId={selectedQuest.id}
              onSelectQuest={handleSelectQuest}
            />
          </div>
        </aside>
      </div>
    </main>
  );
}
