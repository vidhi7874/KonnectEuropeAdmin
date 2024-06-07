import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import React from "react";

const CustomTextArea = ({ registerObj, errors, fieldDetails, resize }) => {
  return (
    <FormControl color="#A1A9C3" isInvalid={errors?.[fieldDetails?.name]}>
      <FormLabel m="2px" htmlFor={fieldDetails?.name}>
        {fieldDetails?.label}
      </FormLabel>
      <Textarea
        // id="name"
        size="lg"
        bg="#F1F2F6"
        placeholder={fieldDetails?.placeHolder}
        type={fieldDetails?.type}
        color="blackAlpha.800"
        resize={resize}
        _placeholder={{
          opacity: 1,
          color: "gray.500",
          fontSize: "15px",
        }}
        errorBorderColor="red.400"
        {...registerObj}
      />

      {/* <Box h="8">
      <FormErrorMessage borderColor="primay" color="error">
        {errors?.[field.name]?.message}
      </FormErrorMessage>
    </Box> */}
    </FormControl>
  );
};

export default CustomTextArea;
