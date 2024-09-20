// Define types for the authentication state
export interface AuthState {
    accessToken: string;
    isAuthenticated: boolean;
    user: string | null; // Could be a string (username) or an object (user details)
}

// Define action types for managing authentication
export type AuthAction =
  | { type: 'SET_ACCESS_TOKEN'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: string }
  | { type: 'SET_AUTHENTICATED'; payload: boolean };

// Retrieve state from localStorage
const JSONStorage = localStorage.getItem('STATE')
    ? JSON.parse(localStorage.getItem('STATE') as string)
    : null;

// Initial state
export const initialMainState: AuthState = JSONStorage ?? {
    accessToken: '',
    isAuthenticated: false,
    user: null,
}

// Function to save the state to localStorage
const saveStateToLocalStorage = (state: AuthState) => {
    const stateToStore = JSON.stringify(state);
    localStorage.setItem('STATE', stateToStore);
}

// Reducer function to handle authentication-related actions
export const reducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'SET_ACCESS_TOKEN':
            const newStateWithToken = { ...state, accessToken: action.payload, isAuthenticated: true };
            saveStateToLocalStorage(newStateWithToken);
            return newStateWithToken;

        case 'SET_USER':
            const newStateWithUser = { ...state, user: action.payload };
            saveStateToLocalStorage(newStateWithUser);
            return newStateWithUser;

        case 'SET_AUTHENTICATED':
            const newStateWithAuth = { ...state, isAuthenticated: action.payload };
            saveStateToLocalStorage(newStateWithAuth);
            return newStateWithAuth;

        case 'LOGOUT':
            localStorage.removeItem('STATE');
            return { ...state, accessToken: '', isAuthenticated: false, user: null };  // Reset state on logout

        default:
            return state;  // Return the current state for any unhandled actions
    }
}
