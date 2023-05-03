 
import { BrowserRouter } from "react-router-dom"; 
import Router from "./router";

import {QueryClient,QueryClientProvider, useQuery} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
   
      <BrowserRouter>
        <QueryClientProvider client={queryClient}> 
        <Router />
        </QueryClientProvider>
        
      </BrowserRouter> 
  );
}

export default App;
