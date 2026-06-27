export interface Quest {
    id: string;
    name: string;
    level: number;
    description: string;
    location: string;

    prerequisites: string[];
    unlocks: string[];
}