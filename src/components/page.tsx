import { PiArrowCounterClockwise } from 'react-icons/pi';
import { useDisableOnChange } from '../hooks/disable-on-change';
import { useGame } from '../store/game';
import { cn } from '../utils/cn';
import { getActionMessage, getPlayDelay } from '../utils/messages';
import { Direction, GameState, Sides } from '../utils/types';
import { DiceHistory } from './dice';
import { SideComponent } from './side';

export default function Page() {
  const { play, state, nextRoundCount, reset } = useGame();
  const rounds = nextRoundCount();

  const disabled =
    useDisableOnChange(false, getPlayDelay(state), [state]) ||
    (state !== GameState.Finished && rounds === 0);

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      <SideComponent side={Sides.Attack} direction={Direction.Up} />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col max-w-full gap-1">
        <DiceHistory side={Sides.Attack} />

        <div className="flex gap-2 self-center">
          <button
            type="submit"
            disabled={disabled}
            onClick={play}
            className={cn(
              'bg-green-500 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all z-10',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {getActionMessage(state)}
          </button>

          {state === GameState.Rolling && (
            <button
              onClick={reset}
              type="button"
              className="my-auto font-bold text-red-800 rounded-full text-xl w-7 h-7 flex justify-center items-center hover:bg-black hover:bg-opacity-10 active:bg-opacity-20 transition-all z-10"
            >
              <PiArrowCounterClockwise />
            </button>
          )}
        </div>

        <DiceHistory side={Sides.Defense} />
      </div>

      <SideComponent side={Sides.Defense} direction={Direction.Down} />
    </div>
  );
}
