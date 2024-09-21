import { create } from 'zustand';
import { rollDice } from '../utils/math';
import { GameState, Sides } from '../utils/types';

export type RollDice = {
  /**
   * The rolls for each side.
   */
  dices: Record<Sides, number[]>;

  /**
   * Array de vitórias onde cada index é uma jogada de dado e o valor é o ganhador
   */
  rounds: Sides[];

  /**
   * The winner of this roll.
   */
  winner: Sides;

  /**
   * The number of troops lost for each side.
   */
  troopsLost: Record<Sides, number>;
};

export type GameData = {
  /**
   * The current state of the game.
   */
  state: GameState;

  /**
   * The number of troops for each side.
   */
  initialTroops: Record<Sides, number>;

  /**
   * The number of troops for each side.
   */
  troops: Record<Sides, number>;

  /**
   * The list of rolls that have been made.
   */
  rolls: RollDice[];

  /**
   * The final winner of this game (if finished).
   */
  winner: Sides | null;

  /**
   * Set the number of troops for a side.
   */
  setTroops: (side: Sides, value: number | ((current: number) => number)) => void;

  /**
   * Starts, rolls again or restarts the game.
   */
  play: () => void;

  /**
   * Get the last roll that was made.
   */
  getLastRoll: () => RollDice | undefined;

  /**
   * Get dices for each side
   */
  nextDiceCount: () => Record<Sides, number>;

  /**
   * The number of dice rounds that can be rolled.
   */
  nextRoundCount: () => number;

  /**
   * Roll dices for each side.
   */
  rollDices: () => void;
};

/**
 * Maximum amount of dices that can be rolled
 */
export const MAX_DICE_ROUNDS = 3;

function initialState() {
  return {
    state: GameState.Waiting,
    initialTroops: { [Sides.Attack]: 0, [Sides.Defense]: 0 },
    troops: { [Sides.Attack]: 4, [Sides.Defense]: 4 },
    rolls: [],
    winner: null
  };
}

export const useGame = create<GameData>((set, get) => ({
  ...initialState(),

  play: () => {
    const { state, rollDices } = get();

    if (state === GameState.Finished) {
      set(() => ({
        ...initialState(),
        state: GameState.Waiting
      }));

      return;
    }

    if (state === GameState.Waiting) {
      set((state) => ({
        state: GameState.Rolling,
        initialTroops: { ...state.troops },
        rolls: [],
        winner: null
      }));
    }

    // Rolls dices for Waiting and Rolling states
    rollDices();
  },

  setTroops: (side, value) => {
    set((state) => ({
      troops: {
        ...state.troops,
        [side]: Math.max(1, typeof value === 'function' ? value(state.troops[side]) : value)
      }
    }));
  },

  getLastRoll: () => {
    const { rolls } = get();
    return rolls[rolls.length - 1];
  },

  nextDiceCount: () => {
    const { troops: currentTroops } = get();

    return {
      [Sides.Attack]: Math.min(currentTroops[Sides.Attack], MAX_DICE_ROUNDS),
      [Sides.Defense]: Math.min(currentTroops[Sides.Defense], MAX_DICE_ROUNDS)
    };
  },

  nextRoundCount: () => {
    const { troops: currentTroops } = get();

    return Math.max(
      0,
      Math.min(
        MAX_DICE_ROUNDS,
        // Defense amount
        currentTroops[Sides.Defense],
        // Attack amount - 1 because 1 has to stay behind
        currentTroops[Sides.Attack] - 1
      )
    );
  },

  rollDices: () => {
    const { troops, nextRoundCount } = get();
    const roundCount = nextRoundCount();

    const dices: Record<Sides, number[]> = {
      [Sides.Attack]: [],
      [Sides.Defense]: []
    };

    //Give the number of dices based on war's logic
    const getAttackDiceCount = (troops: number) => {
      if(troops >= 4) return 3;
      if(troops === 3) return 2;
      if(troops === 2) return 1;
        return 0;
    };

    //Give the number of dices based on war's logic
    const getDefenseDiceCount = (troops: number) => {
      if(troops >= 3) return 3;
      if(troops === 2) return 2;
      if(troops === 1) return 1;
      return 0;
    }

    //get the numbers
    const attackDiceCount = getAttackDiceCount(troops[Sides.Attack]);
    const defenseDiceCount = getDefenseDiceCount(troops[Sides.Defense]);

    // Roll dices
    for (const side of Object.values(Sides)) {
      const count = side === Sides.Attack ? attackDiceCount : defenseDiceCount;
      for (let i = 0; i < count; i++) {
        dices[side].push(rollDice());
      }

      // Sort dices so highest is first
      dices[side] = dices[side].sort((a, b) => b - a);
    }

    // calculates the winner
    const rounds = Array.from<Sides>({ length: roundCount });
    const wins: Record<Sides, number> = { [Sides.Attack]: 0, [Sides.Defense]: 0 };

    for (let i = 0; i < roundCount; i++) {
      const attack = dices[Sides.Attack][i]!;
      const defense = dices[Sides.Defense][i]!;

      // Finds round winner
      rounds[i] = attack > defense ? Sides.Attack : Sides.Defense;

      // Increments winner count
      wins[rounds[i]!]++;
    }

    // Finds final winner
    const winner = wins[Sides.Attack] > wins[Sides.Defense] ? Sides.Attack : Sides.Defense;

    // Total number of rounds - number of wins = number of troops lost
    const troopsLost: Record<Sides, number> = {
      [Sides.Attack]: roundCount - wins[Sides.Attack],
      [Sides.Defense]: roundCount - wins[Sides.Defense]
    };

    const updatedTroops = {
      [Sides.Attack]: troops[Sides.Attack] - troopsLost[Sides.Attack],
      [Sides.Defense]: troops[Sides.Defense] - troopsLost[Sides.Defense]
    };

    console.log({
      roundCount,
      dices,
      rounds,
      winner,
      troopsLost,
      updatedTroops
    });

    // Update store
    set((s) => ({
      rolls: [...s.rolls, { rounds, troopsLost, winner, dices }],
      troops: updatedTroops
    }));

    // Finish the game
    if (updatedTroops[Sides.Defense] === 0) {
      set({ state: GameState.Finished, winner: Sides.Attack });
    } else if (updatedTroops[Sides.Attack] <= 1) {
      set({ state: GameState.Finished, winner: Sides.Defense });
    }
  }
}));
