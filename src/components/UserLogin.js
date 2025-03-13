import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const UserLogin = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["username"]);
  const [userDetails, setUserDetails] = useState({
    UserName: "",
    Password: "",
  });

  function handleUserName(e) {
    setUserDetails({
      UserName: e.target.value,
      Password: userDetails.Password,
    });
  }
  function handlePassword(e) {
    setUserDetails({
      UserName: userDetails.UserName,
      Password: e.target.value,
    });
  }
  function handleLoginClick() {
    setCookies("username", userDetails.UserName, {
      path: "/",
      expires: new Date("2025-03-15"),
    });
    alert("Login Success...");
  }

  function handleSignOut() {
    removeCookies("username");
    alert("Signed out Success...");
  }
  useEffect(() => {
    if (cookies.username === undefined) {
      alert("please login");
    }
  }, );

  return (
    <div className=" container-fluid">
      <h2>User Login</h2>
      <dl>
        <dt>User Name</dt>
        <dd>
          <input onChange={handleUserName} type="text" />
        </dd>
        <dt>Password</dt>
        <dd>
          <input onChange={handlePassword} type="password" />
        </dd>
      </dl>
      <button onClick={handleLoginClick}>Login</button>
      <hr />
      <h3>
        Home{" "}
        <button onClick={handleSignOut} className="btn btn-link">
          Signout
        </button>
      </h3>
      Hello! {cookies.username}
    </div>
  );
};

export default UserLogin;
