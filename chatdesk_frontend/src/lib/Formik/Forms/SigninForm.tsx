import React from "react";
import {
  PasswordField,
  SubmitButton,
  TextField,
} from "../../../components/common/FormFields/AllFormFields";

const SigninForm: React.FC<{ processing: boolean }> = ({ processing }) => {
  return (
    <>
      <TextField label="email" type="email" name="user_email" />

      <PasswordField label="password" name="user_password" />
      <SubmitButton processing={processing}>Login Now</SubmitButton>
    </>
  );
};

export default SigninForm;
