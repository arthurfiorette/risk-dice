import { MAX_DICE_ROUNDS, type RollDice, useGame } from '../store/game';
import { cn } from '../utils/cn';
import { Sides } from '../utils/types';

export interface DiceProps {
  side: Sides;
  roll: RollDice;
  small?: boolean;
}

export function Dices({ side, small, roll }: DiceProps) {
  const oppositeSide = side === Sides.Attack ? Sides.Defense : Sides.Attack;

  return (
    <>
      {Array.from({ length: MAX_DICE_ROUNDS }, (_, index) => {
        const value = roll.dices[side][index];
        const otherValue = roll.dices[oppositeSide][index];

        return (
          <div
            key={index}
            className={cn(
              'rounded-md flex items-center justify-center text-2xl font-bold ring-transparent',
              small ? 'w-6 h-6 text-sm' : 'w-12 h-12',
              value ? 'bg-white shadow-md' : side === Sides.Attack ? 'bg-red-600' : 'bg-yellow-600',
              !otherValue && 'bg-opacity-60',

              side === Sides.Attack ? 'text-red-500' : 'text-yellow-500',

              // is winner
              otherValue &&
                side === roll.rounds[index] &&
                (small ? ' ring-2 ring-green-400' : ' ring-4 ring-green-400')
            )}
          >
            {value}
          </div>
        );
      })}
    </>
  );
}

export interface DiceGroupProps {
  side: Sides;
}

export function DiceHistory({ side }: DiceGroupProps) {
  const rolls = useGame((g) => g.rolls);

  return (
    <div
      className={cn(
        'flex gap-1 overflow-x-scroll scrollbar-thin scrollbar-track-transparent self-start w-screen',
        side === Sides.Attack ? 'scrollbar-thumb-red-400' : 'scrollbar-thumb-yellow-400'
      )}
    >
      {[...rolls].reverse().map((roll, index) => (
        <div
          key={index}
          className="flex m-2 transition-all animate-grow rounded-md opacity-80 gap-1"
        >
          <Dices side={side} roll={roll} small />
        </div>
      ))}
    </div>
  );
}
