import { createContext, ReactNode, useContext } from 'react';
import { useAppwrite } from './useAppwrite';
import { getCurrentUser } from './appwrite';

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  data: User | null;
  loading: boolean;
  refetch: () => void;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// not for rendering any data
// wrap screens with global context provider which has
// access to the values that we would like to keep i.e logged in, user data
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });
  const isLoggedIn = !!user; // if user is present, user is logged in
  console.log(JSON.stringify(user, null, 2));
  return (
    <GlobalContext.Provider value={{ isLoggedIn, user, loading, refetch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within GlobalProvider');
  }
  return context;
};
