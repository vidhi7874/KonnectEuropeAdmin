import { Box, Card, Image, Input, Text } from "@chakra-ui/react";
import React from "react";
import { upload } from "../assets/icons";

const UploadFileCard = ({
  uploadFile,
  icon,
  fieldObj,
  register,
  name,
  required,
  errors,
  setValue,
  uploadedFiles,
}) => {
  return (
    <Card
      border="1px"
      borderColor="gray.200"
      //  maxW="30%"
      // minW="30%"
      //  w="30%"
      p="5"
      h="80"
      borderRadius="17"
      //  direction={{ base: "column", md: "column" }}
      justify={{
        base: "flex-start",
        md: "space-between",
        lg: "center",
      }}
      alignItems="center"
    >
      <Box
        p="7"
        pt="5"
        as="div"
        pos="relative"
        //w="30"
        // h="30"
        borderRadius="50%"
        bg="secondary"
      >
        <Image src={icon} alt="upload icon" />
      </Box>

      <Text mt="5" fontSize="22" textAlign="center">
        Upload
      </Text>

      <Box mt="3">
        <Text w="305px" color="textPrimary" fontSize="20" textAlign="center">
          {fieldObj[name].label}
        </Text>
      </Box>

      <Text
        opacity={uploadedFiles?.[name]?.fileName ? 1 : 0}
        mt="3"
        color="green"
        textAlign="center"
      >
        {uploadedFiles?.[name]?.fileName}
      </Text>

      <Text
        opacity={errors?.[name] ? 1 : 0}
        mt="6"
        color="error"
        textAlign="center"
      >
        {errors?.[name]?.message}
        {/* "test err" */}
      </Text>

      <Input
        type="file"
        height="100%"
        width="100%"
        position="absolute"
        top="0"
        left="0"
        opacity="0"
        aria-hidden="true"
        accept="image/*"
        name={name}
        // {...register(fieldObj.agent_id_proof.name, {
        //   required: fieldObj.agent_id_proof.err,
        // })}
        {...register}
        onChange={(e) => uploadFile(e, fieldObj[name])}
        //onDragEnter={startAnimation}
        //onDragLeave={stopAnimation}
      />
    </Card>
  );
};

export default UploadFileCard;
