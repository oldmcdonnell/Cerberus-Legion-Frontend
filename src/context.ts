import { createContext } from 'react';
import { AuthState } from './reducer/reducer';

// Define the AuthContextType interface
export interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<any>;
}

// Create the AuthContext with `null` as the default
export const AuthContext = createContext<AuthContextType | null>(null);
