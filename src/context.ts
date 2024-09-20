import { createContext, useState, ReactNode } from 'react';

// Define the shape of your context
interface AuthContextType {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

// Provide a default value for the context (can be null initially)
export const AuthContext = createContext<AuthContextType | null>(null);
