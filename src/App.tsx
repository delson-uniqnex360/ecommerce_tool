import './App.css'
import { useState } from 'react';
import AppRoutes from './routes/AppRoute';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


function App() {

  const [isAuth, setIsAuth] = useState(false);
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRoutes isAuth={isAuth} setIsAuth={setIsAuth} />
      </QueryClientProvider>
    </>
  )


}

export default App;
