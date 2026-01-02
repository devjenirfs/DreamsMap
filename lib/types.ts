export interface Dream {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  affirmation?: string;
  completed: boolean;
}

export interface Category {
  id: string;
  title: string;
  emoji: string;
  color: string;
  gradient: string;
  dreams: Dream[];
}
