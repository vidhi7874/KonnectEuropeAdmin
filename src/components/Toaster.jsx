import { Button, useToast, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";

const Toaster = () => {
  const toast = useToast();
  const statuses = ["success", "error", "warning", "info"];
  return (
    <Wrap>
      {statuses.map((status, i) => (
        <WrapItem key={i}>
          <Button
            onClick={() =>
              toast({
                title: `${status} toast`,
                status: status,
                isClosable: true,
              })
            }
          >
            Show {status} toast
          </Button>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default Toaster;
