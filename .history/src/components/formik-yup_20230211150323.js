import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";

const FormikYup = () => {
  const [loading, setLoading] = useState(false);
  // 1. step --> initial values
  const initialValues = { email: "", password: "" };

  // 2.step --> validation scheme
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  // 3.step --> onSubmit
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const resp = await axios.post(
        "https://63e7ed2c5f3e35d898eafd56.mockapi.io/login",
        values
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 4.step --> formikHook
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <Form noValidate onSubmit={formik.handleSubmit}>
        {/* EMAIL */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...formik.getFieldProps("email")}
            isInvalid={formik.touched.email && !!formik.errors.email}
            isValid={formik.touched.email && !formik.errors.email}
          />

          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* PASSWORD */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            controlId="formBasicPassword"
            {...formik.getFieldProps("password")}
            isInvalid={formik.touched.password && !!formik.errors.password}
            isValid={formik.touched.password && !formik.errors.password}
          />

          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        {/* BUTTON */}
        <Button
          variant="primary"
          type="submit"
          onClick={() => test()}
          disabled={!(formik.dirty && formik.isValid) || loading}
        >
          {loading && <Spinner animation="border" size="sm" />} Submit
        </Button>
      </Form>
    </div>
  );
};

export default FormikYup;
