import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  Grid,
  Center,
  Image,
  Flex,
  Text,
  Checkbox,
  Divider,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AddIcon } from "@chakra-ui/icons";
import ReactSelect from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";

import DeleteConfirmation from "../../../components/common/DeleteConfirmation";
import { accomodationDetail } from "../../../features/attractionPackage.slice";
import { Form } from "react-router-dom";
import {
  useGetAllCitesMutation,
  useGetAllCountriesMutation,
} from "../../../features/holidayPackageApi.slice";

// This is for the validation on form

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

const AccomodationDetail = ({ routerState }) => {
  const accomodationDetailDataFormReducer = useSelector(
    (state) => state.attractionPackageReducer.accomodationDetail
  );
  const formSchema = {
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    city: yup.string().required("City is required"),
    ratings: yup.array().of(
      yup.object({
        rating: yup.number().required("Rating is required"),
        first_name: yup.string().required("First name is required"),
        second_name: yup.string(),
        third_name: yup.string(),
        city: yup.string(),
      })
    ),
    desc: yup.string().required("Description is required"),
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: confirmationModalIsOpen,
    onOpen: confirmationModalOnOpen,
    onClose: confirmationModalOnClose,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ratings",
  });

  const [country, setCountry] = useState({
    city: "",
    country: "",
  });
  const [accomodations, setAccomodations] = useState([]);
  const [editingAccomodation, setEditingAccomodation] = useState({
    data: null,
    index: null,
    isEdit: false,
  });
  const [deleteAccomodation, setDeleteAccomodation] = useState(null);
  const [countryState, setCountryState] = useState({});
  const [states, setStates] = useState({});
  const [citiesState, setCitiesState] = useState({});
  const [accomodationsList, setAccomodationsList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dispatch = useDispatch();

  // const handleDelete = (index) => {
  //   remove(index);
  // };

  const handleUpdate = (index, updatedValues) => {
    update(index, updatedValues);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  // const onSubmit = (data) => {
  //   console.log("editingAccomodation ---> ", editingAccomodation);
  //   if (editingAccomodation) {
  //     const updatedAccomodations = accomodations.map((accomodation) =>
  //       accomodation.id === editingAccomodation.id
  //         ? { ...accomodation, ...data }
  //         : accomodation
  //     );
  //     setAccomodations(updatedAccomodations);
  //     setEditingAccomodation(null);
  //     ///  dispatch(AccomodationDetail(updatedAccomodations)); // Dispatch the updated Accomodation data to your reducer
  //   } else {
  //     const newAccomodation = { id: accomodations.length + 1, ...data };
  //     setAccomodations([...accomodations, newAccomodation]);
  //     // dispatch(AccomodationDetail([...Accomodations, newAccomodation])); // Dispatch the updated Accomodation data to your reducer
  //   }
  //   onClose();
  //   reset();
  //   console.log(accomodations); // Log the updated Accomodation data
  // };

  //   this is for the edit
  const handleEdit = (accomodation, index) => {
    setSelectedIndex(index);
    setEditingAccomodation({
      data: accomodation,
      index: index,
      isEdit: true,
    });
    onOpen();
  };

  //   This is for the erroe border red code using react hook form
  const [hotelName, setHotelName] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    // setHotelName(value);
    // setIsInvalid(value === "");
  };

  const [threeStarData, setThreeStarData] = useState([]);
  const [fourStarData, setFourStarData] = useState([]);
  const [fiveStarData, setFiveStarData] = useState([]);

  //   this is for the delete
  const handleDelete = (accomodation, index) => {
    setSelectedIndex(index);
    setDeleteAccomodation(accomodation);
    confirmationModalOnOpen();
  };

  //   these is for the confirmation delete
  const confirmDelete = () => {
    const filteredAccomodations = accomodations.filter(
      (a) => a.id !== deleteAccomodation.id
    );

    accomodationsList.splice(selectedIndex, 1);
    setAccomodations(filteredAccomodations);

    const da = filteredAccomodations.map((el) => el.ratings);
    console.log("da -----------> ", da);
    console.log("getvalues test --> ", getValues("desc"));

    const flatArray = da.flatMap((innerArray) =>
      innerArray.map((item) => item)
    );

    dispatch(accomodationDetail(flatArray));

    confirmationModalOnClose();
    console.log("delete confirmation", deleteAccomodation);
  };

  const saveAttractions = () => {
    console.log("accomodation detail", accomodationsList);
    const da = accomodationsList.map((el) => el.ratings);
    console.log("da -----------> ", da);
    console.log("getvalues test --> ", getValues("desc"));

    const flatArray = da.flatMap((innerArray) =>
      innerArray.map((item) => item)
    );

    dispatch(accomodationDetail(flatArray));
    console.log(flatArray);
  };

  useEffect(() => {
    console.log("accomodationsList ---> ", accomodationsList);
    onClose();
  }, [accomodationsList]);

  // useEffect(() => {
  //   // editingAccomodation
  //   alert("on close", onOpen === true ? "true" : "false");
  // }, [isOpen]);

  const preFieldsFormEdit = () => {
    // packageDetailsFormReducer
    setAccomodationsList(accomodationDetailDataFormReducer);
  };

  useEffect(() => {
    console.log(
      "accomodationDetailDataFormReducer",
      accomodationDetailDataFormReducer
    );

    if (routerState !== null) {
      preFieldsFormEdit();
    }
  }, [accomodationDetailDataFormReducer]);

  return (
    <>
      <Box border={"1px"} borderColor={"secondary"} rounded={"xl"}>
        {/* This is a main box  */}
        <Box p={10} display="flex" justifyContent="center" marginTop="20px">
          <Button
            onClick={() => {
              onOpen();
              setEditingAccomodation({
                data: null,
                index: null,
                isEdit: false,
              });
            }}
            leftIcon={<AddIcon />}
            bgColor={"secondary"}
            color={"white"}
            _hover={""}
            rounded={"lg"}
          >
            Add Accomodation
          </Button>
        </Box>

        {/* Modal for Add/Edit Accomodation */}
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            reset();
          }}
          size={"3xl"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={"center"} color={"secondary"}>
              {editingAccomodation.isEdit
                ? "Update Accomodation"
                : "Add Accomodation"}
            </ModalHeader>
            <ModalBody>
              <CommonCountryCity
                setAccomodationsList={setAccomodationsList}
                editingAccomodation={editingAccomodation}
                setSelectedIndex={setSelectedIndex}
              />
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmation
          isOpen={confirmationModalIsOpen && deleteAccomodation !== null}
          onClose={() => {
            setDeleteAccomodation(null);
            confirmationModalOnClose();
          }}
          onDelete={confirmDelete}
          attraction={deleteAccomodation}
        />

        {/* Display Attractions */}
        {accomodationsList &&
          accomodationsList.map((accomodation, index) => (
            <Box
              m={4}
              key={accomodation?.id}
              marginTop="20px"
              bgColor={"secondary"}
              py={2}
              rounded={"xl"}
              px={4}
            >
              <Box display="flex" justifyContent="space-between">
                <Box fontWeight="bold" color={"white"} p={1}>
                  {accomodation?.city}
                </Box>
                <Box>
                  <Button
                    onClick={() => handleEdit(accomodation, index)}
                    backgroundColor={"secondary"}
                    color={"white"}
                    marginRight="10px"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(accomodations, index)}
                    backgroundColor={"secondary"}
                    color={"white"}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}

        {/* Show Save Button */}
        {accomodationsList.length > 0 && (
          <Box display="flex" justifyContent="center" marginTop="20px">
            <Button
              _hover={""}
              backgroundColor={"secondary"}
              color={"white"}
              type="button"
              my={4}
              w={"15%"}
              onClick={() => saveAttractions()}
            >
              Save
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AccomodationDetail;

const CommonCountryCity = ({
  setAccomodationsList,
  editingAccomodation,
  selectedIndex,
}) => {
  const [countryState, setCountryState] = useState({});
  const [states, setStates] = useState({});
  const [citiesState, setCitiesState] = useState({});
  const [requiredRating, setRequiredRating] = useState({
    [`ratings[${0}].rating`]: true,
    [`ratings[${1}].rating`]: true,
    [`ratings[${2}].rating`]: true,
  });
  let isEmpty = editingAccomodation.isEdit;

  const [
    getAllCountries,
    { error: getAllCountriesApiError, isLoading: getAllCountriesApiIsLoading },
  ] = useGetAllCountriesMutation();

  const [
    getAllCites,
    { error: getAllCitesApiError, isLoading: getAllCitesApiIsLoading },
  ] = useGetAllCitesMutation();

  const {
    register,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { fields, append, update } = useFieldArray({
    control,
    name: "ratings",
  });

  const onSubmit = (data) => {
    console.log("onSubmit ====> ", data);
    console.log("getValues(desc)", getValues("desc"));

    if (editingAccomodation?.isEdit) {
      const { index } = editingAccomodation;

      setAccomodationsList((prevArray) => {
        const newArray = [...prevArray];
        newArray[index] = { ...data, desc: getValues("desc") };
        return newArray;
      });
    } else {
      setAccomodationsList((prev) => [
        ...prev,
        { ...data, desc: getValues("desc") },
      ]);
    }
  };

  console.log("errors --> ", errors);

  const getCountries = async () => {
    try {
      // const result = await Country.getAllCountries();
      const result = await getAllCountries().unwrap();

      console.log("getAllCountries ----> ", result);
      let allCountries = [];
      allCountries = result?.data?.map(({ country_code, country_name }) => ({
        value: country_code,
        label: country_name,
      }));
      console.log("allCountries ==> ", allCountries);
      const { data, isEdit } = editingAccomodation;
      setCountryState((prev) => ({ ...prev, allCountries }));

      if (isEdit) {
        const country =
          allCountries &&
          allCountries.filter((el) => el.value === data?.country);
        console.log("country ==> ", country);
        setCountryState((prev) => ({
          ...prev,
          selected: {
            value: country[0],
          },
        }));
      }
    } catch (error) {
      console.log("error ---", error);
    }
  };

  const getStates = async () => {
    try {
      let selectedCountry = countryState?.selected?.value;
      const result = await State.getStatesOfCountry(selectedCountry.value);
      const { data, isEdit } = editingAccomodation;
      let allStates = [];
      allStates = result?.map(({ isoCode, name }) => ({
        value: isoCode,
        label: name,
      }));

      setStates((perv) => ({ ...perv, allStates }));
      console.log("allStates ==> ", allStates);

      if (isEdit) {
        const selected_state =
          allStates && allStates.filter((el) => el.value === data?.state);
        console.log("selected_state ==> ", selected_state);
        setValue("state", selected_state[0].value, { shouldValidate: false });
        setStates((prev) => ({
          ...prev,
          selected: {
            value: selected_state[0],
          },
        }));
      }
    } catch (error) {
      console.log("error ---> ");
    }
  };

  const getCity = async () => {
    try {
      console.log("countryState ===> ", countryState);
      let selected_country = countryState?.selected?.value;
      let selected_state = states?.selected?.value;
      console.log(selected_country?.value);
      if (selected_country?.value) {
        const result = await getAllCites({
          country: selected_country.value,
        }).unwrap();
        console.log("getAllCites result ------> ", result);
        // const result_d = await City.getCitiesOfState(
        //   selected_country?.value,
        //   selected_state?.value
        // );
        let allCities = [];

        console.log("allCities result ------> ", result);

        allCities = result?.data?.map(({ city_code, city_name }) => ({
          value: city_code,
          label: city_name,
        }));
        setCitiesState((perv) => ({ ...perv, allCities }));
        console.log("allCities ------> ", allCities);
        const { data, isEdit } = editingAccomodation;
        if (isEdit) {
          const selected_city =
            allCities && allCities.filter((el) => el.value === data?.city);
          console.log("selected_city ==> ", selected_city);
          setValue("city", selected_city[0]?.value, { shouldValidate: false });
          setCitiesState((prev) => ({
            ...prev,
            selected: {
              value: selected_city[0],
            },
          }));
        }
      }
    } catch (error) {
      console.log("error ---> ", error);
    }
  };

  useEffect(() => {
    console.log("editingAccomodation on edit ---> ", editingAccomodation);
    let d = [
      {
        rating_field: "3",
        rating: "3",
        city: "",
        first_name: "",
        second_name: "",
        third_name: "",
      },
      {
        rating_field: "4",
        rating: "4",
        city: "",
        first_name: "",
        second_name: "",
        third_name: "",
      },
      {
        rating_field: "5",
        rating: "5",
        city: "",
        first_name: "",
        second_name: "",
        third_name: "",
      },
    ];

    console.log("editingAccomodation ===>", editingAccomodation, isEmpty);

    if (editingAccomodation.isEdit) {
      console.log("in side if");
      append(editingAccomodation?.data?.ratings);
    } else {
      console.log("in side else ");
      append(d);
    }
  }, []);

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    //  getStates();
  }, [countryState]);

  useEffect(() => {
    getCity();
  }, [countryState]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns="1fr 1fr" gap="36px" mt={5}>
        <FormControl
          color="#A1A9C3"
          isInvalid={errors.accommodations?.[index]?.country}
        >
          <FormLabel m="2px">Country</FormLabel>
          <Select
            size="lg"
            bg="#F1F2F6"
            name={`country`}
            {...register(`country`, {
              required: true,
            })}
            // defaultValue={countryState?.selected?.value.label}
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

              // setStates((prev) => ({ ...prev, selected: {} }));
              setCitiesState((prev) => ({ ...prev, selected: {} }));
              // setValue("state", "", {
              //   shouldValidate: false,
              // });
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
                  selected={countryState?.selected?.value.label === con.label}
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
        {/* 
        <FormControl color="#A1A9C3" isInvalid={errors.state}>
          <FormLabel m="2px">State</FormLabel>
          <Select
            size="lg"
            bg="#F1F2F6"
            name={`state`}
            {...register(`state`, {
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
                  selected={states?.selected?.value?.label === state.label}
                  name={state.label}
                  value={state.value}
                >
                  {state.label}
                </option>
              ))}
          </Select>

          {errors.state && <Text color={"red"}> {errors.state.message} </Text>}
        </FormControl> */}

        <FormControl color="#A1A9C3" isInvalid={errors.city}>
          <FormLabel m="2px">City</FormLabel>
          <Select
            size="lg"
            bg="#F1F2F6"
            name={`city`}
            {...register(`city`, {
              required: true,
            })}
            placeholder={"Select City"}
            onChange={(el) => {
              console.log("city on change --> ", el.target.value);
              let name = el.target.selectedOptions[0].getAttribute("name");
              let value = el.target.value;
              console.log("name value -=>", name, value);
              setCitiesState((prev) => ({
                ...prev,
                selected: {
                  value: { value: value, label: name },
                },
              }));

              setValue(`ratings[0].city`, value, {
                shouldValidate: true,
              });

              setValue(`ratings[1].city`, value, {
                shouldValidate: true,
              });

              setValue(`ratings[2].city`, value, {
                shouldValidate: true,
              });

              setValue("city", value, {
                shouldValidate: true,
              });
            }}
          >
            {citiesState?.allCities &&
              citiesState?.allCities.map((cite) => (
                <option
                  key={`city_${cite.value}`}
                  selected={citiesState?.selected?.value?.value === cite.value}
                  name={cite.label}
                  value={cite.value}
                >
                  {cite.label}
                </option>
              ))}
          </Select>

          {errors.city && <Text color={"red"}>{errors.city.message}</Text>}
        </FormControl>
      </Grid>

      <Box>
        <Flex my={10}>
          {fields.map((field, index) => (
            <Box>
              {/* 3 start rating start */}
              <Flex key={`rating_${index}`} direction="column" marginRight={4}>
                <FormControl>
                  <FormLabel>Select rating</FormLabel>

                  <Box
                    sx={{
                      borderRadius: "6px",
                      backgroundColor: "#F1F2F6",
                      padding: "10px",
                    }}
                  >
                    <Flex justifyContent={"space-between"}>
                      <Image
                        borderRadius="full"
                        src={`/assets/icons/ratingStar_${index}.svg`}
                        alt="Three Star"
                      />

                      <Checkbox
                        name={`ratings[${index}].rating`}
                        {...register(`ratings[${index}].rating`, {
                          required:
                            requiredRating?.[`ratings[${index}].rating_field`],
                        })}
                        onChange={(e) => {
                          console.log(
                            "rating on change --> ",
                            e.target.checked
                          );
                          let rat =
                            e.target.checked && index === 0
                              ? 3
                              : e.target.checked && index === 1
                              ? 4
                              : e.target.checked && index === 5
                              ? 5
                              : "";
                          if (e.target.checked) {
                            setValue(`ratings[${index}].rating_field`, rat, {
                              shouldValidate: true,
                            });
                          } else {
                            setValue(`ratings[${index}].rating_field`, "", {
                              shouldValidate: true,
                            });
                          }
                          console.log("rating on change --> ", e.target.name);
                          setRequiredRating((prev) => ({
                            ...prev,
                            [e.target.name]: e.target.checked,
                          }));
                        }}
                        rules={{
                          required: "Please select a rating",
                        }}
                      ></Checkbox>
                    </Flex>
                  </Box>
                </FormControl>

                <FormControl my={4}>
                  <FormLabel color={"loginText"}>Enter hotel name 1</FormLabel>
                  <Input
                    bgColor={"#F1F2F6"}
                    name={`ratings[${index}].first_name`}
                    {...register(`ratings[${index}].first_name`, {
                      required: requiredRating?.[`ratings[${index}].rating`],
                    })}
                    style={{
                      border: errors.ratings?.[index]?.first_name
                        ? "1px solid red"
                        : "",
                    }}
                  />
                </FormControl>

                <FormControl my={4}>
                  <FormLabel color={"loginText"}>Enter hotel name 2</FormLabel>
                  <Input
                    bgColor={"#F1F2F6"}
                    name={`ratings[${index}].second_name`}
                    {...register(`ratings[${index}].second_name`, {
                      required: requiredRating?.[`ratings[${index}].rating`],
                    })}
                    style={{
                      border: errors.ratings?.[index]?.second_name
                        ? "1px solid red"
                        : "green",
                    }}
                  />
                </FormControl>

                <FormControl my={4}>
                  <FormLabel color={"loginText"}>Enter hotel name 3</FormLabel>
                  <Input
                    bgColor={"#F1F2F6"}
                    name={`ratings[${index}].third_name`}
                    {...register(`ratings[${index}].third_name`, {
                      required: requiredRating?.[`ratings[${index}].rating`],
                    })}
                    style={{
                      border: errors.ratings?.[index]?.third_name
                        ? "1px solid red"
                        : "green",
                    }}
                  />
                </FormControl>

                <FormControl my={4}>
                  <FormLabel color={"loginText"}>Description</FormLabel>
                  <Textarea
                    bgColor={"#F1F2F6"}
                    name={`ratings[${index}].desc`}
                    {...register(`ratings[${index}].desc`, {
                      required: requiredRating?.[`ratings[${index}].rating`],
                    })}
                    style={{
                      border: errors.ratings?.[index]?.desc
                        ? "1px solid red"
                        : "green",
                    }}
                  />
                </FormControl>
              </Flex>

              {/* 3 start rating end */}
            </Box>
          ))}
        </Flex>
      </Box>

      <Center>
        <Button
          type="submit"
          marginTop="10px"
          bgColor={"secondary"}
          color={"white"}
          w={"30%"}
          my={10}
          _hover={""}
        >
          {editingAccomodation.isEdit ? "Update" : "Add"}
        </Button>
      </Center>
    </form>
  );
};

// ==========================  old code ====================

// <form onSubmit={handleSubmit(onSubmit)}>
{
  /* <Grid templateColumns="1fr 1fr" gap="36px" mt={5}>
  <FormControl
    color="#A1A9C3"
    isInvalid={errors.accommodations?.[index]?.country}
  >
    <FormLabel m="2px">Country</FormLabel>
    <Select
      size="lg"
      bg="#F1F2F6"
      name={`country`}
      {...register(`country`, {
        required: true,
      })}
      // defaultValue={}
      placeholder="Select Country"
      onChange={(el) => {
        let name =
          el.target.selectedOptions[0].getAttribute("name");
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

  <FormControl color="#A1A9C3" isInvalid={errors.state}>
    <FormLabel m="2px">State</FormLabel>
    <Select
      size="lg"
      bg="#F1F2F6"
      name={`state`}
      {...register(`state`, {
        required: true,
      })}
      placeholder="Select State"
      onChange={(el) => {
        console.log("state on change ---> ", el.target.value);
        let name =
          el.target.selectedOptions[0].getAttribute("name");
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
      <Text color={"red"}> {errors.state.message} </Text>
    )}
  </FormControl>

  <FormControl color="#A1A9C3" isInvalid={errors.city}>
    <FormLabel m="2px">City</FormLabel>
    <Select
      size="lg"
      bg="#F1F2F6"
      name={`city`}
      {...register(`city`, {
        required: true,
      })}
      placeholder={"Select City"}
      onChange={(el) => {
        console.log("city on change --> ", el.target.value);
        let name =
          el.target.selectedOptions[0].getAttribute("name");
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

    {errors.city && (
      <Text color={"red"}>{errors.city.message}</Text>
    )}
  </FormControl>
</Grid> */
}

// <Flex my={10}>
//   {/* 3 start rating start */}
//   <Flex direction="column" marginRight={4}>
//     <FormControl>
//       <FormLabel>Select rating</FormLabel>
//       <Box
//         sx={{
//           borderRadius: "6px",
//           backgroundColor: "#F1F2F6",
//           padding: "10px",
//         }}
//       >
//         <Flex justifyContent={"space-between"}>
//           <Image
//             borderRadius="full"
//             src="/assets/icons/threeStar.svg"
//             alt="Three Star"
//           />

//           <Checkbox
//             name={`rating`}
//             {...register(`rating`, {
//               required: true,
//             })}
//             rules={{
//               required: "Please select a rating",
//             }}
//           ></Checkbox>
//         </Flex>
//         {/* {errors.country && (
//           <Text color={"red"}>{errors.country.message}</Text>
//         )} */}
//       </Box>
//     </FormControl>

//     <FormControl my={4}>
//       <FormLabel color={"loginText"}>
//         Enter hotel name 1
//       </FormLabel>
//       <Input
//         bgColor={"#F1F2F6"}
//         name={`first_name`}
//         {...register(`first_name`)}
//         style={{
//           border: isInvalid ? "1px solid red" : "green",
//         }}
//
//
//       />
//     </FormControl>

//     <FormControl my={4}>
//       <FormLabel color={"loginText"}>
//         Enter hotel name 2
//       </FormLabel>
//       <Input
//         bgColor={"#F1F2F6"}
//         name={`second_name`}
//         style={{
//           border: isInvalid ? "1px solid red" : "green",
//         }}
//
//
//       />
//     </FormControl>

//     <FormControl my={4}>
//       <FormLabel color={"loginText"}>
//         Enter hotel name 3
//       </FormLabel>
//       <Input
//         bgColor={"#F1F2F6"}
//         style={{
//           border: isInvalid ? "1px solid red" : "green",
//         }}
//
//
//       />
//     </FormControl>
//   </Flex>
//   {/* 3 start rating end */}
//   <Divider mr={10} orientation="vertical" height="auto" />

//   {/* 4 start rating start */}
//   <Flex direction="column" marginRight={4}>
//     <FormControl>
//       <FormLabel>Select rating</FormLabel>
//       <Box
//         sx={{
//           borderRadius: "6px",
//           backgroundColor: "#F1F2F6",
//           padding: "10px",
//         }}
//       >
//         <Flex justifyContent={"space-between"}>
//           <Image
//             borderRadius="full"
//             src="/assets/icons/fourStar.svg"
//             alt="Four Star"
//           />
//           <Checkbox
//             name={`rating`}
//             {...register(`rating`, {
//               required: true,
//             })}
//             rules={{
//               required: "Please select a rating",
//             }}
//           ></Checkbox>
//         </Flex>
//       </Box>
//     </FormControl>
//     <FormControl my={4}>
//       <FormLabel color={"loginText"}>
//         Enter hotel name 1
//       </FormLabel>
//       <Input
//         bgColor={"#F1F2F6"}
//         style={{
//           border: isInvalid ? "1px solid red" : "green",
//         }}
//
//
//       />
//     </FormControl>
//     <FormControl my={4}>
//       <FormLabel color={"loginText"}>
//         Enter hotel name 2
//       </FormLabel>
//       <Input
//         bgColor={"#F1F2F6"}
//         style={{
//           border: isInvalid ? "1px solid red" : "green",
//         }}
//
//
//       />
//     </FormControl>
//     <FormControl my={4}>
//       <FormLabel color={"loginText"}>
//         Enter hotel name 3
//       </FormLabel>
//       <Input
//         bgColor={"#F1F2F6"}
//         style={{
//           border: isInvalid ? "1px solid red" : "green",
//         }}
//
//
//       />
//     </FormControl>
//   </Flex>
//   {/* 4 start rating end */}
//   <Divider mr={10} orientation="vertical" height="auto" />

//   {/* 5 start rating start */}
//   <Flex direction="column">
//     <FormControl>
//       <FormLabel>Select rating</FormLabel>
//       <Box
//         sx={{
//           borderRadius: "6px",
//           backgroundColor: "#F1F2F6",
//           padding: "10px",
//         }}
//       >
//         <Flex justifyContent={"space-between"}>
//           <Image
//             borderRadius="full"
//             src="/assets/icons/fiveStar.svg"
//             alt="Five Star"
//           />
//           <Checkbox
//             name={`rating`}
//             {...register(`rating`, {
//               required: true,
//             })}
//             rules={{
//               required: "Please select a rating",
//             }}
//           ></Checkbox>
//         </Flex>
//       </Box>
//     </FormControl>
//     <FormControl my={4}>
//       <FormLabel color={"loginText"}>
//         Enter hotel name 1
//       </FormLabel>
//       <Input
//         bgColor={"#F1F2F6"}
//         style={{
//           border: isInvalid ? "1px solid red" : "green",
//         }}
//
//
//       />
//     </FormControl>
//     <FormControl my={4}>
//       <FormLabel color={"loginText"}>
//         Enter hotel name 2
//       </FormLabel>
//       <Input
//         bgColor={"#F1F2F6"}
//         style={{
//           border: isInvalid ? "1px solid red" : "green",
//         }}
//
//
//       />
//     </FormControl>
//     <FormControl my={4}>
//       <FormLabel color={"loginText"}>
//         Enter hotel name 3
//       </FormLabel>
//       <Input
//         bgColor={"#F1F2F6"}
//         style={{
//           border: isInvalid ? "1px solid red" : "green",
//         }}
//
//
//       />
//     </FormControl>
//   </Flex>
//   {/* 5 start rating end */}
// </Flex>

// <Center>
//   <Button
//     type="submit"
//     marginTop="10px"
//     bgColor={"secondary"}
//     color={"white"}
//     w={"30%"}
//     my={10}
//     _hover={""}
//   >
//     {editingAccomodation ? "Update" : "Add"}
//   </Button>
// </Center>
// </form>

// import React from "react";
// import { Select } from "@chakra-ui/react";

// const YourComponent = () => {
//   const options = [
//     { value: "option1", label: "Option 1" },
//     { value: "option2", label: "Option 2" },
//     { value: "option3", label: "Option 3" }
//   ];

//   const defaultValue = "option2"; // Set the default value

//   return (
//     <Select value={defaultValue}>
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </Select>
//   );
// };

// export default YourComponent;
