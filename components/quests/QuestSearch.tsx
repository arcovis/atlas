"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { filterQuests } from "@/lib/search/quests";
import type { Quest } from "@/types/quest";

type QuestSearchProps = {
  quests: Quest[];
};

function parseLevelFilter(value: string): number | undefined {
  if (value.trim() === "") {
    return undefined;
  }

  const parsedValue = Number(value);

  return Number.isNaN(parsedValue) ? undefined : parsedValue;
}

export function QuestSearch({ quests }: QuestSearchProps) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [minLevel, setMinLevel] = useState("");
  const [maxLevel, setMaxLevel] = useState("");

  const filteredQuests = useMemo(
    () =>
      filterQuests(quests, query, {
        location,
        minLevel: parseLevelFilter(minLevel),
        maxLevel: parseLevelFilter(maxLevel),
      }),
    [quests, query, location, minLevel, maxLevel]
  );

  return (
    <main className="w-full max-w-5xl mx-auto px-6 py-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Quest Search</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Find Wynncraft quests by name, location, and progression level.
        </p>
      </header>

      <section className="mb-8 grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_9rem_9rem]">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="quest-search">
            Quest name
          </label>
          <Input
            id="quest-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="quest-location">
            Location
          </label>
          <Input
            id="quest-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Any location"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="quest-min-level">
            Min level
          </label>
          <Input
            id="quest-min-level"
            type="number"
            min={1}
            value={minLevel}
            onChange={(event) => setMinLevel(event.target.value)}
            placeholder="1"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="quest-max-level">
            Max level
          </label>
          <Input
            id="quest-max-level"
            type="number"
            min={1}
            value={maxLevel}
            onChange={(event) => setMaxLevel(event.target.value)}
            placeholder="106"
          />
        </div>
      </section>

      {filteredQuests.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No quests found</CardTitle>
            <CardDescription>
              Try adjusting the search text, location, or level range.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <section className="grid gap-4">
          {filteredQuests.map((quest) => (
            <Link key={quest.id} href={`/quests/${quest.id}`}>
              <Card className="transition-colors hover:bg-muted/40">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle>{quest.name}</CardTitle>
                      <CardDescription>{quest.location}</CardDescription>
                    </div>
                    <Badge variant="secondary">Level {quest.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {quest.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}
