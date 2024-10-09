// context.ts
import React, { createContext } from 'react';
import { AuthState, AuthAction } from './reducer/reducer';  // Adjust the path if necessary

// Define AuthContextType, AuthState, etc.
interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

// Create a default value for AuthContext
const defaultAuthContext: AuthContextType = {
  state: {
    accessToken: '',
    isAuthenticated: false,
    user: null,
  },
  dispatch: () => null,  // Provide a no-op dispatch by default
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
