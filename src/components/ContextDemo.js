import React, { useContext, useState } from "react";

let userDetailsContext = React.createContext(null);
const ContextDemo = () => {
  const [userDetails, setUserDetails] = useState({
    UserName: "John",
    Email: "john@gmail.com",
  });

  function handleUser(e) {
    setUserDetails({
      UserName: e.target.value,
      Email: userDetails.Email,
    });
  }
  function handleEmail(e) {
    setUserDetails({
      UserName: userDetails.UserName,
      Email: e.target.value,
    });
  }
  function handleSetDataClick() {
    setUserDetails({
      UserName: userDetails.UserName,
      Email: userDetails.Email,
    });
  }
  return (
    <div className=" container-fluid">
      <userDetailsContext.Provider value={userDetails}>
        <h2>Site Index - {userDetails.UserName}</h2>
        <dl>
          <dt>User Name</dt>
          <dd>
            <input onChange={handleUser} type="text" />
          </dd>
          <dt>Email</dt>
          <dd>
            <input onChange={handleEmail} type="email" />
          </dd>
        </dl>
        <button onClick={handleSetDataClick}>Set Data</button>
        <HeaderComponent />
      </userDetailsContext.Provider>
    </div>
  );
};

export default ContextDemo;

const HeaderComponent = () => {
  let userdetails = useContext(userDetailsContext);
  return (
    <div
      className=" bg-info text-white"
      style={{ height: "150px", padding: "10px" }}
    >
      <h2>Home - {userdetails.UserName}</h2>
      <NavbarComponent />
    </div>
  );
};

const NavbarComponent = () => {
  let userdetails = useContext(userDetailsContext);

  return (
    <div className="btn-toolbar bg-dark text-white justify-content-between">
      <div className=" btn-group">
        <button className=" btn btn-dark">Amazon</button>
      </div>
      <div className=" btn-group">
        <button className=" btn btn-dark"> {userdetails.Email}</button>
      </div>
    </div>
  );
};
