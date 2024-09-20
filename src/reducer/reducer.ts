const JSONStorage = JSON.parse(localStorage.getItem('STATE'));

export const initialMainState = JSONStorage ?? {
    accessToken: '',
}

const saveStateToLocalStorage = (state: any) => {
    const stateToStore = JSON.stringify(state);
    localStorage.setItem('STATE', stateToStore);
}

export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_ACCESS_TOKEN':
            const newState = { ...state, accessToken: action.payload };
            saveStateToLocalStorage(newState);
            return newState;
            
        case 'LOGOUT':
            localStorage.removeItem('STATE');'
        default:
            return state;
    }
}