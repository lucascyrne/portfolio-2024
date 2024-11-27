import React, { createContext, useContext, useState } from 'react';

type SecretModeContextType = {
  isSecretMode: boolean;
  setIsSecretMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const SecretModeContext = createContext<SecretModeContextType | undefined>(
  undefined
);

export const SecretModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSecretMode, setIsSecretMode] = useState(false);

  return (
    <SecretModeContext.Provider value={{ isSecretMode, setIsSecretMode }}>
      {children}
    </SecretModeContext.Provider>
  );
};

export const useSecretMode = (): SecretModeContextType => {
  const context = useContext(SecretModeContext);
  if (!context) {
    throw new Error('useSecretMode must be used within a SecretModeProvider');
  }
  return context;
};
