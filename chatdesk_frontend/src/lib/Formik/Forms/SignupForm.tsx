import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FileField,
  PasswordField,
  SubmitButton,
  TextField,
} from "../../../components/common/FormFields/AllFormFields";

const SignupForm: React.FC<{
  processing: boolean;
  state: (state: IImageFiles | any) => void;
}> = ({ processing, state }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Box display={{ base: "grid", sm: "flex" }} gap={{ base: 0, sm: 2 }}>
        <TextField label="name" type="text" name="user_name" />
        <TextField label="email" type="email" name="user_email" />
      </Box>
      <Box display={{ base: "grid", sm: "flex" }} gap={{ base: 0, sm: 2 }}>
        <PasswordField label="password" name="user_password" />
        <PasswordField label="confirm password" name="cnf_password" />
      </Box>

      <FileField label="profile pic" name="user_pic" setState={state} />

      <SubmitButton processing={processing}>Create Acoount</SubmitButton>
    </>
  );
};

export default SignupForm;
