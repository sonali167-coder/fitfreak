import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("fitfreakUser")) || null
  );
  const [preferences, setPreferences] = useState(
    JSON.parse(localStorage.getItem("fitfreakPrefs")) || {}
  );

  return (
    <AuthContext.Provider value={{ user, setUser, preferences, setPreferences }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
