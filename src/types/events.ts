export type AvailableEvents = "healthUpdate" | "killUpdate" | "experienceUpdate";

export type GameUIEvent = {
  event: AvailableEvents;
  callback: () => void;
};
