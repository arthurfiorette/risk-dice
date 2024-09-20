import { useGame } from '../store/game';
import { getActionMessage } from '../utils/messages';
import { Direction, GameState, Sides } from '../utils/types';
import { SideComponent } from './side';

export default function Page() {
  const { play, state, nextRoundCount } = useGame();

  const count = nextRoundCount();
  return (
    <div className='flex flex-col h-screen relative'>
      <SideComponent side={Sides.Attack} direction={Direction.Up} />

      {count !== 0 && (
        <button
          type='submit'
          disabled={state === GameState.Finished || count === 0}
          onClick={play}
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all'>
          {getActionMessage(state)}
        </button>
      )}

      <SideComponent side={Sides.Defense} direction={Direction.Down} />
    </div>
  );
}
