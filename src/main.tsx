import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthContext } from './context';
import { reducer, initialMainState } from './reducer/reducer';

// Example of useState with type annotation
const ExampleComponent: React.FC = () => {
  const [count, setCount] = useState<number>(0); // Explicit type for the state variable

  useEffect(() => {
    console.log('Component mounted');
  }, []); // Empty dependency array to run on mount

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// AuthContext Provider with useReducer
const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialMainState); // Correct use of useReducer

  const authContextValue = {
    state,
    dispatch,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Setup React Router
const router = createBrowserRouter([
  {
    path: '/',
    element: <ExampleComponent />,
  },
]);

const App: React.FC = () => (
  <RouterProvider router={router} />
);

// Wrapping App with AuthContextProvider
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
