import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import avatarUploader from "../../hooks/cloudinaryUploader/avatarUploader";
import { authReqSender } from "../../hooks/httpServices/httpSendReq";

// login form validator
export const LoginFormValidator = (): ILoginReturn => {
  const [processing, setProcessing] = useState<boolean>(false);
  const router = useRouter();
  const toast = useToast();

  // initial vlaue of form
  const initialValues: ILoginData = {
    user_email: "",
    user_password: "",
  };

  // validation schema using formik yup
  const validationSchema: any = Yup.object({
    user_email: Yup.string()
      .email("invalid email format!")
      .required("required."),
    user_password: Yup.string().required("required."),
  });

  // on submit function here
  const onSubmit = (
    values: ILoginData,
    { resetForm }: { resetForm: (values: { values: string }) => void }
  ): void => {
    setProcessing(true);
    if (values) {
      const config: IReqSenderPr = {
        req_data: values,
        resetForm: resetForm,
        setProcessing: setProcessing,
        api_url: "signin",
        router,
        toast,
      };
      authReqSender(config);
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    processing,
  };
};

// signup form validator
export const SignupFormValidator = (): ISignupReturn => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [userpic, setUserpic] = useState<string>();
  const router = useRouter();
  const toast = useToast();

  // initial vlaue of form
  const initialValues: ISignupData = {
    user_name: "",
    user_email: "",
    user_password: "",
    cnf_password: "",
  };

  // validation schema using formik yup
  const validationSchema: any = Yup.object({
    user_name: Yup.string().required("required."),
    user_email: Yup.string()
      .email("invalid email format!")
      .required("required."),
    user_password: Yup.string().required("required."),
    cnf_password: Yup.string()
      .oneOf([Yup.ref("user_password"), ""], "Passwords didn't matched!")
      .required("required."),
  });

  const onSubmit = async (
    values: ISignupData,
    { resetForm }: { resetForm: (values: { values: string }) => void }
  ): Promise<void> => {
    setProcessing(true);
    const { user_name, user_email, user_password } = values;

    // upload user avatarto cloudinary
    const { avatar_upload_cloudinary } = avatarUploader(userpic);
    const user_avatar = await avatar_upload_cloudinary();

    // make req object
    const reqObj: ISignupFullData = {
      user_name,
      user_email,
      user_password,
      user_role: false,
      user_pic: user_avatar,
    };

    if (reqObj) {
      const config: IReqSenderPr = {
        req_data: reqObj,
        resetForm: resetForm,
        setProcessing: setProcessing,
        api_url: "signup",
        router,
        toast,
      };
      authReqSender(config);
    }
  };

  return {
    initialValues,
    validationSchema,
    onSubmit,
    processing,
    setUserpic,
  };
};
