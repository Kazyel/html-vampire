export type AvailableEvents =
  | 'healthUpdate'
  | 'killUpdate'
  | 'experienceUpdate'
  | 'levelUp';

export type GameUIEvent = {
  event: AvailableEvents;
  callback: () => void;
};
