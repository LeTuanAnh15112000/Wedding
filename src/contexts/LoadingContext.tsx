'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LoadingContextType {
  isLoadingComplete: boolean;
  setLoadingComplete: (complete: boolean) => void;
  hasShownBefore: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [hasShownBefore, setHasShownBefore] = useState(false);

  useEffect(() => {
    // Check if loading has been shown before
    const hasShown = document.cookie.indexOf('loadingShown=1') !== -1;
    setHasShownBefore(hasShown);
    
    // If loading has been shown before, mark as complete immediately
    if (hasShown) {
      setIsLoadingComplete(true);
    }
  }, []);

  const setLoadingComplete = (complete: boolean) => {
    setIsLoadingComplete(complete);
  };

  return (
    <LoadingContext.Provider value={{ 
      isLoadingComplete, 
      setLoadingComplete, 
      hasShownBefore 
    }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}