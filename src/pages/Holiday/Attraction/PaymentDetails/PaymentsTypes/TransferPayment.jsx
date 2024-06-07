import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Wrap,
  WrapItem,
  IconButton,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { paymentTransferDetailsAdd } from "../../../../../features/attractionPackage.slice";
import { DeleteIcon } from "@chakra-ui/icons";

const formField = {
  transfer_name: "Standard",
  three_person_price: null,
  four_person_price: null,
  five_person_price: null,
  six_person_price: null,
  seven_person_price: null,
  eight_person_price: null,
  nine_person_price: null,
  ten_person_price: null,
  eleven_person_price: null,
  twelve_person_price: null,
};

const TransferPayment = ({ onClose }) => {
  const dispatch = useDispatch();
  const paymentTransferFormReducer = useSelector(
    (state) => state.attractionPackageReducer.paymentDetails.paymentTransfer
  );

  const schema = Yup.object().shape({
    transfer_price: Yup.array().of(
      Yup.object().shape({
        transfer_name: Yup.string(),

        three_person_price: Yup.number()
          .typeError("three person price  is required")
          .required("three person price  is required"),

        four_person_price: Yup.number()
          .typeError("Four person price  is required")
          .required("Four person price  is required"),

        five_person_price: Yup.number()
          .typeError("Five person price is required")
          .required("Five person price is required"),

        six_person_price: Yup.number()
          .typeError("Six person price is required")
          .required("Six person price is required"),

        seven_person_price: Yup.number()
          .typeError("Seven person price is required")
          .required("Seven person price is required"),

        eight_person_price: Yup.number()
          .typeError("Eight person price is required")
          .required("Eight person price is required"),

        nine_person_price: Yup.number()
          .typeError("Nine person price is required")
          .required("Nine person price is required"),

        ten_person_price: Yup.number()
          .typeError("Ten person price is required")
          .required("Ten person price is required"),

        eleven_person_price: Yup.number()
          .typeError("Eleven person price is required")
          .required("Eleven person price is required"),

        twelve_person_price: Yup.number()
          .typeError("Twelve person price is required")
          .required("Twelve person price is required"),
      })
    ),
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "transfer_price",
  });

  const addNewTransferForm = () => {
    append(formField);
  };

  const onSubmit = (data) => {
    console.log("on submit ==> ", data);
    dispatch(paymentTransferDetailsAdd(data.transfer_price));
    onClose();
  };

  console.log("errors: ", errors);

  useEffect(() => {
    if (paymentTransferFormReducer?.length) {
      append(paymentTransferFormReducer);
    } else {
      append([formField]);
    }
  }, []);

  return (
    <Box>
      <Box
        display={{ base: "flex" }}
        justifyContent={{ base: "flex-end" }}
        mb="10"
        px="8"
      >
        <Box width={{ base: "65%" }}>
          <Text
            textAlign="center"
            fontWeight="bold"
            fontSize="3xl"
            color="secondary"
          >
            Add Transfers Payment
          </Text>
        </Box>

        <Button
          w="20%"
          bg="secondary"
          color="white"
          px="5"
          mb={4}
          type="submit"
          _hover={{}}
          onClick={() => addNewTransferForm()}
        >
          + Add Transfer
        </Button>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => (
          <Box
            key={item.id}
            borderRadius={10}
            p="4"
            fontWeight="bold"
            border="1px"
            borderColor="secondary"
            mb="5"
          >
            <Box
              display={{ base: "flex" }}
              justifyContent={{ base: "space-between" }}
              alignItems="center"
              mb="10"
            >
              <Box>
                <Text color="secondary"> {item.transfer_name} </Text>
              </Box>

              <Box>
                <IconButton
                  colorScheme="red"
                  aria-label="delete"
                  size="lg"
                  isDisabled={fields.length === 1}
                  onClick={() => remove(index)}
                  icon={<DeleteIcon />}
                />
              </Box>
            </Box>
            {/* <Box mt="5" display={{ base: "flex" }} gap="6" mb={4}> */}
            <Wrap height="220" spacing="20px" align="center">
              {/* Upto 3 Person */}
              <WrapItem>
                <FormControl
                  isInvalid={
                    errors.transfer_price &&
                    errors.transfer_price?.[index]?.three_person_price?.message
                  }
                >
                  <FormLabel color="#5E6282">Upto 3 Person</FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    width={{ base: "170px" }}
                    {...register(`transfer_price.${index}.three_person_price`)}
                  />
                </FormControl>
              </WrapItem>

              <WrapItem>
                <FormControl
                  isInvalid={
                    errors.transfer_price &&
                    errors.transfer_price?.[index]?.four_person_price?.message
                  }
                >
                  <FormLabel color="#5E6282">Upto 4 Person</FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    width={{ base: "170px" }}
                    {...register(`transfer_price.${index}.four_person_price`)}
                  />
                </FormControl>
              </WrapItem>

              <WrapItem>
                <FormControl
                  isInvalid={
                    errors.transfer_price &&
                    errors.transfer_price?.[index]?.five_person_price?.message
                  }
                >
                  <FormLabel color="#5E6282">Upto 5 Person</FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    width={{ base: "170px" }}
                    {...register(`transfer_price.${index}.five_person_price`)}
                  />
                </FormControl>
              </WrapItem>

              <WrapItem>
                <FormControl
                  isInvalid={
                    errors.transfer_price &&
                    errors.transfer_price?.[index]?.six_person_price?.message
                  }
                >
                  <FormLabel color="#5E6282">Upto 6 Person</FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    width={{ base: "170px" }}
                    {...register(`transfer_price.${index}.six_person_price`)}
                  />
                </FormControl>
              </WrapItem>

              <WrapItem>
                <FormControl
                  isInvalid={
                    errors.transfer_price &&
                    errors.transfer_price?.[index]?.seven_person_price?.message
                  }
                >
                  <FormLabel color="#5E6282">Upto 7 Person</FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    width={{ base: "170px" }}
                    {...register(`transfer_price.${index}.seven_person_price`)}
                  />
                </FormControl>
              </WrapItem>

              <WrapItem>
                <FormControl
                  isInvalid={
                    errors.transfer_price &&
                    errors.transfer_price?.[index]?.eight_person_price?.message
                  }
                >
                  <FormLabel color="#5E6282">Upto 8 Person</FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    width={{ base: "170px" }}
                    {...register(`transfer_price.${index}.eight_person_price`)}
                  />
                </FormControl>
              </WrapItem>

              <WrapItem>
                <FormControl
                  isInvalid={
                    errors.transfer_price &&
                    errors.transfer_price?.[index]?.nine_person_price?.message
                  }
                >
                  <FormLabel color="#5E6282">Upto 9 Person</FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    width={{ base: "170px" }}
                    {...register(`transfer_price.${index}.nine_person_price`)}
                  />
                </FormControl>
              </WrapItem>

              <WrapItem>
                <FormControl
                  isInvalid={
                    errors.transfer_price &&
                    errors.transfer_price?.[index]?.ten_person_price?.message
                  }
                >
                  <FormLabel color="#5E6282">Upto 10 Person</FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    width={{ base: "170px" }}
                    {...register(`transfer_price.${index}.ten_person_price`)}
                  />
                </FormControl>
              </WrapItem>

              <WrapItem>
                <FormControl
                  isInvalid={
                    errors.transfer_price &&
                    errors.transfer_price?.[index]?.eleven_person_price?.message
                  }
                >
                  <FormLabel color="#5E6282">Upto 11 Person</FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    width={{ base: "170px" }}
                    {...register(`transfer_price.${index}.eleven_person_price`)}
                  />
                </FormControl>
              </WrapItem>

              <WrapItem>
                <FormControl
                  isInvalid={
                    errors.transfer_price &&
                    errors.transfer_price?.[index]?.twelve_person_price?.message
                  }
                >
                  <FormLabel color="#5E6282">Upto 12 Person</FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    width={{ base: "170px" }}
                    {...register(`transfer_price.${index}.twelve_person_price`)}
                  />
                </FormControl>
              </WrapItem>
            </Wrap>
          </Box>
          // </Box>
        ))}

        <Box textAlign="right">
          <Button
            w="20%"
            bg="secondary"
            color="white"
            px="5"
            mb={4}
            type="submit"
            _hover={{}}
          >
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TransferPayment;
