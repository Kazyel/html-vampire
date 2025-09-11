export type AvailableEvents =
  | 'healthUpdate'
  | 'killUpdate'
  | 'experienceUpdate'
  | 'levelUp'
  | 'weaponDrop';

export type GameUIEvent = {
  event: AvailableEvents;
  callback: () => void;
};
