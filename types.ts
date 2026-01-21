
export interface Track {
  id: number;
  title: string;
  caption: string;
  src: string;
}

export interface Reason {
  title: string;
  description: string;
  emoji: string;
}

export interface MomentCard {
  image: string;
  caption: string;
  emoji: string;
  rotation: number;
  position: string;
}

export interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}
