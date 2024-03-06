import { createContext, useContext, useEffect, useState } from "react";

const LoggedContext = createContext();

export const useLogged = () => {
  return useContext(LoggedContext);
};

export const LoggedProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const localStorageLogged = window.localStorage.getItem("userid");
    return localStorageLogged || "";
  });

  const logIn = (userID) => {
    setUser(userID);
  };

  const logOut = () => {
    setUser(null);
  };

  useEffect(() => {
    window.localStorage.setItem("userid", user);
  }, [user]);

  return (
    <LoggedContext.Provider value={{ user, logOut, logIn }}>
      {children}
    </LoggedContext.Provider>
  );
};
