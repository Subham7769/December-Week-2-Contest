import React, { useState } from "react";
import UserContext from "./UserContext";

const UserProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null); // Declare userData state here

  return (
    <UserContext.Provider value={{ token, setToken, userData, setUserData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
