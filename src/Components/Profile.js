import React, { useState, useEffect, useContext } from "react";
import UserContext from "../Context/UserContext";

const Profile = () => {
  const { token, setToken, userData, setUserData } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(null);

  async function getUser(id) {
    try {
      const response = await fetch(`https://dummyjson.com/users/${id}`);
      const UserInfo = await response.json();
      localStorage.setItem("userData", JSON.stringify(UserInfo));
      setCurrentUser(UserInfo);
      console.log(UserInfo);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // if userData is there in local storage then take out
    try {
      const currentUser = JSON.parse(localStorage.getItem("userData"));
      console.log(currentUser);
      getUser(currentUser.id);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function Logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <>
      {currentUser && (
        <div>
          <h1>User Details</h1>
          {Object.entries(currentUser).map(([key, value]) => {
            if (typeof value === "object" && value !== null) {
              return (
                <div key={key}>
                  <h2>{key}</h2>
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <p key={subKey}>
                      <strong>{subKey}:</strong> {JSON.stringify(subValue)}
                    </p>
                  ))}
                </div>
              );
            } else {
              return (
                <p key={key}>
                  {key!=="image"?<><strong>{key}:</strong>{value}</>:<img src={value} alt="" />}
                </p>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export default Profile;
