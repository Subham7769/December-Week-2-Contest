import React, { useState, useContext, useEffect } from "react";
import UserContext from "../Context/UserContext";

const Login = () => {
  const { setToken, setUserData } = useContext(UserContext);
  useEffect(() => {
    // Get the token from the local storage
    try {
      const storedToken = JSON.parse(localStorage.getItem("token"));
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [userInput, setUserInput] = useState({ email: "", password: "" });
  let { email, password } = userInput;

  function updateInput(e) {
    let key = e.target.name;
    let value = e.target.value;
    setUserInput({ ...userInput, [key]: value });
  }

  const implementSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    } else {
      try {
        const response = await fetch("https://dummyjson.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        });

        const fetchedData = await response.json();
        console.log(fetchedData);

        //setting the token
        setToken(fetchedData.token);
        // add to local storage
        localStorage.setItem("token", fetchedData.token);

        //setting the userData
        setUserData(fetchedData);
        // add to local storage
        localStorage.setItem("userData", JSON.stringify(fetchedData));

        setUserInput({ email: "", password: "" });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="Login">
      <h1>Login!</h1>
      <form onSubmit={implementSubmit}>
        <br />
        <input
          type="text"
          id="L_email"
          name="email"
          placeholder="Ex: shubham@gmail.com"
          value={email}
          onChange={updateInput}
        />{" "}
        <br />
        <input
          type="password"
          id="L_password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={updateInput}
        />
        <br />
        <button type="submit">Login!</button>
      </form>
    </div>
  );
};

export default Login;
