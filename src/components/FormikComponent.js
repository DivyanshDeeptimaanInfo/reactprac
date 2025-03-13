import { useFormik } from "formik";
import React from "react";

const FormikComponent = () => {
  const formik = useFormik({
    initialValues: {
      Username: "",
      Password: "",
      City: "",
      Subscribe: true,
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values));
      alert(
        `${values.Username}\nSubscribe: ${
          values.Subscribe === true ? "Subscribed" : "Not Subscribed"
        }`
      );
    },
  });
  return (
    <div className=" container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <h2>Regiter User</h2>
        <dl>
          <dt>User Name</dt>
          <dd className="d-flex justify-content-center">
            <input
              name="Username"
              className=" form-control w-25 border-primary"
              onChange={formik.handleChange}
              value={formik.values.Username}
              type="text"
            />
          </dd>
          <dt>Password</dt>
          <dd className="d-flex justify-content-center ">
            <input
              name="Password"
              className=" form-control w-25 border-primary"
              onChange={formik.handleChange}
              value={formik.values.Password}
              type="password"
            />
          </dd>
          <dd>City</dd>
          <dt className="d-flex justify-content-center ">
            <select
              name="City"
              className=" form-select text-center w-25 border-primary"
              onChange={formik.handleChange}
              value={formik.values.City}
            >
              <option>Delhi</option>
              <option>Hyderabad</option>
              <option>Mumbai</option>
            </select>
          </dt>
          <dd className=" display-5 fs-5 mt-2"> Subscribe</dd>
          <dt className="form-switch">
            <input
              type="checkbox"
              className="form-check-input "
              name="Subscribe"
              onChange={formik.handleChange}
              checked={formik.values.Subscribe}
            />
          </dt>
        </dl>
        <button className="btn px-5 py-2 bg-primary text-white ">
          Register
        </button>
      </form>
    </div>
  );
};

export default FormikComponent;
