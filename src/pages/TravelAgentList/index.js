import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Input,
  Spacer,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  Icon,
  Image,
  Editable,
  EditablePreview,
  EditableInput,
  Checkbox,
  FormControl,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Stack,
  SlideFade,
  useToast,
  Center,
} from "@chakra-ui/react";

import { useDebouncedCallback } from "use-debounce";
import CustomTable from "../../components/common/Table/CustomTable";
import CustomModal from "../../components/common/Modal/CustomModal";
import AgentForm from "./AgentForm";

import {
  useAddAgentMutation,
  useAllAgentsMutation,
  useEditAgentMutation,
  useGetAgentByIdMutation,
} from "../../features/travelAgentApiSlice.js";
import ButtonSecondary from "../../components/ButtonSecondary";
import { eye, dawonload, uploadCloud } from "../../assets/icons";
import CustomInput from "../../components/CustomInput";
import { useForm } from "react-hook-form";
import CustomTextArea from "../../components/CustomTextArea";
import Loader from "../../components/Loader";

const TravelAgentList = () => {
  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    pagination: false,
    // booking_status: "pending",
  });

  const [totalRows, setTotalRows] = useState(0);
  const [travelAgentData, setTravelAgentData] = React.useState([]);
  const [allTravelAgentData, setAllTravelAgentData] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenShowDetailsModal, setIsOpenShowDetailsModal] = React.useState({
    show: false,
    isClose: false,
  });

  const [allAgents, { error: errGetAgent, isLoading: getAgentIsLoading }] =
    useAllAgentsMutation();

  const showAgentDetails = (row) => {
    let agent_id = row?.id;
    console.log("id is --> ", row);
    console.log("row details --> ", row);
    setIsOpenShowDetailsModal((prev) => ({
      ...prev,
      show: true,
      isClose: false,
      id: agent_id,
    }));
  };

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const columns = [
    {
      name: "Agent id",
      selector: "id",
      sortable: true,
      cell: (row) => (
        <Badge
          cursor="pointer"
          color="blue.400"
          onClick={() => showAgentDetails(row)}
        >
          {row.id.toString().toUpperCase()}
        </Badge>
      ),
    },
    {
      name: "Company name",
      selector: "agency_name",
      sortable: true,
      cell: (row) => row.agency_name || "N/A",
    },
    {
      name: "City",
      selector: "city",
      sortable: true,
      cell: (row) => row.city || "N/A",
    },
    {
      name: "Sales person",
      selector: "first_name",
      sortable: true,
      cell: (row) => row.first_name || "N/A",
    },
    {
      name: "Status",
      selector: "user_oto.status",
      sortable: true,
      cell: (row) => (
        <Badge
          px="5"
          py="3"
          borderRadius={7}
          bg={
            row.user_oto.status === "active"
              ? "green.100"
              : row.user_oto.status === "pending"
              ? "orange.200"
              : row.user_oto.status === "deactive"
              ? "red.100"
              : ""
          }
          color={
            row.user_oto.status === "active"
              ? "green.500"
              : row.user_oto.status === "pending"
              ? "orange.500"
              : row.user_oto.status === "deactive"
              ? "red.500"
              : ""
          }
        >
          {row.user_oto.status || "N/A"}
        </Badge>
      ),
    },
  ];

  const debounced = useDebouncedCallback((value) => {
    setPagination((prev) => ({ ...prev, search: value }));
  }, 800);

  const onSearchFilter = (text) => {
    console.log("testing abc 123 ---->", text);
    debounced(text);
  };

  const onTabFilter = (val) => {
    console.log("onTabFilter called --->", travelAgentData, val);

    //debounced(text);
    console.log("el status ==", val);
    let D = [];

    D =
      val !== "all"
        ? allTravelAgentData.filter((el) => el.user_oto.status == val)
        : allTravelAgentData;

    console.log("dddd --> ", D);
    setTravelAgentData(D);
  };

  const tableFilterBtnList = [
    {
      name: "Activated Agents",
      title: "active",
      totalCount: allTravelAgentData.filter(
        (item) => item.user_oto.status === "active"
      ).length,
    },
    {
      name: "Approval Pending",
      title: "pending",
      totalCount: allTravelAgentData.filter(
        (item) => item.user_oto.status === "pending"
      ).length,
    },
    {
      name: "Deactivated Pending",
      title: "deactive",
      totalCount: allTravelAgentData.filter(
        (item) => item.user_oto.status === "deactive"
      ).length,
    },
    {
      name: "All Agents",
      title: "all",
      totalCount: allTravelAgentData.length,
    },
  ];

  const fetchAllTravelAgentList = async () => {
    try {
      // setTravelAgentData(travelAgentData || []);
      const res = await allAgents(pagination).unwrap();
      //  const res = await getAllVouchers(pagination).unwrap();
      console.log("api res --> ", res);
      if (res.results) {
        setAllTravelAgentData(res.results);
        setTravelAgentData(res.results || []);
        setTotalRows(res.total);
        // setTableData(res.results);

        //  setPagination
      }
    } catch (err) {
      console.log(err);
      // ThrowErrors({}, error?.status);
    }
  };

  const addAgent = () => {
    setIsOpen(true);
  };

  const onClose = (obj) => {
    if (obj?.isClose) {
      setIsOpen(false);
      fetchAllTravelAgentList();
    } else {
      setIsOpen(false);
    }
  };
  // Function to handle pagination changes
  const handlePaginationChange = ({ page, perPage }) => {
    const skip = (page - 1) * perPage;
    setPagination((prevPagination) => ({
      ...prevPagination,
      first: perPage,
      skip: skip,
    }));
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log("handlePerRowsChange --->", newPerPage, page);
    //setPagination((prev) => ({ ...prev, limit: newPerPage, pagination: true }));
  };

  const handlePageChange = (e) => {
    console.log("handlePageChange --->", e);
    // setPagination((prev) => ({ ...prev, page: e, pagination: true }));
  };

  useEffect(() => {
    fetchAllTravelAgentList();
  }, [pagination]);

  useEffect(() => {
    if (isOpenShowDetailsModal?.isClose) {
      fetchAllTravelAgentList();
    }
  }, [isOpenShowDetailsModal]);

  return (
    <Box
      borderRadius={25}
      m={{ base: "90px 0px", md: "112px 0px", lg: "112px 0px" }}
      // h="calc(100vh - 0vh)"
      w="100%"
      p={6}
      bg="white"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        // justify={{
        //   base: "flex-start",
        //   md: "space-between",
        //   lg: "space-between",
        // }}
        minWidth="max-content"
        // alignItems="center"
        gap="2"
      >
        <Box p="2">
          <Text
            fontSize={{ base: "30px", md: "40px", lg: "25px" }}
            as="b"
            color="primary"
            isTruncated
          >
            Travel Agents
          </Text>
        </Box>
        <Spacer />
        <ButtonGroup
          gap="2"
          // border="1px"
          display={{ base: "flex" }}
          justifyContent="flex-end"
        >
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button
              borderRadius={15}
              p={6}
              color="#ADB8CC"
              onClick={() => addAgent()}
            >
              {" "}
              + Add Agent
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </Flex>

      {/* table */}

      <Box mt="16">
        <CustomTable
          data={travelAgentData}
          tableFilterBtnList={tableFilterBtnList}
          isLoading={getAgentIsLoading}
          columns={columns}
          onTabFilter={onTabFilter}
          onSearchFilter={onSearchFilter}
          pagination
          paginationServer
          // paginationTotalRows={pagination.total}
          paginationPerPage={pagination.first}
          total={totalRows}
          paginationDefaultPage={
            Math.ceil(pagination.skip / pagination.first) + 1
          }
          setPagination={setPagination}
          onChangePage={handlePaginationChange}
          onChangeRowsPerPage={handlePerRowsChange}
        />
      </Box>
      {/* const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] */}
      {isOpen && (
        <CustomModal
          title="Add New Agent"
          isCentered="true"
          closeOnOverlayClick="true"
          scrollBehavior="inside"
          motionPreset="slideInBottom"
          size="6xl"
          textAlign="center"
          isOpen={isOpen}
          onClose={() => onClose()}
        >
          <AgentForm onClose={(obj) => onClose(obj)} />
        </CustomModal>
      )}

      {isOpenShowDetailsModal?.show && (
        <CustomModal
          title=""
          isCentered="true"
          closeOnOverlayClick="true"
          scrollBehavior="inside"
          motionPreset="slideInBottom"
          size="3xl"
          textAlign="center"
          isOpen={isOpenShowDetailsModal?.show}
          onClose={() =>
            setIsOpenShowDetailsModal((prev) => ({ ...prev, show: false }))
          }
        >
          <EditAgentDetailsModal
            id={isOpenShowDetailsModal.id}
            // details={agentDetails}
            errors={errors}
            setValue={setValue}
            register={register}
            onClose={() =>
              setIsOpenShowDetailsModal((prev) => ({
                ...prev,
                isClose: true,
                show: false,
              }))
            }
          />
        </CustomModal>
      )}
    </Box>
  );
};

