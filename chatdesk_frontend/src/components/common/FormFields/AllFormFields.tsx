import { Box, Button, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { ErrorMessage, Field } from "formik";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { formInputStyle } from "../../../styles/style";

export const TextField: React.FC<ITextField> = ({ type, name, label }) => {
  return (
    <FormControl my={{ base: 0, sm: 1 }}>
      <FormLabel fontSize={15} textTransform="capitalize">
        {label}
      </FormLabel>
      <Field type={type} name={name} id={name} style={formInputStyle} />
      <Text color="red.500">
        <ErrorMessage name={name} />
      </Text>
    </FormControl>
  );
};

export const FileField: React.FC<IFileField> = ({ name, label, setState }) => {
  return (
    <FormControl my={{ base: 0, sm: 1 }}>
      <FormLabel fontSize={15} textTransform="capitalize">
        {label}
      </FormLabel>
      <input
        type="file"
        accept="image/*"
        onChange={(e: IImageFiles | any) => setState(e.target.files[0])}
        required={true}
        name={name}
        id={name}
        style={formInputStyle}
      />
    </FormControl>
  );
};

export const PasswordField: React.FC<ITextField> = ({ name, label }) => {
  const [show, setShow] = useState(false);
  return (
    <FormControl my={{ base: 0, sm: 1 }}>
      <FormLabel fontSize={15} textTransform="capitalize">
        {label}
      </FormLabel>
      <Box position="relative">
        <Field
          type={show ? "text" : "password"}
          name={name}
          id={name}
          style={formInputStyle}
        />
        <Box position="absolute" bottom="0" right="0">
          {show ? (
            <Button
              borderRadius={0}
              borderTopEndRadius={5}
              borderBottomEndRadius={5}
              border="1px solid #999"
              onClick={() => setShow(false)}
            >
              <AiOutlineEyeInvisible />
            </Button>
          ) : (
            <Button
              borderRadius={0}
              borderTopEndRadius={5}
              borderBottomEndRadius={5}
              border="1px solid #999"
              onClick={() => setShow(true)}
            >
              <AiOutlineEye />
            </Button>
          )}
        </Box>
      </Box>
      <Text color="red.500">
        <ErrorMessage name={name} />
      </Text>
    </FormControl>
  );
};

export const SubmitButton: React.FC<{
  processing: boolean;
  children: string;
}> = ({ processing, children }) => {
  return (
    <Button
      mt={2}
      colorScheme="whatsapp"
      letterSpacing={1.2}
      w="100%"
      isLoading={processing}
      type="submit"
    >
      <Text fontSize={14}>{children}</Text>
    </Button>
  );
};
