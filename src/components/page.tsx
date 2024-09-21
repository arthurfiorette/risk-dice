import { useDisableOnChange } from '../hooks/disable-on-change';
import { useGame } from '../store/game';
import { cn } from '../utils/cn';
import { getActionMessage } from '../utils/messages';
import { Direction, GameState, Sides } from '../utils/types';
import { DiceHistory } from './dice';
import { SideComponent } from './side';

export default function Page() {
  const { play, state, nextRoundCount } = useGame();
  const rounds = nextRoundCount();

  const disabled =
    useDisableOnChange(false, [state]) || (state !== GameState.Finished && rounds === 0);

  return (
    <div className="flex flex-col h-screen relative">
      <SideComponent side={Sides.Attack} direction={Direction.Up} />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center max-w-full">
        <DiceHistory side={Sides.Attack} />

        <button
          type="submit"
          disabled={disabled}
          onClick={play}
          className={cn(
            'bg-green-500 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          {getActionMessage(state)}
        </button>

        <DiceHistory side={Sides.Defense} />
      </div>

      <SideComponent side={Sides.Defense} direction={Direction.Down} />
    </div>
  );
}
