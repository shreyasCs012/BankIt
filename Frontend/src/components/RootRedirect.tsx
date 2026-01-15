import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const me = await authService.me();
        setCustomer(me);
      } catch {
        setCustomer(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const value: AuthContextType = {
    customer,
    isAuthenticated: !!customer,
    loading,        // ✅ PROVIDED
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
