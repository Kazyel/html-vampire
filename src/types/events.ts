export type GameUIEvent = {
  event: string;
  callback: () => void;
};

export type MovementKeys = {
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
};

export type BasicKeys = {
  Escape: boolean;
};
