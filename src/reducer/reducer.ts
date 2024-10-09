// Define types for the authentication state
export interface AuthState {
    accessToken: string;
    isAuthenticated: boolean;
    user: string | null; // Could be a string (username) or an object (user details)
    profile: Record<string, any>;  // Assuming profile is an object
    profiles: any[];  // Adjust type as needed
    users: any[];  // Adjust type as needed
    profileImSeeing: any[];  // Adjust type as needed
}

// Define action types for managing authentication
export type AuthAction =
  | { type: 'SET_ACCESS_TOKEN'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: string }
  | { type: 'SET_AUTHENTICATED'; payload: boolean }
  | { type: 'LOGIN'; payload: { accessToken: string; user: string } } // Correct syntax for LOGIN
  | { type: 'SET_PROFILE'; payload: any };  // Correct syntax for SET_PROFILE


// Retrieve state from localStorage
const JSONStorage = localStorage.getItem('STATE')
    ? JSON.parse(localStorage.getItem('STATE') as string)
    : null;

// Initial state
export const initialMainState: AuthState = JSONStorage ?? {
    accessToken: '',
    isAuthenticated: false,
    user: null,
    profile: {},  // Initially an empty object
    profiles: [],  // Initially an empty array
    users: [],  // Initially an empty array
    profileImSeeing: [],  // Initially an empty array
}

// Function to save the state to localStorage
const saveStateToLocalStorage = (state: AuthState) => {
    const stateToStore = JSON.stringify(state);
    localStorage.setItem('STATE', stateToStore);
}

// Reducer function to handle authentication-related actions
export const reducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':  // Handle LOGIN action
        const newStateWithLogin = {
          ...state,
          accessToken: action.payload.accessToken,
          user: action.payload.user,
          isAuthenticated: true,
        };
        saveStateToLocalStorage(newStateWithLogin);
        return newStateWithLogin;


        case 'SET_ACCESS_TOKEN':
            const newStateWithToken = {
              ...state,
              accessToken: action.payload || '',  // Ensure accessToken is not null or undefined
              isAuthenticated: !!action.payload,  // Set isAuthenticated to true only if accessToken is valid
            };
            
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
        
        case 'SET_PROFILE':
            const newStateWithProf = { ...state, profile: action.payload };  // Corrected to update profile
            saveStateToLocalStorage(newStateWithProf);
            return newStateWithProf;

        case 'LOGOUT':
            localStorage.removeItem('STATE');
            return { 
                accessToken: '', 
                isAuthenticated: false, 
                user: null, 
                profile: {},  // Reset profile on logout
                profiles: [],  // Reset profiles on logout
                users: [],  // Reset users on logout
                profileImSeeing: []  // Reset profileImSeeing on logout
            };

        default:
            return state;  // Return the current state for any unhandled actions
    }
}
