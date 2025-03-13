import React, { useState } from "react";

const EventBinding = () => {
  const [userName, setUserName] = useState("John");

  function handleUserName(e) {
    setUserName(e.target.value);
  }
  return (
    <div className="container-fluid d-flex justify-content-center flex-column">
      <dl>
        <dt>User Name</dt>
        {/* <dd>
          <input type="text" onBlur={handleUserName} />
        </dd> */}
        <dd>
          <input type="text" value={userName} onChange={handleUserName} />
        </dd>
      </dl>
      <h3>Hello ! {userName}</h3>
    </div>
  );
};

export default EventBinding;
