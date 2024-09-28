import React, { createContext, useContext, useEffect, useState } from 'react';

interface ModeContextType {
  mode: string | null;
  setMode: (mode: string | null) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<string | null>(() => {
    return localStorage.getItem('cocktailMode');
  });

  useEffect(() => {
    if (mode) {
      localStorage.setItem('cocktailMode', mode);
    } else {
      localStorage.removeItem('cocktailMode');
    }
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = (): ModeContextType => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
