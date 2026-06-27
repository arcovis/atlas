import type { Quest } from "@/types/quest";

export const quests: Quest[] = [
  {
    id: "kings-recruit",
    name: "King's Recruit",
    level: 1,
    location: "Ragni",
    description:
      "Join the Ragni army and learn the basics of adventuring at the start of your journey through Wynn.",
    prerequisites: [],
    unlocks: [
      "enzans-brother",
      "cook-assistant",
      "poisoning-the-pest",
      "mushroom-man",
      "black-road-assistance",
    ],
    rewards: {
      xp: 120,
      emeralds: 10,
    },
    tags: ["main"],
  },
  {
    id: "enzans-brother",
    name: "Enzan's Brother",
    level: 1,
    location: "Ragni Outskirts",
    description:
      "Help Enzan find his brother near Ragni while getting familiar with the roads outside the city.",
    prerequisites: ["kings-recruit"],
    unlocks: ["elemental-exercise"],
    rewards: {
      xp: 80,
      emeralds: 6,
    },
    tags: ["side"],
  },
  {
    id: "cook-assistant",
    name: "Cook Assistant",
    level: 3,
    location: "Ragni",
    description:
      "Gather ingredients for the Ragni cook and learn how local errands support early progression.",
    prerequisites: ["kings-recruit"],
    unlocks: ["potion-making"],
    rewards: {
      xp: 190,
      emeralds: 12,
    },
    tags: ["side"],
  },
  {
    id: "poisoning-the-pest",
    name: "Poisoning the Pest",
    level: 3,
    location: "Ragni Plains",
    description:
      "Help deal with a pest problem threatening farms just outside Ragni.",
    prerequisites: ["kings-recruit"],
    unlocks: ["infested-plants"],
    rewards: {
      xp: 210,
      emeralds: 14,
    },
    tags: ["side"],
  },
  {
    id: "mushroom-man",
    name: "Mushroom Man",
    level: 3,
    location: "Nivla Woods",
    description:
      "Investigate a strange mushroom problem near the forest and help a local villager with their request.",
    prerequisites: ["kings-recruit"],
    unlocks: ["tunnel-trouble"],
    rewards: {
      xp: 240,
      emeralds: 16,
    },
    tags: ["side"],
  },
  {
    id: "black-road-assistance",
    name: "Black Road Assistance",
    level: 4,
    location: "Black Road",
    description:
      "Assist travelers along the Black Road as you begin moving beyond Ragni's immediate surroundings.",
    prerequisites: ["kings-recruit"],
    unlocks: ["stable-story"],
    rewards: {
      xp: 300,
      emeralds: 18,
    },
    tags: ["side"],
  },
  {
    id: "potion-making",
    name: "Potion Making",
    level: 5,
    location: "Ragni",
    description:
      "Collect materials for a potion brewer and learn about simple early-game preparation.",
    prerequisites: ["cook-assistant"],
    unlocks: ["underwater"],
    rewards: {
      xp: 420,
      emeralds: 24,
    },
    tags: ["side"],
  },
  {
    id: "infested-plants",
    name: "Infested Plants",
    level: 6,
    location: "Ragni Plains",
    description:
      "Clear dangerous plant growth from the fields around Ragni before it spreads further.",
    prerequisites: ["poisoning-the-pest"],
    unlocks: ["stable-story"],
    rewards: {
      xp: 520,
      emeralds: 28,
    },
    tags: ["side"],
  },
  {
    id: "tunnel-trouble",
    name: "Tunnel Trouble",
    level: 6,
    location: "Ragni Mines",
    description:
      "Investigate problems in the tunnels near Ragni and help reopen a safer route for locals.",
    prerequisites: ["mushroom-man"],
    unlocks: ["the-sewers-of-ragni", "underwater"],
    rewards: {
      xp: 560,
      emeralds: 30,
    },
    tags: ["side"],
  },
  {
    id: "elemental-exercise",
    name: "Elemental Exercise",
    level: 7,
    location: "Ragni Outskirts",
    description:
      "Learn how elemental strengths and weaknesses shape combat decisions in Wynn.",
    prerequisites: ["enzans-brother"],
    unlocks: ["underwater"],
    rewards: {
      xp: 650,
      emeralds: 32,
    },
    tags: ["side"],
  },
  {
    id: "underwater",
    name: "Underwater",
    level: 8,
    location: "Maltic Coast",
    description:
      "Help with a coastal problem near Maltic and get your first taste of sea-adjacent adventuring.",
    prerequisites: ["potion-making", "tunnel-trouble", "elemental-exercise"],
    unlocks: ["maltics-well"],
    rewards: {
      xp: 760,
      emeralds: 40,
    },
    tags: ["side"],
  },
  {
    id: "the-sewers-of-ragni",
    name: "The Sewers of Ragni",
    level: 9,
    location: "Ragni Sewers",
    description:
      "Enter the sewers beneath Ragni and investigate a growing threat below the city.",
    prerequisites: ["tunnel-trouble"],
    unlocks: ["arachnids-ascent"],
    rewards: {
      xp: 900,
      emeralds: 48,
    },
    tags: ["dungeon-related"],
  },
  {
    id: "arachnids-ascent",
    name: "Arachnids' Ascent",
    level: 10,
    location: "Nivla Woods",
    description:
      "Track spider activity through Nivla Woods and push deeper into early combat challenges.",
    prerequisites: ["the-sewers-of-ragni"],
    unlocks: ["stable-story"],
    rewards: {
      xp: 1080,
      emeralds: 52,
    },
    tags: ["dungeon-related"],
  },
  {
    id: "a-confused-farmer",
    name: "A Confused Farmer",
    level: 10,
    location: "Katoa Ranch",
    description:
      "Help a farmer sort out a strange problem on the road between Ragni and Detlas.",
    prerequisites: ["infested-plants"],
    unlocks: ["creeper-infiltration"],
    rewards: {
      xp: 1120,
      emeralds: 56,
    },
    tags: ["side"],
  },
  {
    id: "stable-story",
    name: "Stable Story",
    level: 13,
    location: "Ternaves",
    description:
      "Help around the stables near Ternaves and learn more about travel across the province.",
    prerequisites: ["black-road-assistance", "infested-plants", "arachnids-ascent"],
    unlocks: ["maltics-well", "a-confused-farmer"],
    rewards: {
      xp: 1600,
      emeralds: 64,
    },
    tags: ["side"],
  },
  {
    id: "maltics-well",
    name: "Maltic's Well",
    level: 13,
    location: "Maltic",
    description:
      "Investigate the town well in Maltic and uncover what is troubling the coastal village.",
    prerequisites: ["underwater", "stable-story"],
    unlocks: ["dwelling-walls"],
    rewards: {
      xp: 1680,
      emeralds: 70,
    },
    tags: ["side"],
  },
  {
    id: "dwelling-walls",
    name: "Dwelling Walls",
    level: 14,
    location: "Detlas Suburbs",
    description:
      "Look into suspicious activity around the homes outside Detlas as the story moves inland.",
    prerequisites: ["maltics-well"],
    unlocks: ["studying-the-corrupt", "grave-digger"],
    rewards: {
      xp: 1900,
      emeralds: 80,
    },
    tags: ["side"],
  },
  {
    id: "creeper-infiltration",
    name: "Creeper Infiltration",
    level: 14,
    location: "Pigmen's Ravines",
    description:
      "Infiltrate a dangerous area and deal with an explosive threat before it gets worse.",
    prerequisites: ["a-confused-farmer"],
    unlocks: ["studying-the-corrupt"],
    rewards: {
      xp: 1950,
      emeralds: 82,
    },
    tags: ["side"],
  },
  {
    id: "studying-the-corrupt",
    name: "Studying the Corrupt",
    level: 15,
    location: "Detlas",
    description:
      "Help researchers around Detlas study corruption and connect early quests to the province's larger conflict.",
    prerequisites: ["dwelling-walls", "creeper-infiltration"],
    unlocks: ["recover-the-past"],
    rewards: {
      xp: 2300,
      emeralds: 96,
    },
    tags: ["main"],
  },
  {
    id: "grave-digger",
    name: "Grave Digger",
    level: 20,
    location: "Nemract",
    description:
      "Investigate unsettling activity near Nemract's graveyard and help restore order.",
    prerequisites: ["dwelling-walls"],
    unlocks: ["the-dark-descent", "pit-of-the-dead"],
    rewards: {
      xp: 4200,
      emeralds: 128,
    },
    tags: ["side"],
  },
  {
    id: "recover-the-past",
    name: "Recover the Past",
    level: 20,
    location: "Detlas",
    description:
      "Follow clues around Detlas that reveal more about Wynn's recent history and its lingering dangers.",
    prerequisites: ["studying-the-corrupt"],
    unlocks: ["lost-soles", "the-mercenary"],
    rewards: {
      xp: 4400,
      emeralds: 132,
    },
    tags: ["main"],
  },
  {
    id: "the-dark-descent",
    name: "The Dark Descent",
    level: 21,
    location: "Nemract",
    description:
      "Descend beneath Nemract to confront a darker thread connected to the area's restless dead.",
    prerequisites: ["grave-digger"],
    unlocks: ["lost-soles"],
    rewards: {
      xp: 5000,
      emeralds: 144,
    },
    tags: ["side"],
  },
  {
    id: "lost-soles",
    name: "Lost Soles",
    level: 22,
    location: "Nemract",
    description:
      "Help a local solve a missing-shoes mystery that turns into a small but memorable Nemract errand.",
    prerequisites: ["recover-the-past", "the-dark-descent"],
    unlocks: ["the-angry-village"],
    rewards: {
      xp: 5400,
      emeralds: 152,
    },
    tags: ["side"],
  },
  {
    id: "pit-of-the-dead",
    name: "Pit of the Dead",
    level: 23,
    location: "Ancient Nemract",
    description:
      "Explore a dangerous pit near Ancient Nemract and deal with another undead disturbance.",
    prerequisites: ["grave-digger"],
    unlocks: ["the-angry-village"],
    rewards: {
      xp: 5900,
      emeralds: 160,
    },
    tags: ["side"],
  },
  {
    id: "the-angry-village",
    name: "The Angry Village",
    level: 24,
    location: "Elkurn",
    description:
      "Mediate a local problem in Elkurn and uncover why tensions in the village have boiled over.",
    prerequisites: ["lost-soles", "pit-of-the-dead"],
    unlocks: ["clearing-the-camps"],
    rewards: {
      xp: 6600,
      emeralds: 180,
    },
    tags: ["side"],
  },
  {
    id: "the-mercenary",
    name: "The Mercenary",
    level: 24,
    location: "Detlas",
    description:
      "Take on paid work from a Detlas contact and get pulled into a rougher side of the province.",
    prerequisites: ["recover-the-past"],
    unlocks: ["tempo-town-trouble"],
    rewards: {
      xp: 6700,
      emeralds: 188,
    },
    tags: ["side"],
  },
  {
    id: "clearing-the-camps",
    name: "Clearing the Camps",
    level: 25,
    location: "Elkurn Fields",
    description:
      "Help clear hostile camps outside Elkurn and make the road safer for nearby travelers.",
    prerequisites: ["the-angry-village"],
    unlocks: ["tempo-town-trouble"],
    rewards: {
      xp: 7400,
      emeralds: 202,
    },
    tags: ["side"],
  },
  {
    id: "tempo-town-trouble",
    name: "Tempo Town Trouble",
    level: 26,
    location: "Tempo Town",
    description:
      "Investigate a disruption in Tempo Town as the early-game quest web spreads beyond Detlas.",
    prerequisites: ["the-mercenary", "clearing-the-camps"],
    unlocks: ["the-corrupted-village"],
    rewards: {
      xp: 8200,
      emeralds: 216,
    },
    tags: ["side"],
  },
  {
    id: "the-corrupted-village",
    name: "The Corrupted Village",
    level: 27,
    location: "Corrupted Village",
    description:
      "Enter a village touched by corruption and help its residents deal with the consequences.",
    prerequisites: ["tempo-town-trouble"],
    unlocks: ["misadventure-on-the-sea"],
    rewards: {
      xp: 9000,
      emeralds: 230,
    },
    tags: ["main"],
  },
  {
    id: "misadventure-on-the-sea",
    name: "Misadventure on the Sea",
    level: 28,
    location: "Nemract Docks",
    description:
      "Set out from Nemract's docks and get wrapped up in trouble on the water.",
    prerequisites: ["the-corrupted-village"],
    unlocks: ["beneath-the-depths"],
    rewards: {
      xp: 9800,
      emeralds: 246,
    },
    tags: ["side"],
  },
  {
    id: "beneath-the-depths",
    name: "Beneath the Depths",
    level: 30,
    location: "Selchar Coast",
    description:
      "Follow sea-born rumors toward deeper waters and cap off this early progression slice.",
    prerequisites: ["misadventure-on-the-sea"],
    unlocks: [],
    rewards: {
      xp: 11200,
      emeralds: 280,
    },
    tags: ["side"],
  },
];
