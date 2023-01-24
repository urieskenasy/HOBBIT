import { createContext, useState } from 'react';
import useLocalStorage from 'use-local-storage';

const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [loggedStatus, setLoggedStatus] = useLocalStorage(
    'userLoggedIn',
    false
  );
  const [profileSwitch, setProfileSwitch] = useState(true);
  const onEditHandler = () => {

    setProfileSwitch((pre) => (pre = !pre));
    // console.log(profileSwitch);
  };
  return (
    <Context.Provider
      value={{ onEditHandler, profileSwitch, loggedStatus, setLoggedStatus }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
