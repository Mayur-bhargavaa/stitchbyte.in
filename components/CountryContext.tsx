'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type CountryContextType = {
  country: 'India' | 'US' | 'UAE';
};

const CountryContext = createContext<CountryContextType>({ country: 'India' });

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [country, setCountry] = useState<'India' | 'US' | 'UAE'>('India');

  useEffect(() => {
    const lang = navigator.language;

    if (lang.includes('en-US')) setCountry('US');
    else if (lang.includes('ar') || lang.includes('en-AE')) setCountry('UAE');
    else setCountry('India');
  }, []);

  return (
    <CountryContext.Provider value={{ country }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);
