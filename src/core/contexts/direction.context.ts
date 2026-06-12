import { createContext } from 'react';

import { Direction } from '../models'; 

interface DirectionContextType {
  direction: Direction;
}

export const DirectionContext = createContext<DirectionContextType | undefined>(undefined);