import { Button } from "@chakra-ui/react";
import React from "react";

const ButtonSecondary = ({
  mt,
  title,
  isLoading,
  w,
  type,
  px,
  py,
  color,
  bg,
  h,
  m,
  onClick,
  isDisabled,
  bgHover,
}) => {
  return (
    <Button
      mt={mt}
      bg={bg}
      color={color}
      isLoading={isLoading}
      isDisabled={isDisabled}
      onClick={() => onClick()}
      w={w}
      h={h}
      px={px}
      py={py}
      type={type || "button"}
      _hover={{ bg: bgHover || "#0376a1" }}
    >
      {title}
    </Button>
  );
};

export default ButtonSecondary;
