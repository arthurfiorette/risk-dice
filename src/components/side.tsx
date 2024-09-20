import { useGame } from '../store/game';
import { cn } from '../utils/cn';
import { Direction, GameState, Sides } from '../utils/types';
import { ArrowButton } from './buttons';
import { DiceGroup } from './dice';

export interface SideProps {
  side: Sides;
  direction: Direction;
}

export function SideComponent({ side, direction }: SideProps) {
  const { state, troops, setTroops } = useGame();

  const isAttack = side === Sides.Attack;

  return (
    <div
      className={cn(
        'flex-1 flex flex-col items-center justify-center',
        isAttack ? 'bg-red-500' : 'bg-yellow-500'
      )}
    >
      {direction === Direction.Down &&
        (state === GameState.Rolling || state === GameState.Finished) && (
          <DiceGroup side={side} direction={direction} />
        )}

      <div className="flex items-center justify-center my-auto">
        <input
          type="number"
          value={troops[side]}
          placeholder="Enter a number"
          onChange={(e) => setTroops(side, Number.parseInt(e.target.value) || 0)}
          className={cn(
            'w-32 h-16 text-center font-bold text-white text-2xl border-2 rounded-xl shadow-md focus:outline-none focus:ring-4 transition-all',
            isAttack ? 'bg-red-400' : 'bg-yellow-400',
            isAttack ? 'border-red-300' : 'border-yellow-300',
            isAttack ? 'placeholder-red-200' : 'placeholder-yellow-200',
            isAttack ? 'focus:ring-red-300' : 'focus:ring-yellow-300',
            isAttack ? 'focus:border-red-200' : 'focus:border-yellow-200'
          )}
        />

        {state === GameState.Waiting && (
          <div className="ml-2">
            <ArrowButton side={side} direction={Direction.Up} />
            <ArrowButton side={side} direction={Direction.Down} disabled={troops[side] === 1} />
          </div>
        )}
      </div>

      {direction === Direction.Up &&
        (state === GameState.Rolling || state === GameState.Finished) && (
          <DiceGroup side={side} direction={direction} />
        )}
    </div>
  );
}
