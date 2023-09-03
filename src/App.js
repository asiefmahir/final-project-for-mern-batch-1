import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// import {useContext} from 'react'
import './App.css';
import Router from './router/Router';
import CartProvider from './contexts/Cart';
import AuthProvider from './contexts/Auth';

const client = new QueryClient()

function App() {
  return (
    <div className="App">
        <QueryClientProvider client={client}>
          <ReactQueryDevtools initialIsOpen={false} />
            <AuthProvider>
              <CartProvider>
                <Router />
              </CartProvider>
            </AuthProvider>
        </QueryClientProvider>
    </div>
  );
}

export default App;
