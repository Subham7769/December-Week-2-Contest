import React,{useContext} from "react";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import "./Style.css";
import UserContext from "./Context/UserContext";


const App = () => {
  const { token} = useContext(UserContext);
  return (
    <div>
      <div className="main">
        <div className="loginSignup">
          <Login/>
        </div>
      </div>
      {token && <Profile/>}
    </div>
  );
};

export default App;
