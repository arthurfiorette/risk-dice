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
