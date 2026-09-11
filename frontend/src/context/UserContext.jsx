import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "@/lib/api";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("osteon_wallet");
    if (stored) {
      getUser(stored)
        .then(({ user }) => setUser(user))
        .catch(() => localStorage.removeItem("osteon_wallet"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const refresh = async () => {
    const w = localStorage.getItem("osteon_wallet");
    if (w) {
      const { user } = await getUser(w);
      setUser(user);
      return user;
    }
  };

  const signIn = (u) => {
    localStorage.setItem("osteon_wallet", u.wallet_address);
    setUser(u);
  };

  const signOut = () => {
    localStorage.removeItem("osteon_wallet");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, signIn, signOut, refresh, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
