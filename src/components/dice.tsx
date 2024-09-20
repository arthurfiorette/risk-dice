import { MAX_DICE_ROUNDS, useGame } from '../store/game';
import { cn } from '../utils/cn';
import { Direction, Sides } from '../utils/types';

export interface DiceProps {
  side: Sides;
}

export function Dices({ side }: DiceProps) {
  const { getLastRoll } = useGame();
  const lastRoll = getLastRoll();

  if (!lastRoll) {
    return <></>;
  }

  const oppositeSide = side === Sides.Attack ? Sides.Defense : Sides.Attack;

  return (
    <>
      {Array.from({ length: MAX_DICE_ROUNDS }, (_, index) => {
        const value = lastRoll.dices[side][index];

        return (
          <div
            key={index}
            className={cn(
              'w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold',
              value && 'bg-white shadow-md',
              value && (side === Sides.Attack ? 'text-red-500' : 'text-blue-500'),
              // has on both sides
              value &&
                lastRoll.dices[oppositeSide][index] &&
                // is winner
                side === lastRoll.winner &&
                'ring-4 ring-green-400'
            )}
          >
            {value}
          </div>
        );
      })}
    </>
  );
}

export interface DiceGroupProps extends DiceProps {
  direction: Direction;
}

export function DiceGroup({ side, direction }: DiceGroupProps) {
  const { troops, initialTroops } = useGame();
  const isAttack = side === Sides.Attack;

  return (
    <>
      {direction === Direction.Down && (
        <div className="flex space-x-4 mt-16 h-12">
          <Dices side={side} />
        </div>
      )}

      <div className="my-auto">
        <div className="w-16 ml-2 h-12 rounded-lg flex items-center justify-center text-2xl font-bold text-white gap-1">
          <div className={cn(isAttack ? 'text-red-300' : 'text-blue-300')}>
            {troops[side] - initialTroops[side]}
          </div>
          /
          <div className={cn(isAttack ? 'text-red-700' : 'text-blue-700')}>
            {initialTroops[side]}
          </div>
        </div>
      </div>

      {direction === Direction.Up && (
        <div className="flex space-x-4 mb-16 h-12">
          <Dices side={side} />
        </div>
      )}
    </>
  );
}
