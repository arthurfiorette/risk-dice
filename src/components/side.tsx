import { PiShieldCheckeredFill, PiSwordDuotone } from 'react-icons/pi';
import { useGame } from '../store/game';
import { cn } from '../utils/cn';
import { Direction, GameState, Sides } from '../utils/types';
import { ArrowButton } from './buttons';
import { Dices } from './dice';

export interface SideProps {
  side: Sides;
  direction: Direction;
}

export function SideComponent({ side, direction }: SideProps) {
  const { state, troops, setTroops, getLastRoll, winner } = useGame();
  const isAttack = side === Sides.Attack;
  const last = getLastRoll();

  const Icon = isAttack ? PiSwordDuotone : PiShieldCheckeredFill;

  return (
    <div
      className={cn(
        'flex-1 flex flex-col items-center justify-between relative gap-10 ',
        isAttack ? 'bg-red-500' : 'bg-yellow-500'
      )}>
      <Icon
        className={cn(
          'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0',
          'w-[50%] h-[50%] mb-[-0.5rem] opacity-50',
          isAttack ? 'text-red-600' : 'text-yellow-600'
        )}
      />

      {direction === Direction.Down && state !== GameState.Waiting && (
        <div className='flex space-x-4 h-12 z-10 mt-auto'>
          {last && <Dices side={side} roll={last} />}
        </div>
      )}

      <div
        className={cn(
          'flex items-center justify-center z-10',
          state !== GameState.Waiting
            ? direction === Direction.Up
              ? 'mt-auto'
              : 'mb-auto'
            : 'my-auto'
        )}>
        <input
          type='number'
          value={troops[side]}
          disabled={state !== GameState.Waiting}
          min={0}
          placeholder='?'
          onChange={(e) => setTroops(side, Number.parseInt(e.target.value))}
          className={cn(
            // remove arrows
            '[-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none',
            'w-24 h-16 text-center font-bold text-white text-2xl ring-2 rounded-xl shadow-md focus:outline-none focus:ring-4 transition-all',
            isAttack ? 'bg-red-400' : 'bg-yellow-400',
            isAttack ? 'ring-red-300' : 'ring-yellow-300',
            isAttack ? 'placeholder-red-200' : 'placeholder-yellow-200',
            isAttack ? 'focus:ring-red-300' : 'focus:ring-yellow-300',
            isAttack ? 'focus:border-red-200' : 'focus:border-yellow-200',
            winner === side && ' bg-green-500 ring-green-200'
          )}
        />

        {state === GameState.Waiting && (
          <div className='ml-2'>
            <ArrowButton side={side} direction={Direction.Up} />
            <ArrowButton
              side={side}
              direction={Direction.Down}
              disabled={troops[side] === 1}
            />
          </div>
        )}
      </div>

      {direction === Direction.Up && state !== GameState.Waiting && (
        <div className='flex space-x-4 h-12 z-10 mb-auto'>
          {last && <Dices side={side} roll={last} />}
        </div>
      )}
    </div>
  );
}
