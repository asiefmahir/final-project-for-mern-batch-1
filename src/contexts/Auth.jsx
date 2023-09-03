import  { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import {redirect} from 'react-router-dom'

let logoutTimer;

export const AuthContext = createContext();

const calculateRemainingTime = (expirationTime) => {
  
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();


  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'))
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  console.log(remainingTime);

  if (remainingTime && remainingTime <= 3000) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    redirect('/')
    return null;
  }

  return {
    token: storedToken,
    user: user,
    duration: remainingTime,
  };
};

const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  
  let initialToken;
  let initialUser;


  if (tokenData) {
    initialToken = tokenData.token;
    initialUser = tokenData.user
  }

  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expirationTime');
    redirect('/')

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = useCallback((token, user, expirationTime) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration, "effect");
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo(() => (
    {
      token: token,
      user: user,
      isLoggedIn: userIsLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
    }
  ), [loginHandler, logoutHandler, token, user, userIsLoggedIn]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;