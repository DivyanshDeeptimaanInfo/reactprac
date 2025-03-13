import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const YupValidation = () => {
  const formik = useFormik({
    initialValues: {
      UserName: "",
      Age: "",
      Email: "",
    },
    validationSchema: yup.object({
      UserName: yup
        .string()
        .required("User name required")
        .min(4, "Name too short")
        .max(10, "Name too long"),
      Email: yup.string().required("Email required").email("Invalid email"),
      Age: yup.number().required("Age required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });
  return (
    <div className=" container-fluid">
      <form onSubmit={formik.handleSubmit}>
        <h2>Register User</h2>
        <dl>
          <dt>Username</dt>
          <dd>
            <input
              type="text"
              {...formik.getFieldProps("UserName")}
              name="UserName"
            />
          </dd>
          <dd className=" text-danger">{formik.errors.UserName}</dd>
          <dt>Age</dt>
          <dd>
            <input type="text" {...formik.getFieldProps("Age")} name="Age" />
          </dd>
          <dd className=" text-danger">{formik.errors.Age}</dd>
          <dt>Email</dt>
          <dd>
            <input
              type="text"
              {...formik.getFieldProps("Email")}
              name="Email"
            />
          </dd>
          <dd className=" text-danger">{formik.errors.Email}</dd>
          <button className="btn btn-primary">Register</button>
        </dl>
      </form>
    </div>
  );
};

export default YupValidation;
