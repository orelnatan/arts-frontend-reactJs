import { useEffect, useState, type ReactNode } from 'react';

import { AuthContext } from '../contexts';
import { useAuthToken, useUser } from '../hooks'; 
import type { User } from '../models';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  
  const { token, removeToken } = useAuthToken();
  const { getUser } = useUser();

  useEffect(() => {
    const bootstrapAuth = async () => {
      if (token && !user) {
        try {
          const userData = await getUser(token);

          setUser(userData);
        } catch (err) {
          console.error("Session expired or invalid token ", err);
          
          removeToken();
        }
      }
      setIsInitializing(false);
    };

    bootstrapAuth();
  }, [token, user, getUser, removeToken]);

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading: isInitializing, logout }}>
      {children}
    </AuthContext.Provider>
  );
};