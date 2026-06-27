import { Gem, MapPin, Sparkles, UserRound } from "lucide-react";
import type { Quest } from "@/types/quest";

type QuestDetailsPanelProps = {
  quest: Quest;
  onSelectQuest: (questId: string) => void;
};

function AtlasDivider() {
  return (
    <div aria-hidden="true" className="flex items-center gap-3 text-[#8a6a32]/70">
      <span className="h-px flex-1 bg-current" />
      <span className="relative size-3 rounded-full border border-current">
        <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-current" />
      </span>
      <span className="h-px flex-1 bg-current" />
    </div>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[1.05rem] border border-[#5a4322]/28 bg-[linear-gradient(180deg,rgba(24,22,18,0.74),rgba(12,12,10,0.84))] px-6 py-6 shadow-[inset_0_1px_0_rgba(243,199,102,0.04),0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-md ${className}`}
    >
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#9d895b]/74">
      {children}
    </p>
  );
}

function RewardBlock({
  icon,
  value,
  label,
  accentClassName,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  accentClassName: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className={`flex items-center gap-3 ${accentClassName}`}>
        <span className="shrink-0 text-[#caa957]">{icon}</span>
        <span className="text-[1.48rem] font-semibold leading-tight tracking-[-0.01em] text-[#f3ead7]">
          {value}
        </span>
      </div>
      <SectionLabel>{label}</SectionLabel>
    </div>
  );
}

function ItemRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-xl border border-[#8a6a32]/28 bg-[linear-gradient(180deg,rgba(20,18,14,0.72),rgba(14,13,11,0.82))] px-5 py-4 text-[1rem] leading-7 text-[#f2ead6]/94 shadow-[inset_0_1px_0_rgba(243,199,102,0.035)]">
      {children}
    </li>
  );
}

export function QuestDetailsPanel({ quest }: QuestDetailsPanelProps) {
  const rewardItems = quest.rewards.items ?? [];

  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <div className="space-y-2">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[#caa957]">
            Quest Details
          </p>
          <h1 className="font-serif text-[3rem] font-semibold leading-[1.02] text-[#f1c567]">
            {quest.name}
          </h1>
        </div>
      </header>

      <AtlasDivider />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)]">
        <Panel className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <MapPin
                className="size-4 shrink-0 text-[#caa957]"
                aria-hidden="true"
              />
              <p className="text-[1.05rem] font-medium uppercase tracking-[0.22em] text-[#d6b05a]">
                Location
              </p>
            </div>
            <p className="pl-[1.75rem] text-[1.78rem] font-normal leading-tight text-[#f2ead6]">
              {quest.location}
            </p>
          </div>

          <div className="py-1">
            <AtlasDivider />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <UserRound
                className="size-4 shrink-0 text-[#caa957]"
                aria-hidden="true"
              />
              <p className="text-[1.05rem] font-medium uppercase tracking-[0.22em] text-[#d6b05a]">
                Starting NPC
              </p>
            </div>
            <p className="pl-[1.75rem] text-[1.72rem] font-normal leading-tight text-[#f2ead6]">
              {quest.starterNpc}
            </p>
          </div>
        </Panel>

        <Panel className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-[1rem] font-semibold uppercase tracking-[0.38em] text-[#e0b85e]">
              Rewards
            </h2>
            <div className="space-y-7">
              <RewardBlock
                icon={<Sparkles className="size-4" aria-hidden="true" />}
                value={
                  quest.rewards.xp !== undefined
                    ? `+${quest.rewards.xp} XP`
                    : "None listed"
                }
                label="Experience Reward"
                accentClassName="text-[#9bb9d9]"
              />

              <div className="py-1">
                <AtlasDivider />
              </div>

              <RewardBlock
                icon={<Gem className="size-4" aria-hidden="true" />}
                value={
                  quest.rewards.emeralds !== undefined
                    ? `+${quest.rewards.emeralds} Emeralds`
                    : "None listed"
                }
                label="Currency Reward"
                accentClassName="text-[#9ebf92]"
              />
            </div>
          </div>

          <div className="py-1">
            <AtlasDivider />
          </div>

          <div className="space-y-4">
            <SectionLabel>Items</SectionLabel>
            {rewardItems.length > 0 ? (
              <ul className="space-y-3">
                {rewardItems.map((item) => (
                  <ItemRow key={item}>{item}</ItemRow>
                ))}
              </ul>
            ) : (
              <p className="text-[1rem] leading-7 text-[#8f7953]">
                No item rewards.
              </p>
            )}
          </div>
        </Panel>
      </div>
    </article>
  );
}
