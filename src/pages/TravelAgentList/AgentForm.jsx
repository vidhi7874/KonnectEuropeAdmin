import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import ButtonSecondary from "../../components/ButtonSecondary";
import ReactPhoneInput from "react-phone-input-2";
import { Country, State, City } from "country-state-city";
import "react-phone-input-2/lib/style.css";
import { upload } from "../../assets/icons";
import UploadFileCard from "../../components/UploadFileCard";
import { useAddAgentMutation } from "../../features/travelAgentApiSlice.js";
import ThrowErrors from "../../services/throwErrors";
// import { FiFile } from 'react-icons/fi'

const AgentForm = ({ onClose }) => {
  const inputStyle = {
    size: "md",
    placeHolder: { opacity: 1, color: "gray.500" },
  };

  const [countryState, setCountryState] = useState({});
  const [states, setStates] = useState({});
  const [citiesState, setCitiesState] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});

  // api calling  start

  const [addAgent, { error: addAgentErr, isLoading: addAgentLoading }] =
    useAddAgentMutation();

  // api calling  end
  const toast = useToast();
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const uploadFile = (e, fieldsDetails) => {
    console.log("fieldsDetails --> ", fieldsDetails);
    const { allowsSize, name } = fieldsDetails;
    const MAX_FILE_SIZE = allowsSize; // 2MB

    const file = e?.target?.files[0];
    const file_size = e?.target?.files[0]?.size;
    const file_name = e?.target?.files[0]?.name;

    const fileSizeKiloBytes = file_size / 1024;

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      // setErrorMsg("File size is greater than maximum limit");
      // setIsSuccess(false);
      // setUploadedFiles((prev) => ({
      //   ...prev,
      //   [name]: {
      //     err: "Upload only 2 MB size image",
      //   },
      // }));
      console.log("file size is big ", name);

      if (name === "agent_id_proof") {
        setError("agent_id_proof", {
          type: "filetype",
          message: "Upload only 2 MB size image",
        });
        //  setValue("agent_id_proof", "", { shouldValidate: true });

        setUploadedFiles((prev) => ({
          ...prev,
          [name]: {
            fileName: "",
            file: "",
          },
        }));
      }

      if (name === "company_id_proof") {
        setError("company_id_proof", {
          type: "filetype",
          message: "Upload only 2 MB size image",
        });
        setUploadedFiles((prev) => ({
          ...prev,
          [name]: {
            fileName: "",
            file: "",
          },
        }));
        // setValue("company_id_proof", "", { shouldValidate: true });
      }

      return;
    }

    clearErrors([name]);
    // setValue(name, file, { shouldValidate: false });

    console.log(
      "errors?.company_id_proof?.message --> ",
      errors?.company_id_proof?.message
    );

    setUploadedFiles((prev) => ({
      ...prev,
      [name]: {
        fileName: file_name,
        file: file,
      },
    }));

    // console.log("file --> ", files[0]);
  };

  console.log("error ----> ", errors);

  const trimInputValue = (value) => {
    console.log("value in trim fun --> ", value);
    return value.trim();
  };

  useEffect(() => {
    console.log("uploadedFiles --> ", uploadedFiles);
  }, [uploadedFiles]);

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
          value: stateCode,
          label: name,
        }));
        setCitiesState((perv) => ({ ...perv, allCities }));
        console.log("allCities ------> ", allCities);
      }
    } catch (error) {
      console.log("error ---> ", error);
    }
  };

  const form_field = {
    companyDetail: {
      company_name: {
        label: "Company Name*",
        componentType: "",
        placeHolder: "John Doe",
        name: "agency_name",
        type: "text",
        err: "Company name is require",
      },
      company_contact_no: {
        label: "Company Contact No*",
        componentType: "phoneInput",
        placeHolder: "Enter Company Contact No",
        name: "agency_contact",
        type: "text",
        err: "Company contact no is require",
      },
      company_reg_no: {
        label: "Company Reg. No*",
        componentType: "",
        placeHolder: "Enter Company Reg No",
        name: "agency_reg_no",
        type: "number",
        err: "Company reg no is require",
      },
      company_email: {
        label: "Company Email*",
        componentType: "",
        placeHolder: "Enter Company Email",
        name: "agency_email",
        type: "email",
        err: "Company email is require",
      },
    },

    /// ---
    concernPersonDetails: {
      firstName: {
        label: "First Name*",
        componentType: "",
        placeHolder: "Enter First Name",
        name: "first_name",
        type: "text",
        err: "First name is require",
      },
      lastName: {
        label: "Last Name*",
        componentType: "",
        placeHolder: "Enter Last Name",
        name: "last_name",
        type: "text",
        err: "Last name is require",
      },
      // contact_no: {
      //   label: "Contact No*",
      //   componentType: "phoneInput",
      //   placeHolder: "Enter Contact No",
      //   name: "contact_no",
      //   type: "text",
      //   err: "Contact no is require",
      // },

      email: {
        label: "Email *",
        componentType: "",
        placeHolder: "Enter Email",
        name: "email",
        type: "email",
        err: " Email is require",
      },

      phone: {
        label: "Phone*",
        componentType: "",
        placeHolder: "Enter Phone Number",
        name: "phone",
        type: "contact_no",
        err: " Phone Number is require",
      },

      password: {
        label: "Password*",
        componentType: "",
        placeHolder: "Enter password ",
        name: "password",
        type: "password",
        err: "Password is require",
      },

      company_address: {
        label: "Company Address*",
        componentType: "",
        placeHolder: "Enter Company Address",
        name: "address",
        type: "text",
        err: "Company email is require",
      },

      country: {
        label: "Country*",
        componentType: "",
        placeHolder: "Select Country",
        name: "country",
        type: "",
        err: "Country is require",
      },
      state: {
        label: "State*",
        componentType: "",
        placeHolder: "Select State",
        name: "state",
        type: "",
        err: "State is require",
      },
      city: {
        label: "City*",
        componentType: "",
        placeHolder: "Select City",
        name: "city",
        type: "",
        err: "City is require",
      },
      zip_code: {
        label: "Area/ZIP/ PIN code*",
        componentType: "",
        placeHolder: "Alpha Numeric / Space allowed",
        name: "zip_code",
        type: "text",
        err: "Zip code is require",
      },
    },
    // upload docs
    uploadDocuments: {
      agent_id_proof: {
        label: `Company registration copy/and
        tax registration proof`,
        componentType: "",
        placeHolder: "",
        name: "agent_id_proof",
        type: "file",
        fileName: "",
        fileSize: "",
        allowsSize: "2048", // size in MB
        err: "Agent id proof is require",
      },
      company_id_proof: {
        label: `Passport/ Drivers License/ and
        government issued ID`,
        componentType: "",
        placeHolder: "",
        name: "company_id_proof",
        type: "file",
        fileName: "",
        fileSize: "",
        allowsSize: "2048", // size in MB
        err: "Company id proof is require",
      },
    },
    // upload documents
  };

  const onSubmit = async (values) => {
    console.log("value --> ", values);
    console.log(" uploadedFiles --> ", uploadedFiles);

    const { uploadDocuments } = form_field;

    let formData = new FormData();

    // const trimmedData = Object.fromEntries(
    //   Object.entries(values).map(([key, value]) => [key, value.trim()])
    // );

    // console.log("trimmedData ----> ", trimmedData);

    for (const [key, value] of Object.entries(values)) {
      if (key === uploadDocuments?.[key]?.name) {
        formData.append(key, uploadedFiles?.[key]?.file);
      } else {
        formData.append(key, value);
      }
    }

    console.log("api calling ---> ");
    try {
      const res = await addAgent(formData).unwrap();
      console.log("res --> ", res);
      if (res.status === 200) {
        ThrowErrors({ msg: res.message }, 200);
        onClose({ isClose: true });
      }
    } catch (error) {
      console.log(error);

      for (let [key, value] of Object.values(error?.data?.data)) {
        console.log("key : ", key);
        console.log(" value: ", value);

        ThrowErrors(key, 400);
      }
    }
  };

  useEffect(() => {
    console.log({
      Country,
      State,
      City,
    });
    getCountries();
  }, []);

  useEffect(() => {
    getStates();
  }, [countryState]);

  useEffect(() => {
    getCity();
  }, [states]);

  console.log("errors -->", errors);

  const { companyDetail, concernPersonDetails, uploadDocuments } = form_field;

  const validateFiles = (value) => {
    if (value.length < 1) {
      return "Files is required";
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return "Max file size 10mb";
      }
    }
    return true;
  };

  return (
    <Box as="div" p="24px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h4" size="md" color="primary" mb="30px">
          Company Detail
        </Heading>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={6}
        >
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <CustomInput
              registerObj={{
                ...register(
                  companyDetail.company_name.name,

                  {
                    required: companyDetail.company_name.err,
                  }
                ),
              }}
              errors={errors}
              fieldDetails={companyDetail.company_name}
            />
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 1 }}>
            <ContactInput
              register={{
                ...register(companyDetail.company_contact_no.name, {
                  required: companyDetail.company_contact_no.err,
                }),
              }}
              errors={errors}
              name={companyDetail.company_contact_no.name}
              setValue={setValue}
              fieldDetails={companyDetail.company_contact_no}
            />
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <CustomInput
              registerObj={{
                ...register(companyDetail.company_reg_no.name, {
                  required: companyDetail.company_reg_no.err,
                }),
              }}
              errors={errors}
              fieldDetails={companyDetail.company_reg_no}
            />
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <CustomInput
              registerObj={{
                ...register(companyDetail.company_email.name, {
                  required: companyDetail.company_email.err,
                }),
              }}
              errors={errors}
              fieldDetails={companyDetail.company_email}
            />
          </GridItem>
        </Grid>

        {/* ###################### Concern Person Details start ################### */}

        <Box as="div" mt="30px">
          <Heading as="h4" size="md" color="primary" mb="30px">
            Concern Person Details
          </Heading>
        </Box>

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={6}
        >
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <CustomInput
              registerObj={{
                ...register(concernPersonDetails.firstName.name, {
                  required: concernPersonDetails.firstName.err,
                }),
              }}
              errors={errors}
              fieldDetails={concernPersonDetails.firstName}
            />
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <CustomInput
              registerObj={{
                ...register(concernPersonDetails.lastName.name, {
                  required: concernPersonDetails.lastName.err,
                }),
              }}
              errors={errors}
              fieldDetails={concernPersonDetails.lastName}
            />
          </GridItem>
          {/* <GridItem colSpan={{ base: 1, md: 1 }}>
            <ContactInput
              register={{
                ...register(concernPersonDetails.contact_no.name, {
                  required: concernPersonDetails.contact_no.err,
                }),
              }}
              errors={errors}
              name={concernPersonDetails.contact_no.name}
              setValue={setValue}
              fieldDetails={concernPersonDetails.contact_no}
            />
          </GridItem> */}

          <GridItem colSpan={{ base: 1, md: 1 }}>
            <CustomInput
              registerObj={{
                ...register(concernPersonDetails.email.name, {
                  required: concernPersonDetails.email.err,
                }),
              }}
              errors={errors}
              fieldDetails={concernPersonDetails.email}
            />
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <GridItem colSpan={{ base: 1, md: 1 }}>
              <ContactInput
                register={{
                  ...register(concernPersonDetails.phone.name, {
                    required: concernPersonDetails.phone.err,
                  }),
                }}
                errors={errors}
                name={concernPersonDetails.phone.name}
                setValue={setValue}
                fieldDetails={concernPersonDetails.phone}
              />
            </GridItem>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <GridItem colSpan={{ base: 1, md: 1 }}>
              <CustomInput
                registerObj={{
                  ...register(concernPersonDetails.password.name, {
                    required: concernPersonDetails.password.err,
                  }),
                }}
                errors={errors}
                fieldDetails={concernPersonDetails.password}
              />
            </GridItem>
          </GridItem>
        </Grid>

        <Grid
          mt="15px"
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(1, 1fr)" }}
        >
          {/* <GridItem colSpan={{ base: 1, md: 1 }}>
            <CustomInput
              registerObj={{
                ...register(concernPersonDetails.company_email.name, {
                  required: concernPersonDetails.company_email.err,
                }),
              }}
              errors={errors}
              fieldDetails={concernPersonDetails.company_email}
            />
          </GridItem> */}
        </Grid>

        <Grid
          mt="15px"
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(1, 1fr)" }}
        >
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <CustomTextArea
              registerObj={{
                ...register(concernPersonDetails.company_address.name, {
                  required: concernPersonDetails.company_address.err,
                }),
              }}
              resize="Vertical"
              errors={errors}
              fieldDetails={concernPersonDetails.company_address}
            />
          </GridItem>
        </Grid>

        <Grid
          mt="15px"
          gap="6"
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 4fr)" }}
        >
          {/* country */}
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <FormControl
              color="#A1A9C3"
              isInvalid={errors?.[concernPersonDetails?.country.name]}
            >
              <FormLabel m="2px" htmlFor={concernPersonDetails?.country.name}>
                {concernPersonDetails?.country.label}
              </FormLabel>
              <Select
                size="lg"
                bg="#F1F2F6"
                {...register(concernPersonDetails?.country.name, {
                  required: concernPersonDetails.country.err,
                })}
                placeholder={concernPersonDetails?.country.placeHolder}
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
                  setValue(concernPersonDetails.state.name, "", {
                    shouldValidate: false,
                  });
                  setValue(concernPersonDetails.city.name, "", {
                    shouldValidate: false,
                  });
                  setValue(
                    concernPersonDetails?.country.name,
                    el.target.value,
                    {
                      shouldValidate: true,
                    }
                  );
                }}
              >
                {countryState?.allCountries &&
                  countryState?.allCountries.map((con) => (
                    <option name={con.label} value={con.value}>
                      {con.label}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </GridItem>

          {/* state */}
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <FormControl
              color="#A1A9C3"
              isInvalid={errors?.[concernPersonDetails?.state.name]}
            >
              <FormLabel m="2px" htmlFor={concernPersonDetails?.state.name}>
                {concernPersonDetails?.state.label}
              </FormLabel>
              <Select
                size="lg"
                bg="#F1F2F6"
                name={concernPersonDetails.state.name}
                {...register(concernPersonDetails.state.name, {
                  required: concernPersonDetails.state.err,
                })}
                placeholder={concernPersonDetails?.state.placeHolder}
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
                  setValue(concernPersonDetails.city.name, "", {
                    shouldValidate: false,
                  });
                  setValue(concernPersonDetails.state.name, el.target.value, {
                    shouldValidate: true,
                  });
                }}
              >
                {states.allStates &&
                  states.allStates.map((state) => (
                    <option name={state.label} value={state.value}>
                      {state.label}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </GridItem>

          {/* cites */}
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <FormControl
              color="#A1A9C3"
              isInvalid={errors?.[concernPersonDetails?.city.name]}
            >
              <FormLabel m="2px" htmlFor={concernPersonDetails?.city.name}>
                {concernPersonDetails?.city.label}
              </FormLabel>
              <Select
                size="lg"
                bg="#F1F2F6"
                name={concernPersonDetails.city.name}
                {...register(concernPersonDetails.city.name, {
                  required: concernPersonDetails.city.err,
                })}
                placeholder={concernPersonDetails?.city.placeHolder}
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
                  setValue(concernPersonDetails?.city.name, el.target.value, {
                    shouldValidate: true,
                  });
                }}
              >
                {citiesState?.allCities &&
                  citiesState?.allCities.map((cite) => (
                    <option name={cite.label} value={cite.value}>
                      {cite.label}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </GridItem>

          {/* Zip code */}
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <CustomInput
              registerObj={{
                ...register(concernPersonDetails.zip_code.name, {
                  required: concernPersonDetails.zip_code.err,
                }),
              }}
              errors={errors}
              name={concernPersonDetails.zip_code.name}
              setValue={setValue}
              fieldDetails={concernPersonDetails.zip_code}
            />
          </GridItem>
        </Grid>

        <Box mt="25px">
          <Text textAlign="center" fontSize="3xl" color="primary">
            Upload Documents
          </Text>
        </Box>

        <Flex
          mt="35px"
          direction={{ base: "column", md: "row" }}
          gap="12"
          justify={{
            base: "center",
            lg: "center",
          }}
        >
          <UploadFileCard
            icon={upload}
            uploadedFiles={uploadedFiles}
            uploadFile={(e, fileDetails) => uploadFile(e, fileDetails)}
            fieldObj={uploadDocuments}
            register={{
              ...register(uploadDocuments.agent_id_proof.name, {
                required: uploadDocuments.agent_id_proof.err,
              }),
            }}
            errors={errors}
            name={uploadDocuments.agent_id_proof.name}
            setValue={setValue}
          />

          <UploadFileCard
            icon={upload}
            uploadedFiles={uploadedFiles}
            uploadFile={(e, fileDetails) => uploadFile(e, fileDetails)}
            fieldObj={uploadDocuments}
            register={{
              ...register(uploadDocuments.company_id_proof.name, {
                required: uploadDocuments.company_id_proof.err,
              }),
            }}
            errors={errors}
            name={uploadDocuments.company_id_proof.name}
            setValue={setValue}
          />
        </Flex>

        {/* ###################### Concern Person Details end ################### */}

        <Box as="div" display="flex" justifyContent="center" mt="13px">
          <ButtonSecondary
            title="Submit Request"
            mt={4}
            bg="secondary"
            color="white"
            isLoading={addAgentLoading}
            onClick={() => false}
            w="60"
            h="60px"
            px="8px"
            type="submit"
          />
        </Box>
      </form>
      {/* leftIcon={<Icon as={FiFile} />} */}
    </Box>
  );
};

export default AgentForm;

const ContactInput = ({
  fieldDetails,
  register,
  name,
  required,
  errors,
  setValue,
}) => {
  const [phone, setPhone] = useState({});
  const [agencyContact, setAgencyContact] = useState({});

  const handleOnChangePhone = (...args) => {
    console.log(args);
    setAgencyContact((prev) => ({ ...prev, code: args[3], value: args[3] }));
    setValue(name, args[3], { shouldValidate: true });
  };

  return (
    <Box>
      <FormControl color="#A1A9C3" isInvalid={errors?.[fieldDetails?.name]}>
        <FormLabel m="2px" htmlFor={fieldDetails?.name}>
          {fieldDetails?.label}
        </FormLabel>

        <ReactPhoneInput
          value={agencyContact?.value}
          name={name}
          {...register}
          enableSearch={true}
          containerClass="mt-4"
          inputStyle={{
            backgroundColor: "#F1F2F6",
            color: "#000000cc",
            height: "49px",
            marginTop: "10px",
            width: "100%",
            margin: "4px",
            border: `${errors?.[name] ? "1px solid red" : ""}`,
          }}
          buttonStyle={{
            backgroundColor: "#F1F2F6",
            height: "49px",
            borderRadius: "8px 0px 0px 8px",
            border: `${errors?.[name] ? "1px solid red" : ""}`,
          }}
          onChange={handleOnChangePhone}
        />
      </FormControl>
    </Box>
  );
};

// daynamic input

const CustomInput = ({ registerObj, errors, fieldDetails }) => {
  return (
    <FormControl color="#A1A9C3" isInvalid={errors?.[fieldDetails?.name]}>
      <FormLabel m="2px" htmlFor={fieldDetails?.name}>
        {fieldDetails?.label}
      </FormLabel>
      <Input
        // id="name"
        size="lg"
        bg="#F1F2F6"
        placeholder={fieldDetails?.placeHolder}
        type={fieldDetails?.type}
        color="blackAlpha.800"
        _placeholder={{
          opacity: 1,
          color: "gray.500",
          fontSize: "15px",
        }}
        errorBorderColor="red.400"
        {...registerObj}
      />

      {/* <Box h="8">
        <FormErrorMessage borderColor="primay" color="error">
          {errors?.[field.name]?.message}
        </FormErrorMessage>
      </Box> */}
    </FormControl>
  );
};

const CustomTextArea = ({ registerObj, errors, fieldDetails, resize }) => {
  return (
    <FormControl color="#A1A9C3" isInvalid={errors?.[fieldDetails?.name]}>
      <FormLabel m="2px" htmlFor={fieldDetails?.name}>
        {fieldDetails?.label}
      </FormLabel>
      <Textarea
        // id="name"
        size="lg"
        bg="#F1F2F6"
        placeholder={fieldDetails?.placeHolder}
        type={fieldDetails?.type}
        color="blackAlpha.800"
        resize={resize}
        _placeholder={{
          opacity: 1,
          color: "gray.500",
          fontSize: "15px",
        }}
        errorBorderColor="red.400"
        {...registerObj}
      />

      {/* <Box h="8">
        <FormErrorMessage borderColor="primay" color="error">
          {errors?.[field.name]?.message}
        </FormErrorMessage>
      </Box> */}
    </FormControl>
  );
};

const FileUploadCard = (props) => {
  const { register, accept, multiple, children } = props;
  const inputRef = (useRef < HTMLInputElement) | (null > null);
  const { ref, ...rest } = register;

  const handleClick = () => inputRef?.current?.click();

  return (
    <>
      <Box position="relative" border="1px" height="100%" width="100%">
        <Box
          // position="absolute"
          top="0"
          left="0"
          height="100%"
          width="100%"
          display="flex"
          flexDirection="column"
          //border="1px"
        >
          <Stack
            height="100%"
            width="100%"
            display="flex"
            alignItems="center"
            justify="center"
            spacing="4"
            //border="1px"
          >
            <Box height="16" width="12" position="relative">
              IMG
            </Box>
            <Stack p="8" textAlign="center" spacing="1">
              <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                Drop images here
              </Heading>
              <Text fontWeight="light">or click to upload</Text>
            </Stack>
          </Stack>
        </Box>
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

          // onDragEnter={startAnimation}
          // onDragLeave={stopAnimation}
        />
      </Box>
    </>
  );
};

const CustomSelect = () => {
  return (
    <Select placeholder="Select option">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  );
};