export default TravelAgentList;

const EditAgentDetailsModal = ({ details, id, onClose }) => {
  const [agentDetailsObj, setAgentDetailsObj] = useState({});
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const toast = useToast();

  const [file, setFile] = useState({
    agent_id_proof: {
      name: "",
      file: "",
    },
    company_id_proof: {
      name: "",
      file: "",
    },
  });

  const [showNotes, setShowNotes] = useState(false);

  // api calling  start

  const [editAgent, { error: editAgentErr, isLoading: editAgentLoading }] =
    useEditAgentMutation();

  const [
    getAgentById,
    { error: getAgentDetailsErr, isLoading: getAgentDetailsLoading },
  ] = useGetAgentByIdMutation();

  // api calling  end

  const handleChange = (e) => {
    const name = e?.target?.name;

    const fileName = e?.target?.files[0]?.name;
    const file_obj = e?.target?.files[0];
    console.log("name file ===>", { name, file });
    setFile((prev) => ({
      ...prev,
      [name]: {
        name: fileName,
        file: file_obj,
        objectURL: URL?.createObjectURL(file_obj),
        //file: URL?.createObjectURL(file),
      },
    }));
  };

  const getAgentDetails = async () => {
    try {
      const res = await getAgentById(id).unwrap();
      console.log("getAgentDetails api res --> ", res);
      if (res.status === 200) {
        setAgentDetailsObj(res.data);
        for (const [key, value] of Object.entries(res.data)) {
          console.log(key, value);
          setValue(key, value, { shouldValidate: true });

          if (key === "agent_id_proof" || key === "company_id_proof") {
            setValue(key, value, { shouldValidate: true });
            setFile({
              agent_id_proof: {
                name: "agent_id_proof",
                file: "",
                objectURL: `${process.env.REACT_APP_API_BASE_URL_LOCAL}${value}`,
              },
              company_id_proof: {
                name: "company_id_proof",
                file: "",
                objectURL: `${process.env.REACT_APP_API_BASE_URL_LOCAL}${value}`,
              },
            });
          }
        }

        for (const [key, value] of Object.entries(res.data.user_oto)) {
          setValue(key, value, { shouldValidate: true });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("file --> ", file);
  }, [file]);

  const [isEdit, setIsEdit] = useState(false);
  const onEdit = (e) => {
    e?.preventDefault();
    console.log("on edit errors --> ", errors);
    setIsEdit(true);
  };

  const onSubmit = async (data) => {
    let err = JSON.stringify(errors) === "{}";
    console.log("data--> ", data);

    console.log("data--> ", errors);
    if (err && data && isEdit) {
      console.log("submit ", err, data);

      let formData = new FormData();

      const obj = {
        agent_id_proof: "agent_id_proof",
        company_id_proof: "company_id_proof",
      };

      for (const [key, value] of Object.entries(data)) {
        if (key === obj?.[key]) {
          formData.append(key, file?.[key]?.file);
        } else {
          formData.append(key, value);
        }
      }

      console.log("agent_id --> ", id);

      const dataObj = {
        id: id,
        formData: formData,
      };

      try {
        const res = await editAgent(dataObj).unwrap();
        console.log("res --> ", res);
        if (res.status === 200) {
          onClose();
        }
      } catch (error) {
        console.log(error);
        console.log("editAgentErr ====> ", editAgentErr);
        toast({
          title: "testing",
          status: "error",
          position: "top-right",
          isClosable: true,
          variant: "subtle",
          duration: 3000,
        });
      }

      setIsEdit(false);
    } else {
      // setIsEdit(true);
      console.log("approved ====> ");
    }
  };

  const onError = (err) => {
    console.log("on err ---> ", err);
  };

  useEffect(() => {
    console.log(agentDetailsObj);
  }, [agentDetailsObj]);

  useEffect(() => {
    getAgentDetails();
  }, []);

  console.log("errors ---> ", errors);

  return (
    <Box>
      {/* <form handleSubmit((formData) => onSubmit(formData))  > */}
      {getAgentDetailsLoading && (
        <Box height={100}>
          <Center>
            <Loader />
          </Center>
        </Box>
      )}

      {!getAgentDetailsLoading && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Flex
            direction={{ base: "row" }}
            gap="2"
            mt="5"
            align={{ base: "center" }}
            justify={{
              base: "center",
              lg: "space-between",
            }}
          >
            <Heading as="h6" color="primary" fontSize={23}>
              Agency Details : {isEdit ? "true" : "false"}
            </Heading>

            <Box display="flex" gap="2">
              {isEdit && (
                <ButtonSecondary
                  title="Update"
                  mt={0}
                  bg="secondary"
                  isDisabled={!isEdit}
                  color="white"
                  isLoading={editAgentLoading}
                  // onClick={() =>
                  //   handleSubmit((formData) =>
                  //     console.log("handle submit =======> ", formData)
                  //   )
                  // }
                  w="95px"
                  h="30px"
                  py="5"
                  px="20px"
                  type="submit"
                />
              )}

              {!isEdit && (
                <ButtonSecondary
                  title="Edit"
                  mt={0}
                  bg="secondary"
                  color="white"
                  isLoading={false}
                  isDisabled={isEdit}
                  onClick={(e) => onEdit(e)}
                  //onClick={(e) => onSubmit(e)}
                  w="95px"
                  h="30px"
                  py="5"
                  px="20px"
                  type="button"
                />
              )}
            </Box>
          </Flex>

          <Box>
            <Box mt="10" px="1">
              <Text
                bg="bgLight"
                p="3"
                fontWeight={500}
                color="secondary"
                borderRadius={8}
              >
                Travel Agent Details
              </Text>
              <Box>
                <TableContainer variant="simple">
                  <Table>
                    <Tbody>
                      <Tr>
                        <Th>Agency name</Th>
                        <Th> : </Th>
                        <Th>
                          {isEdit ? (
                            <FormControl
                              color="#A1A9C3"
                              isInvalid={errors?.agency_name}
                            >
                              <Input
                                size={"sm"}
                                bg="#F1F2F6"
                                type="text"
                                //  isDisabled={isEdit}
                                focusBorderColor=""
                                color="blackAlpha.800"
                                {...register("agency_name", {
                                  required: "Agency name is required",
                                })}
                                onChange={(e) => console.log(e.target.value)}
                                errorBorderColor="red.400"
                              />
                            </FormControl>
                          ) : (
                            <Text>{getValues("agency_name")}</Text>
                          )}
                        </Th>
                      </Tr>
                      <Tr>
                        <Th>Company Contact No </Th>
                        <Th> : </Th>
                        <Th>
                          {isEdit ? (
                            <FormControl
                              color="#A1A9C3"
                              isInvalid={errors?.agency_contact}
                            >
                              <Input
                                size={"sm"}
                                bg="#F1F2F6"
                                type="text"
                                //  isDisabled={isEdit}
                                color="blackAlpha.800"
                                //focusBorderColor="white"
                                {...register("agency_contact", {
                                  required: "Company contact no is required",
                                })}
                                onChange={(e) => console.log(e.target.value)}
                                errorBorderColor="red.400"
                              />
                            </FormControl>
                          ) : (
                            <Text>{getValues("agency_contact")}</Text>
                          )}
                        </Th>
                      </Tr>
                      <Tr>
                        <Th>Company Reg. No*</Th>
                        <Th> : </Th>
                        <Th>
                          {isEdit ? (
                            <FormControl
                              color="#A1A9C3"
                              isInvalid={errors?.agency_reg_no}
                            >
                              <Input
                                size={"sm"}
                                bg="#F1F2F6"
                                type="text"
                                //  isDisabled={isEdit}
                                color="blackAlpha.800"
                                {...register("agency_reg_no", {
                                  required: "Agency reg no is required",
                                })}
                                onChange={(e) => console.log(e.target.value)}
                                errorBorderColor="red.400"
                              />
                            </FormControl>
                          ) : (
                            <Text>{getValues("agency_reg_no")}</Text>
                          )}
                        </Th>
                      </Tr>
                      <Tr>
                        <Th>Company Email</Th>
                        <Th> : </Th>
                        <Th>
                          {isEdit ? (
                            <FormControl
                              color="#A1A9C3"
                              isInvalid={errors?.agency_email}
                            >
                              <Input
                                size={"sm"}
                                bg="#F1F2F6"
                                type="text"
                                //  isDisabled={isEdit}
                                color="blackAlpha.800"
                                {...register("agency_email", {
                                  required: "Company email is required",
                                })}
                                onChange={(e) => console.log(e.target.value)}
                                errorBorderColor="red.400"
                              />
                            </FormControl>
                          ) : (
                            <Text>{getValues("agency_email")}</Text>
                          )}
                        </Th>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>

            {/* Travel Agent Contact  start*/}
            <Box mt="10" px="1">
              <Text
                bg="bgLight"
                p="3"
                fontWeight={500}
                color="secondary"
                borderRadius={8}
              >
                Travel Agent Details
              </Text>
              <Box>
                <TableContainer variant="simple">
                  <Table>
                    <Tbody>
                      <Tr>
                        <Th>First Name</Th>
                        <Th> : </Th>
                        <Th>
                          {isEdit ? (
                            <FormControl
                              color="#A1A9C3"
                              isInvalid={errors?.first_name}
                            >
                              <Input
                                size={"sm"}
                                bg="#F1F2F6"
                                type="text"
                                //  isDisabled={isEdit}
                                focusBorderColor=""
                                color="blackAlpha.800"
                                {...register("first_name", {
                                  required: "First name is required",
                                })}
                                onChange={(e) => console.log(e.target.value)}
                                errorBorderColor="red.400"
                              />
                            </FormControl>
                          ) : (
                            <Text>{getValues("first_name")}</Text>
                          )}
                        </Th>
                      </Tr>
                      <Tr>
                        <Th>Last Name </Th>
                        <Th> : </Th>
                        <Th>
                          {isEdit ? (
                            <FormControl
                              color="#A1A9C3"
                              isInvalid={errors?.last_name}
                            >
                              <Input
                                size={"sm"}
                                bg="#F1F2F6"
                                type="text"
                                //  isDisabled={isEdit}
                                color="blackAlpha.800"
                                //focusBorderColor="white"
                                {...register("last_name", {
                                  required: "Last name is required",
                                })}
                                onChange={(e) => console.log(e.target.value)}
                                errorBorderColor="red.400"
                              />
                            </FormControl>
                          ) : (
                            <Text>{getValues("last_name")}</Text>
                          )}
                        </Th>
                      </Tr>
                      <Tr>
                        <Th>Email</Th>
                        <Th> : </Th>
                        <Th>
                          {isEdit ? (
                            <FormControl
                              color="#A1A9C3"
                              isInvalid={errors?.city}
                            >
                              <Input
                                size={"sm"}
                                bg="#F1F2F6"
                                type="text"
                                //  isDisabled={isEdit}
                                color="blackAlpha.800"
                                {...register("email", {
                                  required: "Email is required",
                                })}
                                onChange={(e) => console.log(e.target.value)}
                                errorBorderColor="red.400"
                              />
                            </FormControl>
                          ) : (
                            <Text>{getValues("email")}</Text>
                          )}
                        </Th>
                      </Tr>
                      <Tr>
                        <Th>Phone</Th>
                        <Th> : </Th>
                        <Th>
                          {isEdit ? (
                            <FormControl
                              color="#A1A9C3"
                              isInvalid={errors?.phone}
                            >
                              <Input
                                size={"sm"}
                                bg="#F1F2F6"
                                type="text"
                                //  isDisabled={isEdit}
                                color="blackAlpha.800"
                                {...register("phone", {
                                  required: "Phone Number is require",
                                })}
                                onChange={(e) => console.log(e.target.value)}
                                errorBorderColor="red.400"
                              />
                            </FormControl>
                          ) : (
                            <Text>{getValues("phone")}</Text>
                          )}
                        </Th>
                      </Tr>

                      {/* <Tr>
                        <Th>Password</Th>
                        <Th> : </Th>
                        <Th>
                          {isEdit ? (
                            <FormControl
                              color="#A1A9C3"
                              isInvalid={errors?.password}
                            >
                              <Input
                                size={"sm"}
                                bg="#F1F2F6"
                                type="text"
                                //  isDisabled={isEdit}
                                color="blackAlpha.800"
                                {...register("password", {
                                  required: "Password is required",
                                })}
                                onChange={(e) => console.log(e.target.value)}
                                errorBorderColor="red.400"
                              />
                            </FormControl>
                          ) : (
                            <Text>{getValues("password")}</Text>
                          )}
                        </Th>
                      </Tr> */}

                      <Tr>
                        <Th>Company Address</Th>
                        <Th> : </Th>
                        <Th>
                          {isEdit ? (
                            <FormControl
                              color="#A1A9C3"
                              isInvalid={errors?.address}
                            >
                              <Input
                                size={"sm"}
                                bg="#F1F2F6"
                                type="text"
                                //  isDisabled={isEdit}
                                color="blackAlpha.800"
                                {...register("address", {
                                  required: "Company email is required",
                                })}
                                onChange={(e) => console.log(e.target.value)}
                                errorBorderColor="red.400"
                              />
                            </FormControl>
                          ) : (
                            <Text>{getValues("address")}</Text>
                          )}
                        </Th>
                      </Tr>

                      <Tr>
                        <Th>Country</Th>
                        <Th> : </Th>
                        <Th>
                          {isEdit ? (
                            <FormControl
                              color="#A1A9C3"
                              isInvalid={errors?.country}
                            >
                              <Input
                                size={"sm"}
                                bg="#F1F2F6"
                                type="text"
                                //  isDisabled={isEdit}
                                color="blackAlpha.800"
                                {...register("country", {
                                  required: "Country is required",
                                })}
                                onChange={(e) => console.log(e.target.value)}
                                errorBorderColor="red.400"
                              />
                            </FormControl>
                          ) : (
                            <Text>{getValues("country")}</Text>
                          )}
                        </Th>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
            {/* Travel Agent Contact end */}
          </Box>

          {/* documents start */}
          <Box mt="10" px="1">
            <Text
              bg="bgLight"
              p="3"
              fontWeight={500}
              color="secondary"
              borderRadius={8}
            >
              Documents
            </Text>

            <Box mt="3" p="3">
              <SlideFade in={true} offsetY="20px">
                <Flex
                  sx={{
                    border: "1px dashed #0090C5",
                  }}
                  align={{ base: "center" }}
                  justify={{
                    base: "center",
                    lg: "space-between",
                  }}
                  borderWidth="2"
                  borderRadius="5"
                  py="1"
                  px="4"
                >
                  <Text color="primary"> Agent Id Proof </Text>
                  <Box display={{ base: "flex" }} alignItems="center">
                    <Text p="2" cursor="pointer">
                      <ShowImg
                        icon={eye}
                        //onLoad="true"
                        name={file?.agent_id_proof?.name}
                        img={file?.agent_id_proof?.objectURL}
                      />
                    </Text>
                    <Text p="2" cursor="pointer">
                      <Image src={dawonload} />
                    </Text>
                    {isEdit && (
                      <Box position="relative">
                        <Text p="2" cursor="pointer">
                          <Image src={uploadCloud} />
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
                            name="agent_id_proof"
                            {...register("agent_id_proof", {
                              required: false,
                            })}
                            onChange={(e) => handleChange(e)}
                          />
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Flex>
              </SlideFade>
              <SlideFade in={true} offsetY="20px">
                <Flex
                  sx={{
                    border: "1px dashed #0090C5",
                  }}
                  align={{ base: "center" }}
                  justify={{
                    base: "center",
                    lg: "space-between",
                  }}
                  borderWidth="2px"
                  borderRadius="5"
                  mt="4"
                  py="1"
                  px="4"
                >
                  <Text color="primary"> Company Id Proof </Text>
                  <Box display={{ base: "flex" }} alignItems="center">
                    <Text p="2" cursor="pointer">
                      <ShowImg
                        icon={eye}
                        //onLoad="true"
                        name={file?.company_id_proof?.name}
                        img={file?.company_id_proof?.objectURL}
                      />
                    </Text>

                    <Text p="2" cursor="pointer">
                      <Image src={dawonload} />
                    </Text>

                    {isEdit && (
                      <Box position="relative">
                        <Text p="2" cursor="pointer">
                          <Image src={uploadCloud} />
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
                            name="company_id_proof"
                            {...register("company_id_proof", {
                              required: false,
                            })}
                            onChange={(e) => handleChange(e)}
                          />
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Flex>
              </SlideFade>
            </Box>
          </Box>
          {/* documents end */}

          {/* Notes Start */}
          {showNotes && (
            <SlideFade in={showNotes} offsetY="20px">
              <Box mt="10" px="1">
                <Text
                  bg="bgLight"
                  p="3"
                  mb="5"
                  fontWeight={500}
                  color="secondary"
                  borderRadius={8}
                >
                  Notes
                </Text>

                <CustomTextArea
                  registerObj={{
                    ...register("notes", {
                      required: true,
                    }),
                  }}
                  resize="Vertical"
                  errors={errors}
                  fieldDetails={{
                    label: "",
                    componentType: "",
                    placeHolder: "Notes",
                    name: "notes",
                    type: "text",
                    err: "Notes is require",
                  }}
                />
              </Box>
            </SlideFade>
          )}
          {/* Notes End */}

          {/* Approve Reject Button Start */}
          <Flex
            // border="1px"
            p="2"
            direction={{ base: "flex", sm: "flex" }}
            gap="2"
            justify={{
              base: "center",
              lg: "end",
            }}
          >
            <ButtonSecondary
              title="Approve"
              mt={0}
              bg="secondary"
              color="white"
              isDisabled={isEdit}
              isLoading={false}
              onClick={() => false}
              w="95px"
              h="30px"
              py="5"
              px="20px"
              type="submit"
            />
            <ButtonSecondary
              title="Reject"
              mt={0}
              bg="error"
              bgHover="error"
              isDisabled={isEdit}
              color="white"
              isLoading={false}
              onClick={() => setShowNotes(true)}
              w="95px"
              h="30px"
              py="5"
              px="20px"
              type="button"
            />
          </Flex>
          {/* Approve Reject Button End */}
        </form>
      )}
    </Box>
  );
};

const ShowImg = ({ icon, name, img }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Text p="2" cursor="pointer">
          <Image src={icon} />
        </Text>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{name}</PopoverHeader>
        <PopoverBody>
          <Stack direction="row">
            <Image
              // boxSize="200px"
              width="100%"
              //height="250"
              src={img}
              loading="lazy"
              // onError={
              //   "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
              // }
              // https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg
              alt={name}
            />
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
