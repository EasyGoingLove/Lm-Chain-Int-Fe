import React from 'react';
import { useAccount } from 'wagmi';

import { useMode } from '../context/ModeContext';
import HomeApi from '../components/HomeApi';  
import HomeBlockchain from '../components/HomeBlockchain';  
import LockedScreen from '../components/LockedScreen';  

const Home: React.FC = () => {
  const { isConnected } = useAccount();
  const { mode } = useMode(); 
  
  if (!isConnected && mode === 'blockchain') {
    return <LockedScreen />; 
  }
 
  return (
    <>
      {mode === 'api' && <HomeApi />}
      {mode === 'blockchain' && <HomeBlockchain />}
    </>
  );
};

export default Home;
