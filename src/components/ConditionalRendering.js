import React, { useState } from "react";

const ConditionalRendering = () => {
  //   const [theme, setTheme] = useState({});
  const [theme, setTheme] = useState("");

  //   function handleThemeChange(e) {
  //     if (e.target.checked) {
  //       setTheme({
  //         backgroundColor: "black",
  //         color: "white",
  //       });
  //     } else {
  //       setTheme({
  //         backgroundColor: "white",
  //         color: "black",
  //       });
  //     }
  //   }

  function handleThemeChange(e) {
    if (e.target.checked) {
      setTheme("bg-dark text-white container-fluid text-center");
    } else {
      setTheme("bg-white text-dark container-fluid text-center");
    }
  }

  return (
    //   <div style={theme} className=" p-5 container-fluid text-center">
    <div className={theme}>
      <h2>User Details</h2>
      <div className=" form-switch">
        <input
          onChange={handleThemeChange}
          type="checkbox"
          className=" form-check-input"
        />{" "}
        Dark Theme
      </div>
      <dl>
        <dt>User Name</dt>
        <dd>
          <div className="d-flex justify-content-center">
            <input type="text" className="w-25 form-control" />
          </div>
        </dd>
        <dt>Password</dt>
        <dd>
          <div className="d-flex justify-content-center">
            <input type="password" className="form-control w-25" />
          </div>
        </dd>
      </dl>

      <button className="btn w-25 bg-primary text-white">Login</button>
    </div>
  );
};

export default ConditionalRendering;
