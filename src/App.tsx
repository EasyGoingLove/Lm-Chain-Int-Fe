
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import React from 'react';
import { ModeProvider, useMode } from './context/ModeContext';  // Import ModeProvider

import { config } from './config';

import Favorites from './pages/Favorites';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import StartPage from './pages/StartPage';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const ProtectedRoute: React.FC<{children:React.ReactNode}> = ({children}) => {
  const {mode} = useMode();

  if(!mode){
    return < Navigate to='/'/>
  }

  return children;
}

const App: React.FC = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ModeProvider> {/* Wrap the application with ModeProvider */}
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Router>
        </ModeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
