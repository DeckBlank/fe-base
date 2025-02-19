import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TitleContextProps } from './titleContex.props';

const TitleContext = createContext<TitleContextProps | undefined>(undefined);


export const useTitle = () => {
  const context = useContext(TitleContext);
  if (!context) {
    throw new Error('useTitle debe ser utilizado dentro de TitleProvider');
  }
  return context;
};


export const TitleProvider = ({ initialTitle, children }: { initialTitle: string; children: ReactNode }) => {
  const [title, setTitle] = useState(initialTitle);
  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};
