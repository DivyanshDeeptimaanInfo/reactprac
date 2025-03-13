import React, { useState } from "react";

const FormComponent = () => {
  const users = useState([
    { UserId: "john" },
    { UserId: "john12" },
    { UserId: "david" },
    { UserId: "john_nit" },
  ]);
  const [userMsg, setUserMsg] = useState("");
  const [isUserValid, setIsUserValid] = useState(false);
  const [pwdMsg, setPwdMsg] = useState("");
  const [capsStatus, setCapsStatus] = useState(false);
  const [cityMsg, setCityMsg] = useState("");
  const [userDetails, setUserDetails] = useState({
    UserId: "",
    Password: "",
    City: "",
  });

  function verifyUserId(e) {
    for (const user of users) {
      if (user.UserId === e.target.value) {
        setUserMsg("User Id already taken");
        setIsUserValid(false);
      } else {
        setUserMsg("User Id available");
        setIsUserValid(true);
      }
    }
  }

  function hideUserMsg(e) {
    if (e.target.value === "") {
      setUserMsg("User Id Required");
    } else {
      setUserMsg("");
    }
  }

  function verifyPassword(e) {
    if (e.target.value.match(/(?=.*[A-Z])\w{4,10}/)) {
      setPwdMsg("Strong Password");
    } else {
      if (e.target.value < 4) {
        setPwdMsg("Poor Password");
      } else {
        setPwdMsg("Weak Password");
      }
    }
  }

  function hidePasswordMsg() {
    setPwdMsg("");
    setCapsStatus(false);
  }

  function verifyCaps(e) {
    if (
      (e.keyCode >= 65 && e.keyCode <= 90) ||
      (e.which >= 65 && e.which < 90)
    ) {
      setCapsStatus(true);
    } else {
      setCapsStatus(false);
    }
  }

  function verifyCity(e) {
    if (e.target.value === "Select your city") {
      setCityMsg("Please select a valid city");
    } else {
      setCityMsg("");
        setUserDetails({
          UserId: userDetails.UserId,
          Password: userDetails.Password,
          City: e.target.value,
        });

    }
  }

  function handleUserIdChange(e) {
    setUserDetails({
      UserId: e.target.value,
      Password: userDetails.Password,
      City: userDetails.City,
    });
  }

  function handlePassChange(e) {
    setUserDetails({
      UserId: userDetails.UserId,
      Password: e.target.value,
      City: userDetails.City,
    });
  }

  function registerClick() {
    alert(JSON.stringify(userDetails));
  }

  return (
    <div className=" container-fluid ">
      <h2>Register User</h2>
      <dl>
        <dt>User Id</dt>
        <dd className="d-flex justify-content-center">
          <input
            onChange={handleUserIdChange}
            onBlur={hideUserMsg}
            onKeyUp={verifyUserId}
            type="text"
            className=" form-control w-25"
          />
        </dd>
        <dd className={isUserValid === true ? "text-success" : "text-danger"}>
          {userMsg}
        </dd>
        <dt>Password</dt>
        <dd className="d-flex justify-content-center">
          <input
            onChange={handlePassChange}
            onKeyPress={verifyCaps}
            onBlur={hidePasswordMsg}
            className=" form-control w-25"
            type="password"
            onKeyUp={verifyPassword}
          />
        </dd>
        <dd>{pwdMsg}</dd>
      </dl>
      <dd
        className={
          capsStatus === true ? "d-block text-warning" : "d-none text-warning"
        }
      >
        <span className="bi bi-exclamation-triangle"></span> Caps On
      </dd>
      <dt>Your City</dt>
      <dd className="d-flex justify-content-center">
        <select className=" form-select w-25 text-center" onChange={verifyCity}>
          <option value="Select your city">Select your city</option>
          <option value="Delhi">Delhi</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Chennai">Chennai</option>
        </select>
      </dd>
      <dd className="text-danger">{cityMsg}</dd>
      <button className="btn btn-warning" onClick={registerClick}>Register </button>
    </div>
  );
};

export default FormComponent;
