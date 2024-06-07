import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  Image,
  Input,
  Select,
  Text,
  Textarea,
  Toast,
  VStack,
  useToast,
  Slide,
  Center,
} from "@chakra-ui/react";
import { Country, State, City } from "country-state-city";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useController } from "react-hook-form";
import * as yup from "yup";
import ReactSelect from "react-select";
import { PlusSquareIcon } from "@chakra-ui/icons";
import ReactDatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { packageDetail } from "../../../features/attractionPackage.slice";
import { commonService } from "../../../services/common.service";
import { useUploadImageMutation } from "../../../features/holidayPackageApi.slice";
import ThrowErrors from "../../../services/throwErrors";
// import
const packagesDetailsSchema = yup.object().shape({
  package_name: yup.string().trim().required("Package Name is required"),
  validity_start_date: yup
    .string()
    .trim()
    .required("Validity Start Date is required"),
  validity_end_date: yup
    .string()
    .trim()
    .required("Validity End Date is required"),
  country: yup.string().trim().required("country is required"),
  state: yup.string().trim().required("state is required"),
  city: yup.string().trim().required("city is required"),
  description: yup.string().trim().required("description is required"),
  is_active: yup.string().trim().required("Package Availability is required"),
  season: yup.string().trim().required("Season is required"),
  travel_type: yup.string().trim().required("Travel type is required"),
  days: yup.string().trim().required("Days is required"),
  nights: yup.string().trim().required("Nights is required"),
});

const colourStyles = {
  menuList: (styles) => ({
    ...styles,
    background: "white",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    background: isFocused ? "#bdedff" : isSelected ? "#0090C5" : undefined,
    zIndex: 1,
  }),
  menu: (base) => ({
    ...base,
    zIndex: 100,
  }),
};

