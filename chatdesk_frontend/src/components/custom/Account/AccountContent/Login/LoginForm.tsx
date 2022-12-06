import { Form, Formik } from "formik";
import React from "react";
import { LoginFormValidator } from "../../../../../lib/Formik/FormikValidators";
import SigninForm from "../../../../../lib/Formik/Forms/SigninForm";

const LoginForm: React.FC = () => {
  const { initialValues, validationSchema, onSubmit, processing } =
    LoginFormValidator();

  return (
    <>
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form>
          <SigninForm processing={processing} />
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
