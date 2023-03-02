import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./config";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState({
    user: null,
    loading: true,
    isAdmin: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      let isAdmin = false;
      if (user) {
        const token = await user.getIdTokenResult();

        isAdmin = token.claims.admin;
      }
      setSession({ loading: false, user, isAdmin });
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={session}>
      {!session.loading && children}
    </UserContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(UserContext);
  return session;
};
