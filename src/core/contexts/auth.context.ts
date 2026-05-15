import { createContext } from 'react';

import type { User } from '../models';
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  disconnect: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);