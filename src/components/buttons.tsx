import { useGame } from '../store/game';
import { cn } from '../utils/cn';
import { Direction, Sides } from '../utils/types';
import { ArrowDown, ArrowUp } from './icons';

export interface ButtonsProps {
  side: Sides;
  direction: Direction;
  disabled?: boolean;
}

export function ArrowButton({ side, direction, disabled }: ButtonsProps) {
  const setTroops = useGame((g) => g.setTroops);

  function click() {
    setTroops(side, (val) => {
      switch (direction) {
        case Direction.Up:
          return val + 1;
        case Direction.Down:
          return Math.max(0, val - 1);
      }
    });
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={click}
      className={cn(
        'text-white w-16 h-10 flex items-center justify-center focus:outline-none',
        disabled && 'disabled:invisible',
        direction === Direction.Up ? 'rounded-t-lg' : 'rounded-b-lg',
        side === Sides.Attack ? 'bg-red-600' : 'bg-yellow-600',
        side === Sides.Attack ? 'hover:bg-red-700' : 'hover:bg-yellow-700',
        side === Sides.Attack ? 'active:bg-red-800' : 'active:bg-yellow-800'
      )}
    >
      {direction === Direction.Up ? <ArrowUp /> : <ArrowDown />}
    </button>
  );
}
