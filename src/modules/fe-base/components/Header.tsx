
import { useTitle } from '@/modules/fe-base/contexts/titleContext';
import React from 'react';

export const Header = () => {
  const { title } = useTitle();
  return (
    <header className="bg-primary text-white p-4">
      <h1 className="text-xl font-bold text-center">{title}</h1>
    </header>
  );
};
