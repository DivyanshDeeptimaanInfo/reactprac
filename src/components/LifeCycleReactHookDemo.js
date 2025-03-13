import React, { useEffect, useState } from "react";

export const LifeCycleReactHookDemo = () => {
  const [msg, setMsg] = useState("");
  const handleSuccessClick = () => {
    setMsg(<SuccessComponent />);
  };
  const handleInvalidClick = () => {
    setMsg(<ErrorComponent />);
  };
  return (
    <div className=" container-fluid">
      <button onClick={handleSuccessClick}>Success</button>
      <button onClick={handleInvalidClick}>Invalid</button>
      <hr />
      <div>{msg}</div>
    </div>
  );
};

function SuccessComponent() {
  useEffect(() => {
    alert("Success Component will mount");
    return () => {
      alert("Success Component will unmount");
    };
  }, []);
  return (
    <div>
      <h2>Login Success..</h2>
    </div>
  );
}

function ErrorComponent() {
  useEffect(() => {
    alert("Error Component will mount");
    return () => {
      alert("Error Component will unmount");
    };
  }, []);
  return (
    <div>
      <h2>Invalid Credentials</h2>
      <hr />
      <h2>Login failed..</h2>
    </div>
  );
}
