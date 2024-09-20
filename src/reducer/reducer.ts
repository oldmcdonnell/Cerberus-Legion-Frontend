// Define types for the action and state
interface State {
    accessToken: string;
}

interface Action {
    type: 'SET_ACCESS_TOKEN' | 'LOGOUT';
    payload?: string;  // payload is only needed for 'SET_ACCESS_TOKEN'
}

// Retrieve state from localStorage
const JSONStorage = localStorage.getItem('STATE')
    ? JSON.parse(localStorage.getItem('STATE') as string)
    : null;

// Initial state
export const initialMainState: State = JSONStorage ?? {
    accessToken: '',
}

// Function to save the state to localStorage
const saveStateToLocalStorage = (state: State) => {
    const stateToStore = JSON.stringify(state);
    localStorage.setItem('STATE', stateToStore);
}

// Reducer function with proper typing
export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_ACCESS_TOKEN':
            const newState = { ...state, accessToken: action.payload || '' };  // Ensure payload is handled safely
            saveStateToLocalStorage(newState);
            return newState;

        case 'LOGOUT':
            localStorage.removeItem('STATE');
            return { ...state, accessToken: '' };  // Return the updated state after logout

        default:
            return state;  // Return the current state for any unhandled actions
    }
}
