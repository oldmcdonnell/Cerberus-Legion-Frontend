import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Example of useState with type annotation
const ExampleComponent: React.FC = () => {
  const [count, setCount] = useState<number>(0); // Explicit type for the state variable

  useEffect(() => {
    // Side effect
    console.log('Component mounted');
  }, []); // Empty dependency array to run on mount

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
