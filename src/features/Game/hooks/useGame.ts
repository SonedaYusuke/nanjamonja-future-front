import { useOutletContext } from 'react-router-dom';
import { GameContext } from '../GameContext';

export const useGame = () => useOutletContext<GameContext>();