const PackageDetails = ({ routerState }) => {
  const packageDetailsFormReducer = useSelector(
    (state) => state.attractionPackageReducer.packageDetail
  );
  const [
    uploadImage,
    { error: uploadImageApiError, isLoading: uploadImageApiIsLoading },
  ] = useUploadImageMutation();

  const [images, setImages] = useState([]);
  const [imagesBinary, setImagesBinary] = useState([]);
  const [packageImgUrl, setPackageImgUrl] = useState([]);
  const toast = useToast();
  const dispatch = useDispatch(); // Initialize the useDispatch hook
  const [startDate, setStartDate] = useState(null);

  const [countryState, setCountryState] = useState({});
  const [states, setStates] = useState({});
  const [citiesState, setCitiesState] = useState({});

  const [duration, setDuration] = useState({
    days: {},
    nights: {},
  });

  //   const {
  //     register,
  //     control,
  //     setValue,
  //     formState: { errors },
  //   } = useFormContext(); // retrieve all hook methods
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(packagesDetailsSchema),
  });

  // these code for the previous date disabled
  const [defaultDate, setDefaultDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${month}-${day}-${year}`;
  });

  const imageUpload = async (imgObj) => {
    try {
      const res = await uploadImage(imgObj).unwrap();

      console.log("image upload res --> ", res);
      if (res.status === 201) {
        return res.image;
      }
    } catch (err) {
      console.log("image upload err --> ", err);
      ThrowErrors({}, err?.status);
    }
  };

  const onSubmit = async (data) => {
    // Dispatch the action to update the package detail

    console.log("onSubmit --> ", data);

    // let imagesArr = ["images", "first_image", "second_image", "third_image"];
    let imgUrlList = uploadAllImages();
    console.log("imgUrlList =======> ", imgUrlList);
    let img = {
      first_image: await imgUrlList[0],
      second_image: await imgUrlList[1],
      third_image: await imgUrlList[2],
      fourth_image: await imgUrlList[3],
      fifth_image: await imgUrlList[4],
    };

    // setPackageImgUrl

    const finalData = { ...img, ...data };

    console.log("final_data --> ", finalData);

    dispatch(packageDetail(finalData));
  };

  const uploadAllImages = () => {
    let imgUrlList = [];
    imagesBinary &&
      imagesBinary.forEach((image, ind) => {
        // setPackageImgUrl([]);
        let package_title = getValues("package_name").split(" ").join("_");
        var time = commonService.getCurrentTimeFileName();
        let file_name = `${package_title}_${ind}_${time}_${image.name}`;

        // Usage example

        console.log(file_name);

        console.log("file_name --> ", file_name);
        let formData = new FormData();
        formData.append("image_name", file_name);
        formData.append("image", image);
        let url = imageUpload(formData);

        console.log("onSubmit --> ", url);
        imgUrlList.push(url);
      });

    console.log("imgUrlList array ---> ", imgUrlList);

    return imgUrlList;
  };

  const ReactSelectController = ({ name, defaultValue, ...rest }) => {
    const {
      field: { ref, ...inputProps },
    } = useController({
      name,
      control,
      defaultValue,
    });

    return (
      <ReactSelect
        ref={ref}
        {...inputProps}
        {...rest}
        // onChange={() =>
        //   console.log("dsjlfsjflksd f---> ", name, control, defaultValue)
        // }
        styles={{
          ...colourStyles,
          control: (base) => ({
            ...base,
            flex: "1",
            boxShadow: "none",
            border: "0",
            backgroundColor: "#F1F2F6",
          }),
        }}
      />
    );
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];

    setImagesBinary((prev) => [...prev, file]);
    const validationError = commonService.validateFile(event.target.files);

    console.log("validationError --> ", validationError);
    if (validationError) {
      console.log("file err --> ", validationError);
      toast({
        title: "Error",
        description: validationError,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // Handle validation error
      // File is valid, perform further operations if needed
      const reader = new FileReader();

      reader.onloadend = () => {
        const updatedImages = [...images];
        console.log("updatedImages --> ", updatedImages);
        updatedImages[index] = reader.result;
        setImages(updatedImages);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleAddImage = () => {
    if (images.length < 5) {
      setImages([...images, null]);
    }
  };

  console.log("images", images); // Display images in the console

  const getCountries = async () => {
    try {
      //setIsLoading(true);
      // console.log("csc ---> ", csc);
      const result = await Country.getAllCountries();
      let allCountries = [];
      allCountries = result?.map(({ isoCode, name }) => ({
        value: isoCode,
        label: name,
      }));
      console.log("allCountries --->", allCountries);
      // const [{ isoCode: firstCountry } = {}] = allCountries;
      setCountryState((prev) => ({ ...prev, allCountries }));
      // setSelectedCountry(firstCountry);
      // setIsLoading(false);
    } catch (error) {
      console.log("error ---", error);
      // setCountries([]);
      // setIsLoading(false);
    }
  };

  const getStates = async () => {
    try {
      let selectedCountry = countryState?.selected?.value;
      console.log("selectedCountry --> ", selectedCountry);
      console.log("selectedCountry code --> ", selectedCountry.value);
      const result = await State.getStatesOfCountry(selectedCountry.value);
      console.log(result);
      let allStates = [];
      allStates = result?.map(({ isoCode, name }) => ({
        value: isoCode,
        label: name,
      }));

      setStates((perv) => ({ ...perv, allStates }));

      console.log("allStates ------> ", allStates);
    } catch (error) {
      console.log("error ---> ");
    }
  };

  const getCity = async () => {
    try {
      console.log("selected_country ---> ", countryState);
      console.log("states ---> ", states);

      let selected_country = countryState?.selected?.value;
      let selected_state = states?.selected?.value;

      console.log("contry code --> ", selected_country?.value);
      console.log("state code --> ", selected_state?.value);

      if (selected_country && selected_state) {
        const result = await City.getCitiesOfState(
          selected_country?.value,
          selected_state?.value
        );
        let allCities = [];
        console.log("!!!!!! cites result ---> ", result);
        allCities = result?.map(({ stateCode, name }) => ({
          // value: stateCode,
          value: name,
          label: name,
        }));
        setCitiesState((perv) => ({ ...perv, allCities }));
        console.log("allCities ------> ", allCities);
      }
    } catch (error) {
      console.log("error ---> ", error);
    }
  };

  const calculateDaysAndNights = async (start_date, end_date) => {
    let days_and_nights = await commonService.calculateDaysAndNights(
      start_date,
      end_date
    );
    console.log("days_and_nights", days_and_nights);
    if (JSON.stringify(days_and_nights) !== undefined) {
      const { days, nights } = days_and_nights;
      console.log("days_and_nights", days_and_nights);
      if (days && nights) {
        setValue("days", days.toString(), { shouldValidate: true });
        setValue("nights", nights.toString(), { shouldValidate: true });

        setDuration({
          days: { label: `${days} Day`, value: days },
          nights: { label: `${nights} Night`, value: nights },
        });
      }
    }
  };

  const calculateEndDate = (startDate, days, nights) => {
    let calculate_End_Date = commonService.calculateDaysAndNights(
      startDate,
      days,
      nights
    );
    console.log("calculate_End_Date", calculate_End_Date);
  };

  const calculateNightsAndEndDate = (start_Date, day) => {
    console.log("start date , day ", start_Date, day);
    let calculate_Nights_And_EndDate = commonService.calculateNightsAndEndDate(
      start_Date,
      day
    );

    const { nights, endDate } = calculate_Nights_And_EndDate;

    console.log("calculate_Nights_And_EndDate", calculate_Nights_And_EndDate);

    setDuration((prev) => ({
      ...prev,
      nights: { label: `${nights} Night`, value: nights },
    }));

    setValue("nights", nights.toString(), { shouldValidate: true });
    setValue("validity_end_date", endDate, { shouldValidate: true });

    // setDuration({
    //   days: { label: `${days} Day`, value: days },
    //   nights: { label: `${nights} Day`, value: nights },
    // });
  };

  const calculateDaysAndEndDate = (startDate, nights) => {
    console.log("calculate_Days_And_EndDate", startDate, nights);
    let calculate_Days_And_EndDate = commonService.calculateDaysAndEndDate(
      startDate,
      nights
    );
    console.log("calculate_Days_And_EndDate", calculate_Days_And_EndDate);
    const { days, endDate } = calculate_Days_And_EndDate;

    setDuration((prev) => ({
      ...prev,
      days: { label: `${days} Day`, value: days },
    }));
    setValue("days", days.toString(), { shouldValidate: true });
    setValue("validity_end_date", endDate, { shouldValidate: true });
  };

  const preFieldsFormEdit = () => {
    // packageDetailsFormReducer
    for (const [key, value] of Object.entries(packageDetailsFormReducer)) {
      console.log(`${key}: ${value}`);
      setValue(key, value, { shouldValidate: true });
    }
  };

  useEffect(() => {
    console.log("packageDetailsFormReducer", packageDetailsFormReducer);
    console.log("routerState", routerState);

    if (routerState !== null) {
      preFieldsFormEdit();
    }
  }, [packageDetailsFormReducer]);

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    getStates();
  }, [countryState]);

  useEffect(() => {
    getCity();
  }, [states]);

  useEffect(() => {
    console.log("images binary ---> ", packageImgUrl);
  }, [packageImgUrl]);

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type);
      if (
        name === "validity_start_date" ||
        (name === "validity_end_date" && type === "change")
      ) {
        calculateDaysAndNights(
          value.validity_start_date,
          value.validity_end_date
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <Box
        px={8}
        py={4}
        border={"1px"}
        borderColor={"secondary"}
        rounded={"xl"}
        height={1010}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns="1fr 1fr" gap="36px" mt={5}>
            <FormControl>
              <FormLabel color="loginText">Package name</FormLabel>
              <Input
                type="text"
                bgColor="#F1F2F6"
                {...register("package_name")}
                borderColor={errors.package_name ? "red" : "#CBD5E0"}
              />
              {errors.package_name && (
                <Text color={"red"}>{errors.package_name.message}</Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel color="loginText">Duration</FormLabel>
              <Flex>
                <FormControl px={2}>
                  {/* <ReactSelectController
                    name="days"
                    options={[{ label: "Test", value: "Test" }]}
                    register={register}
                  /> */}
                  <ReactSelect
                    // ref={ref}
                    // {...inputProps}
                    // {...rest}
                    name="days"
                    value={duration.days}
                    {...register("days", {
                      required: true,
                    })}
                    options={Array(30)
                      .fill()
                      .map((_, index) => ({
                        label: `${index + 1} Day`,
                        value: index + 1,
                      }))}
                    onChange={(val) => {
                      setValue("days", val.value, { shouldValidate: true });
                      setDuration((prev) => ({
                        ...prev,
                        days: val,
                      }));

                      calculateNightsAndEndDate(
                        getValues("validity_start_date"),
                        val.value
                      );
                    }}
                    styles={{
                      ...colourStyles,
                      control: (base) => ({
                        ...base,
                        flex: "1",
                        boxShadow: "none",
                        border: "1",
                        backgroundColor: "#F1F2F6",
                      }),
                    }}
                  />
                  {errors && errors.days && (
                    <Text color="red" mt={2}>
                      {errors.days.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl>
                  {/* <ReactSelectController
                    name="nights"
                    options={[{ label: "Test", value: "Test" }]}
                    register={register}
                  /> */}
                  <ReactSelect
                    // ref={ref}
                    // {...inputProps}
                    // {...rest}
                    name="nights"
                    value={duration.nights}
                    {...register("nights", {
                      required: true,
                    })}
                    options={Array(30)
                      .fill()
                      .map((_, index) => ({
                        label: `${index + 1} Night`,
                        value: index + 1,
                      }))}
                    onChange={(val) => {
                      setValue("nights", val.value, { shouldValidate: true });

                      setDuration((prev) => ({
                        ...prev,
                        nights: val,
                      }));

                      calculateDaysAndEndDate(
                        getValues("validity_start_date"),
                        val.value
                      );
                    }}
                    styles={{
                      ...colourStyles,
                      control: (base) => ({
                        ...base,
                        flex: "1",
                        boxShadow: "none",
                        border: "1",
                        backgroundColor: "#F1F2F6",
                      }),
                    }}
                  />
                  {errors.nights && (
                    <Text color="red" mt={2}>
                      {errors.nights.message}
                    </Text>
                  )}
                </FormControl>
              </Flex>
            </FormControl>
          </Grid>

          <Grid templateColumns="1fr 1fr" gap="36px" mt={5}>
            <FormControl>
              <FormLabel color="loginText">Validity Start date</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                // min={defaultDate}
                // min={new Date()}
                //max="2023-06-08"
                type="date"
                bgColor="#F1F2F6"
                {...register("validity_start_date", {
                  required: true,
                })}
                borderColor={errors.validity_start_date ? "red" : "#CBD5E0"}
              />
              {errors.validity_start_date && (
                <Text color={"red"}>{errors.validity_start_date.message}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel color="loginText">Validity End date</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="date"
                //  min={defaultDate}
                value={getValues("validity_end_date")}
                bgColor="#F1F2F6"
                {...register("validity_end_date", {
                  required: true,
                })}
                borderColor={errors.validity_end_date ? "red" : "#CBD5E0"}
              />
              {errors.validity_end_date && (
                <Text color={"red"}>{errors.validity_end_date.message}</Text>
              )}
            </FormControl>
          </Grid>

          <Grid templateColumns="1fr 1fr" gap="36px" mt={5}>
            <FormControl color="#A1A9C3" isInvalid={errors?.country}>
              <FormLabel m="2px" htmlFor="country">
                Country
              </FormLabel>
              <Select
                size="lg"
                bg="#F1F2F6"
                {...register("country", {
                  required: true,
                })}
                // defaultValue={}
                placeholder="Select Country"
                onChange={(el) => {
                  let name = el.target.selectedOptions[0].getAttribute("name");
                  let value = el.target.value;

                  setCountryState((prev) => ({
                    ...prev,
                    selected: {
                      value: { value: value, label: name },
                    },
                  }));

                  setStates((prev) => ({ ...prev, selected: {} }));
                  setCitiesState((prev) => ({ ...prev, selected: {} }));
                  setValue("state", "", {
                    shouldValidate: false,
                  });
                  setValue("city", "", {
                    shouldValidate: false,
                  });
                  setValue("country", value, {
                    shouldValidate: true,
                  });
                }}
              >
                {countryState?.allCountries &&
                  countryState?.allCountries.map((con) => (
                    <option
                      key={`country_${con.value}`}
                      name={con.label}
                      value={con.value}
                    >
                      {con.label}
                    </option>
                  ))}
              </Select>
              {errors.country && (
                <Text color={"red"}>{errors.country.message}</Text>
              )}
            </FormControl>

            <FormControl color="#A1A9C3" isInvalid={errors?.state}>
              <FormLabel m="2px" htmlFor="state">
                State
              </FormLabel>
              <Select
                size="lg"
                bg="#F1F2F6"
                name={"state"}
                {...register("state", {
                  required: true,
                })}
                placeholder="Select State"
                onChange={(el) => {
                  console.log("state on change ---> ", el.target.value);
                  let name = el.target.selectedOptions[0].getAttribute("name");
                  let value = el.target.value;

                  setStates((prev) => ({
                    ...prev,
                    selected: {
                      value: { value: value, label: name },
                    },
                  }));
                  setCitiesState((prev) => ({ ...prev, selected: {} }));
                  setValue("city", "", {
                    shouldValidate: false,
                  });
                  setValue("state", value, {
                    shouldValidate: true,
                  });
                }}
              >
                {states.allStates &&
                  states.allStates.map((state) => (
                    <option
                      key={`state_${state.value}`}
                      name={state.label}
                      value={state.value}
                    >
                      {state.label}
                    </option>
                  ))}
              </Select>
              {errors.state && (
                <Text color={"red"}>{errors.state.message}</Text>
              )}
            </FormControl>
          </Grid>

          <Grid templateColumns="1fr 1fr" gap="36px" mt={5}>
            <FormControl color="#A1A9C3" isInvalid={errors?.city}>
              <FormLabel m="2px" htmlFor="city">
                City
              </FormLabel>
              <Select
                size="lg"
                bg="#F1F2F6"
                name="city"
                {...register("city", {
                  required: true,
                })}
                placeholder={"Select City"}
                onChange={(el) => {
                  console.log("city on change --> ", el.target.value);
                  let name = el.target.selectedOptions[0].getAttribute("name");
                  let value = el.target.value;
                  setCitiesState((prev) => ({
                    ...prev,
                    selected: {
                      value: { value: value, label: name },
                    },
                  }));
                  setValue("city", value, {
                    shouldValidate: true,
                  });
                }}
              >
                {citiesState?.allCities &&
                  citiesState?.allCities.map((cite) => (
                    <option
                      key={`city_${cite.value}`}
                      name={cite.label}
                      value={cite.value}
                    >
                      {cite.label}
                    </option>
                  ))}
              </Select>
              {errors.city && <Text color={"red"}>{errors.city.message}</Text>}
            </FormControl>

            <FormControl color="#A1A9C3" isInvalid={errors?.is_active}>
              <FormLabel color="loginText">Package Availability</FormLabel>
              <ReactSelect
                // ref={ref}
                // {...inputProps}
                // {...rest}
                name="is_active"
                // value={duration.is_active}
                {...register("is_active", {
                  required: true,
                })}
                options={[
                  { label: "Show", value: true },
                  { label: "Hide", value: false },
                ]}
                onChange={(val) => {
                  setValue("is_active", val.value, { shouldValidate: true });
                  // setDuration((prev) => ({
                  //   ...prev,
                  //   season: val,
                  // }));
                }}
                styles={{
                  ...colourStyles,
                  control: (base) => ({
                    ...base,
                    flex: "1",
                    padding: 5,
                    boxShadow: "none",
                    backgroundColor: "#F1F2F6",
                    border: errors?.is_active ? "2px solid #E53E3E" : "0px",
                  }),
                }}
                s
              />
              {errors.is_active && (
                <Text color="red" mt={2}>
                  {errors.is_active.message}
                </Text>
              )}
            </FormControl>

            <FormControl color="#A1A9C3" isInvalid={errors.season}>
              <FormLabel color="loginText">Season</FormLabel>
              <ReactSelect
                // ref={ref}
                // {...inputProps}
                // {...rest}
                name="season"
                // value={duration.season}
                {...register("season", {
                  required: true,
                })}
                options={[
                  { label: "Summer", value: "sum" },
                  { label: "winter", value: "win" },
                ]}
                onChange={(val) => {
                  setValue("season", val.value, { shouldValidate: true });
                  // setDuration((prev) => ({
                  //   ...prev,
                  //   season: val,
                  // }));
                }}
                styles={{
                  ...colourStyles,
                  control: (base) => ({
                    ...base,
                    flex: "1",
                    padding: 5,
                    boxShadow: "none",
                    backgroundColor: "#F1F2F6",
                    border: errors.season ? "2px solid #E53E3E" : "0px",
                  }),
                }}
                s
              />
              {errors.season && (
                <Text color="red" mt={2}>
                  {errors.season.message}
                </Text>
              )}
            </FormControl>

            <FormControl color="#A1A9C3" isInvalid={errors?.travel_type}>
              <FormLabel color="loginText">Travel Type</FormLabel>
              <ReactSelect
                // ref={ref}
                // {...inputProps}
                // {...rest}
                name="travel_type"
                // value={duration.travel_type}
                {...register("travel_type", {
                  required: true,
                })}
                options={[
                  { label: "Private", value: "private" },
                  { label: "Self guided", value: "self_guided" },
                  { label: "Semi guided", value: "semi_guided" },
                ]}
                onChange={(val) => {
                  setValue("travel_type", val.value, { shouldValidate: true });
                }}
                styles={{
                  ...colourStyles,
                  control: (base) => ({
                    ...base,
                    flex: "1",
                    padding: 5,
                    boxShadow: "none",
                    backgroundColor: "#F1F2F6",
                    border: errors.travel_type ? "2px solid #E53E3E" : "",
                  }),
                }}
                s
              />
              {errors.travel_type && (
                <Text color="red" mt={2}>
                  {errors.travel_type.message}
                </Text>
              )}
            </FormControl>
          </Grid>

          <FormControl my={6}>
            <FormLabel color="loginText">Description</FormLabel>
            <Textarea
              bgColor="#F1F2F6"
              {...register("description")}
              borderColor={errors.description ? "red" : "#CBD5E0"}
            />
            {errors.description && (
              <Text color={"red"}>{errors.description.message}</Text>
            )}
          </FormControl>

          <Text color="loginText" mb={2}>
            Package Images
          </Text>
          <Flex justifyContent="space-between">
            <HStack spacing={4} wrap="wrap">
              {images.map((image, index) => (
                <Box
                  key={index}
                  width={{ base: "100%", md: "120px" }}
                  height="120px"
                  border={`1px solid ${
                    errors[`image_${index + 1}`] ? "red" : "#CBD5E0"
                  }`}
                  borderRadius="md"
                  overflow="hidden"
                  position="relative"
                  my={2}
                >
                  {image ? (
                    <>
                      <img
                        src={image}
                        alt="Uploaded Image"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <Box w="full" position="absolute" bottom={0}>
                        {/* <Center>
                <Text cursor="pointer" color="red.400">
                  Delete
                </Text>
              </Center> */}
                      </Box>
                    </>
                  ) : (
                    <Box
                      width="100%"
                      height="100%"
                      bg="#F1F2F6"
                      borderRadius="md"
                    />
                  )}
                </Box>
              ))}
              {images.length < 5 && (
                <Box
                  width={{ base: "100%", md: "120px" }}
                  height="120px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border={`1px dashed ${
                    errors[`image_${images.length + 1}`] ? "red" : "#CBD5E0"
                  }`}
                  borderRadius="md"
                  overflow="hidden"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleImageUpload(event, images.length)
                    }
                    style={{ display: "none" }}
                    id={`image-upload-${images.length}`}
                  />
                  <label htmlFor={`image-upload-${images.length}`}>
                    <Box
                      as="span"
                      bgColor="white"
                      color="white"
                      cursor="pointer"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      width="120px"
                      height="120px"
                      boxShadow="inner"
                    >
                      <Image
                        borderRadius="full"
                        src="/assets/icons/addImage.svg"
                      />

                      <Text color="secondary">Add Image</Text>
                    </Box>
                  </label>
                </Box>
              )}
            </HStack>
            {errors.first_image && (
              <Text color="red" mt={2}>
                {errors.first_image.message}
              </Text>
            )}
            {errors.second_image && (
              <Text color="red" mt={2}>
                {errors.second_image.message}
              </Text>
            )}
            {errors.third_image && (
              <Text color="red" mt={2}>
                {errors.third_image.message}
              </Text>
            )}
            {errors.fourth_image && (
              <Text color="red" mt={2}>
                {errors.fourth_image.message}
              </Text>
            )}
            {errors.fifth_image && (
              <Text color="red" mt={2}>
                {errors.fifth_image.message}
              </Text>
            )}
            <Button
              mt={4}
              py={6}
              px={10}
              _hover={""}
              bgColor="secondary"
              isLoading={uploadImageApiIsLoading}
              color="White"
              type="submit"
            >
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default PackageDetails;
