export const ScreenState = {
  GAMEPLAY: 'GAMEPLAY',
  PAUSE: 'PAUSE',
  POWERUP: 'POWERUP',
  LEVELUP: 'LEVELUP',
  WEAPONDROP: 'WEAPONDROP',
  SETTINGS: 'SETTINGS',
} as const;

export type ScreenState = (typeof ScreenState)[keyof typeof ScreenState];
