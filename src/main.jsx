import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {QueryClientProvider,QueryClient} from '@tanstack/react-query'
import './index.css'

const queryclient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={queryclient}>
    <App />
    </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
