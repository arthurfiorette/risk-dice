import { GameState } from './types';

export function getActionMessage(state: GameState) {
  switch (state) {
    case GameState.Finished:
      return 'Restart?';
    case GameState.Waiting:
      return 'Start';
    case GameState.Rolling:
      return 'Roll again';
  }
}

export function getPlayDelay(state: GameState) {
  switch (state) {
    case GameState.Finished:
      return 1000;
    case GameState.Waiting:
      return 125;
    case GameState.Rolling:
      return 250;
  }
}
