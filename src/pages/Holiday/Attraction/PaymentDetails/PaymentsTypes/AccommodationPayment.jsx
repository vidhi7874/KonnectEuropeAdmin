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
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { paymentDetailsAdd } from "../../../../../features/attractionPackage.slice";

const AccommodationPayment = ({ onClose }) => {
  const dispatch = useDispatch();
  const accommodationPriceFromReducer = useSelector(
    (state) => state.attractionPackageReducer.paymentDetails.accommodation
  );

  console.log(
    "accommodationPriceFromReducer ===> ",
    accommodationPriceFromReducer
  );

  const [attractionPaymentDetails, setAttractionPaymentDetails] = useState([]);

  const schema = Yup.object().shape({
    accommodation_price: Yup.array().of(
      Yup.object().shape({
        rating: Yup.number()
          .typeError("Rating  is required")
          .required("Rating is required"),

        single_price: Yup.number()
          .typeError("Single price  is required")
          .required("Single price is required"),

        double_price: Yup.number()
          .typeError("double price  is required")
          .required("double price is required"),

        twin_price: Yup.number()
          .typeError("Twin price  is required")
          .required("Twin price is required"),

        triple_price: Yup.number()
          .typeError("Triple price  is required")
          .required("Triple price is required"),

        quad_price: Yup.number()
          .typeError("Quad price  is required")
          .required("Quad price is required"),

        extra_bed_price: Yup.number()
          .typeError("Extra bed price  is required")
          .required("Extra bed price is required"),
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
    // defaultValues: {
    //   accommodation_price: [],
    // },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "accommodation_price",
  });

  const onSubmit = (data) => {
    console.log("on submit ==> ", data);
    dispatch(paymentDetailsAdd(data.accommodation_price));
    // dispatch(attractionDetail(data.accommodation_price));
    onClose();
  };

  console.log("errors: ", errors);

  useEffect(() => {
    // let arr = accomodationDetailFromReducer.map((item) => ({
    //   ...item,
    //   adult_price: item?.adult_price,
    //   child_price: item?.child_price,
    // }));
    // console.log("arr : ", arr);
    //  setAttractionPaymentDetails(arr);

    if (accommodationPriceFromReducer?.length) {
      append(accommodationPriceFromReducer);
    } else {
      append([
        {
          rating: 3,
          name: "Three Star Hotel Price",
          single_price: null,
          double_price: null,
          twin_price: null,
          triple_price: null,
          quad_price: null,
          extra_bed_price: null,
        },
        {
          rating: 4,
          name: "Four Star Hotel Price",
          single_price: null,
          double_price: null,
          twin_price: null,
          triple_price: null,
          quad_price: null,
          extra_bed_price: null,
        },
        {
          rating: 5,
          name: "Four Star Hotel Price",
          single_price: null,
          double_price: null,
          twin_price: null,
          triple_price: null,
          quad_price: null,
          extra_bed_price: null,
        },
      ]);
    }
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
          Add Accommodation Payment
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
            mb="5"
          >
            <Box mb="10">
              <Text color="secondary"> {item.name} </Text>
            </Box>
            {/* <Box mt="5" display={{ base: "flex" }} gap="6" mb={4}> */}
            <Wrap height={220} spacing="20px" align="center">
              {/* Single Occupancy price Per Room Per Night */}
              <WrapItem>
                <FormControl
                  isInvalid={
                    errors.accommodation_price &&
                    errors.accommodation_price?.[index]?.single_price?.message
                  }
                >
                  <FormLabel color="#5E6282">
                    Single Occupancy price Per Room Per Night
                  </FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    {...register(`accommodation_price.${index}.single_price`)}
                  />
                  <FormErrorMessage>
                    {errors.accommodation_price &&
                      errors.accommodation_price?.[index]?.single_price
                        ?.message}
                  </FormErrorMessage>
                </FormControl>
              </WrapItem>

              {/* Double Occupancy price Per Room Per Night */}
              <WrapItem height="90px">
                <FormControl
                  isInvalid={
                    errors.accommodation_price &&
                    errors.accommodation_price[index]?.double_price?.message
                  }
                >
                  <FormLabel color="#5E6282">
                    Double Occupancy price Per Room Per Night
                  </FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    {...register(`accommodation_price.${index}.double_price`)}
                  />
                  <FormErrorMessage>
                    {errors.accommodation_price &&
                      errors.accommodation_price[index]?.double_price?.message}
                  </FormErrorMessage>
                </FormControl>
              </WrapItem>

              {/* Twin Occupancy price Per Room Per Night */}
              <WrapItem height="90px">
                <FormControl
                  isInvalid={
                    errors.accommodation_price &&
                    errors.accommodation_price[index]?.twin_price?.message
                  }
                >
                  <FormLabel color="#5E6282">
                    Twin Occupancy price Per Room Per Night
                  </FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    {...register(`accommodation_price.${index}.twin_price`)}
                  />
                  <FormErrorMessage>
                    {errors.accommodation_price &&
                      errors.accommodation_price[index]?.twin_price?.message}
                  </FormErrorMessage>
                </FormControl>
              </WrapItem>

              {/* Triple Occupancy price Per Room Per Night */}
              <WrapItem height="90px">
                <FormControl
                  isInvalid={
                    errors.accommodation_price &&
                    errors.accommodation_price[index]?.triple_price?.message
                  }
                >
                  <FormLabel color="#5E6282">
                    Triple Occupancy price Per Room Per Night
                  </FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    {...register(`accommodation_price.${index}.triple_price`)}
                  />
                  <FormErrorMessage>
                    {errors.accommodation_price &&
                      errors.accommodation_price[index]?.triple_price?.message}
                  </FormErrorMessage>
                </FormControl>
              </WrapItem>

              {/* QUAD Rate 2 Adults + 2 Child Per Room Per Night */}
              <WrapItem height="90px">
                <FormControl
                  isInvalid={
                    errors.accommodation_price &&
                    errors.accommodation_price[index]?.quad_price?.message
                  }
                >
                  <FormLabel color="#5E6282">
                    Single Occupancy price Per Room Per Night
                  </FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    {...register(`accommodation_price.${index}.quad_price`)}
                  />
                  <FormErrorMessage>
                    {errors.accommodation_price &&
                      errors.accommodation_price[index]?.quad_price?.message}
                  </FormErrorMessage>
                </FormControl>
              </WrapItem>

              {/* Extra bed price Per Room Per Night */}
              <WrapItem height="90px">
                <FormControl
                  isInvalid={
                    errors.accommodation_price &&
                    errors.accommodation_price[index]?.extra_bed_price?.message
                  }
                >
                  <FormLabel color="#5E6282">
                    QUAD Rate 2 Adults + 2 Child Per Room Per Night
                  </FormLabel>
                  <Input
                    bg="#F1F2F6"
                    type="number"
                    focusBorderColor=""
                    {...register(
                      `accommodation_price.${index}.extra_bed_price`
                    )}
                  />
                  <FormErrorMessage>
                    {errors.accommodation_price &&
                      errors.accommodation_price[index]?.extra_bed_price
                        ?.message}
                  </FormErrorMessage>
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

export default AccommodationPayment;
