import { createContext } from 'react';

// Define the shape of your context
export interface AuthContextType {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

// Create the context, allowing it to be null initially
export const AuthContext = createContext<AuthContextType | null>(null);
