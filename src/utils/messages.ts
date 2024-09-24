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

export function getColorButton(state: GameState) {
  switch (state) {
    case GameState.Finished:
      return 'bg-slate-500 hover:bg-slate-600 active:bg-slate-700 focus:ring-slate-300';
    case GameState.Waiting:
      return 'bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-300 ';
    case GameState.Rolling:
      return 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300';
  }
}
