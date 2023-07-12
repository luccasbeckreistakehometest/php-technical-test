import React, { createContext, useState, useContext } from 'react';

interface User {
  id: number;
  name: string;
}

interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const initialUser: User | null = null;

export const AuthContext = createContext<AuthContextProps>({
  user: initialUser,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(initialUser);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);