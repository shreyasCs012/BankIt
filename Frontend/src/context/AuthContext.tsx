import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { customerService } from '../services/customerService';
import { Customer } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  customer: Customer | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    initAuth();
  }, []);

  const initAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const customerId = localStorage.getItem('customerId');

      // 🔐 No session → show login
      if (!token || !customerId) {
        setIsAuthenticated(false);
        setCustomer(null);
        setIsLoading(false);
        return;
      }

      // ✅ Restore session
      const profile = await customerService.getCustomerProfile();
      setCustomer(profile);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Session restore failed', error);
      localStorage.clear();
      setCustomer(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = () => {
    // login API already stored token + customerId
    setIsAuthenticated(true);
    initAuth(); // fetch customer profile
  };

  const logout = () => {
    localStorage.clear();
    setCustomer(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        customer,   // ✅ THIS WAS MISSING
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
