import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  ChakraProvider,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { attractionDetail } from "../../../../../features/attractionPackage.slice";

const AttractionsPayments = ({ onClose }) => {
  const dispatch = useDispatch();
  const attractionDetailFromReducer = useSelector(
    (state) => state.attractionPackageReducer.attractionDetailData
  );
  console.log("attractionDetailFromReducer ===> ", attractionDetailFromReducer);

  const [attractionPaymentDetails, setAttractionPaymentDetails] = useState([]);

  const schema = Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        adult_price: Yup.number()
          .typeError("Adult Price is required")
          .required("Adult Price is required"),
        child_price: Yup.number()
          .typeError("Child Price is required")
          .required("Child Price is required"),
      })
    ),
    // .min(1, "At least one item is required"),
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      items: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(attractionDetail(data.items));
    onClose();
  };

  console.log("errors: ", errors);

  useEffect(() => {
    let arr = attractionDetailFromReducer.map((item) => ({
      ...item,
      adult_price: item?.adult_price,
      child_price: item?.child_price,
    }));
    console.log("arr : ", arr);
    setAttractionPaymentDetails(arr);
    append(arr);
  }, []);

  return (
    <Box>
      <Box mb="10">
        <Text
          textAlign="center"
          fontWeight="bold"
          fontSize="3xl"
          color="secondary"
        >
          Add Attractions Payment
        </Text>
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
            mb="3"
          >
            <Box>
              <Text color="secondary"> {`Attraction Name ${index + 1}`} </Text>
            </Box>
            <Box mt="5" display={{ base: "flex" }} gap="6" mb={4}>
              <FormControl isInvalid={errors.items && errors.items[index]}>
                <FormLabel color="#5E6282">Adult Price</FormLabel>
                <Input
                  bg="#F1F2F6"
                  type="number"
                  {...register(`items.${index}.adult_price`)}
                />
                <FormErrorMessage>
                  {errors.items && errors.items[index]?.adult_price?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.items && errors.items[index]}>
                <FormLabel color="#5E6282">Child Price</FormLabel>
                <Input
                  bg="#F1F2F6"
                  type="number"
                  {...register(`items.${index}.child_price`)}
                />
                <FormErrorMessage>
                  {errors.items && errors.items[index]?.child_price?.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Box>
        ))}

        {fields.length === 0 && (
          <Box textAlign="center">
            <Text> Please Add Attraction Details </Text>
          </Box>
        )}

        <Box textAlign="right">
          <Button
            w="20%"
            bg="secondary"
            color="white"
            px="5"
            mb={4}
            isDisabled={fields.length === 0}
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

export default AttractionsPayments;
