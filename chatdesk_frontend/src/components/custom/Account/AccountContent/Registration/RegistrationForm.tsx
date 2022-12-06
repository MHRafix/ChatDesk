import { Form, Formik } from "formik";
import React from "react";
import { SignupFormValidator } from "../../../../../lib/Formik/FormikValidators";
import SingupForm from "../../../../../lib/Formik/Forms/SignupForm";

const RegistrationForm: React.FC = () => {
  const { initialValues, validationSchema, onSubmit, processing, setUserpic } =
    SignupFormValidator();

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
    >
      <Form>
        <SingupForm processing={processing} state={setUserpic} />
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
