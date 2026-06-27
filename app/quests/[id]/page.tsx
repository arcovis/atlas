import React from "react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Separator } from "../../../components/ui/separator"

type Quest = {
  name: string
  level: number
  location: string
  description?: string
  prerequisites: string[]
  unlocks: string[]
  recommendations?: string[]
}

export default function Page({ params }: { params: { id: string } }) {
  const quest: Quest = {
    name: "King's Recruit",
    level: 1,
    location: "Ragni",
    description:
      "Help King Omoth recruit new soldiers and learn the basics of adventuring in Ragni. A short, friendly introduction quest that opens early progression paths.",
    prerequisites: [],
    unlocks: ["Mushroom Man", "Enzan's Brother", "Black Road Assistance"],
    recommendations: [
      "Talk to the villagers in Ragni",
      "Complete King's Recruit to unlock follow-ups",
      "Check the town noticeboard for side tasks",
    ],
  }

  return (
    <main className="max-w-4xl mx-auto py-10 px-6">
      {/* Header */}
      <header className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{quest.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary">Level {quest.level}</Badge>
              <Badge>{quest.location}</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-6">
        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>What this quest is about</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{quest.description}</p>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>What should I do next?</CardTitle>
            <CardDescription>Simple, actionable recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {quest.recommendations?.map((rec, i) => (
                <li key={i} className="text-sm">
                  {rec}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prerequisites */}
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
                  {quest.prerequisites.map((p, i) => (
                    <li key={i} className="text-sm">
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Unlocks */}
          <Card>
            <CardHeader>
              <CardTitle>Unlocks</CardTitle>
              <CardDescription>Content you gain access to</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {quest.unlocks.map((u, i) => (
                  <Badge key={i} className="capitalize">
                    {u}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progression */}
        <Card>
          <CardHeader>
            <CardTitle>How this fits in progression</CardTitle>
            <CardDescription>Short context</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This early quest introduces you to Ragni's local storylines and opens a
              few follow-up quests that ease you into leveling and exploring nearby
              regions.
            </p>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end">
          <Button>Explore Connections</Button>
        </div>
      </div>
    </main>
  )
}
