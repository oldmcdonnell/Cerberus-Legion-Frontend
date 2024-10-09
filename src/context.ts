import React, { createContext } from 'react';
import { AuthState, AuthAction } from './reducer/reducer';  // Adjust the path if necessary

// Define AuthContextType, AuthState, etc.
interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

// Create a default value for AuthContext that includes all fields in AuthState
const defaultAuthContext: AuthContextType = {
  state: {
    accessToken: '',
    isAuthenticated: false,
    user: null,
    profile: {},  // Include profile as an empty object
    profiles: [],  // Include profiles as an empty array
    users: [],  // Include users as an empty array
    profileImSeeing: [],  // Include profileImSeeing as an empty array
  },
  dispatch: () => null,  // Provide a no-op dispatch by default
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
