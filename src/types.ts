export type LinkPair = { demo?: string; repo?: string };

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  teamSize: number;
  rating: number; // 0..5 (0.5 steps ok)
  period?: string;
  role?: string;
  stack: string[];
  tags: string[];
  links: LinkPair;
  highlights: string[];
  images?: string[];
}

export interface Thought {
  id: string;
  title: string;
  content: string; // markdown ok
  createdAt: string; // ISO
}

export type ReactionEmoji = "👍" | "🔥" | "💡" | "😂" | "❤️";
export type TargetType = "post" | "project";

export interface Reaction {
  id: string;
  targetType: TargetType;
  targetId: string;
  emoji: ReactionEmoji;
  count: number;
}
