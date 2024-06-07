import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

const CustomInput = ({
  isEdit,
  size,
  value,
  registerObj,
  errors,
  fieldDetails,
  name,
  setAgentDetails,
}) => {
  return (
    <FormControl color="#A1A9C3" isInvalid={errors?.[fieldDetails?.name]}>
      {/* <FormLabel m="2px" htmlFor={fieldDetails?.name}>
        {fieldDetails?.label}
      </FormLabel> */}
      <Input
        // id="name"
        size={size || "lg"}
        bg="#F1F2F6"
        placeholder={fieldDetails?.placeHolder}
        //   value={value}
        type={fieldDetails?.type}
        isDisabled={isEdit}
        color="blackAlpha.800"
        _placeholder={{
          opacity: 1,
          color: "gray.500",
          fontSize: "15px",
        }}
        onChange={(e) => console.log(e.target.value)}
        // onChange={(e) => {
        //   // console.log("name --> ", name);
        //   console.log("target value --> ", e.target.value);
        //   // console.log("value --> ", value);
        //   // setAgentDetails((prev) => ({ ...prev, [name]: e.target.value }));
        //   // setValue(name, e.target.value, { shouldValidate: true });
        // }}
        errorBorderColor="red.400"
        {...registerObj}
      />
      {/* // : ( // <Text color="blackAlpha.700">{value}</Text>
      // ) } */}
      {/* <Box h="8">
        <FormErrorMessage borderColor="primay" color="error">
          {errors?.[field.name]?.message}
        </FormErrorMessage>
      </Box> */}
    </FormControl>
  );
};

export default CustomInput;
