import { Container } from "@chakra-ui/react";
import React from "react";

const Wrapper = (props, { children }) => {
  return <Container {...props}>{children}</Container>;
};

export default Wrapper;
