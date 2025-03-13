import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";

const ValidationStateComponent = () => {
  return (
    <div className=" container-fluid">
      <h2>Register User</h2>
      <Formik
        initialValues={{ UserName: "", Email: "", Age: "", City: "" }}
        validationSchema={yup.object({
          UserName: yup
            .string()
            .min(4, "Name too short")
            .max(10, "Name too long")
            .required("Username required"),
          Email: yup.string().email("invalid email").required("Email required"),
          Age: yup.number().required("Age required"),
          City: yup.string(),
        })}
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {(fields) => (
          <Form>
            {
              <div>
                <dl>
                  <dt>User Name</dt>
                  <dd>
                    <Field type="text" name="UserName"></Field>
                  </dd>
                  <dd className="text-danger">
                    <ErrorMessage name="UserName"></ErrorMessage>
                  </dd>
                  <dt>Email</dt>
                  <dd>
                    <Field type="text" name="Email"></Field>
                  </dd>
                  <dd className="text-danger">
                    <ErrorMessage name="Email"></ErrorMessage>
                  </dd>

                  <dt>Age</dt>
                  <dd>
                    <Field type="text" name="Age"></Field>
                  </dd>
                  <dd className="text-danger">
                    <ErrorMessage name="Age"></ErrorMessage>
                  </dd>

                  <dt>City</dt>
                  <dd>
                    <Field as="select" name="City">
                      <option>Delhi</option>
                      <option>Hyderabad</option>
                    </Field>
                  </dd>
                  <dd className="text-danger">
                    <ErrorMessage name="City"></ErrorMessage>
                  </dd>
                </dl>
                <button disabled={fields.isValid ? false : true}>
                  Register
                </button>
              </div>
            }
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ValidationStateComponent;
