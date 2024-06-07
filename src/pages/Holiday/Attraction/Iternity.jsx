import React, { Suspense, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Box,
  Flex,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { iternityDetail } from "../../../features/attractionPackage.slice";
import DeleteConfirmation from "../../../components/common/DeleteConfirmation";
import { commonService } from "../../../services/common.service";
import moment from "moment";

const schema = yup.object().shape({
  day_no: yup.number().required("Day is required"),
  day_date: yup.date().required("Date is required"),
  title: yup.string().trim().required("Title is required"),
  desc: yup.string().trim().required("Description is required"),
});

const Itinerary = ({ routerState }) => {
  const iternityDetailDataFormReducer = useSelector(
    (state) => state.attractionPackageReducer.iternityDetail
  );
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itineraryList, setItineraryList] = useState([]);
  const dispatch = useDispatch();
  const [editIndex, setEditIndex] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [defaultDate, setDefaultDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  const onSubmitForm = (data) => {
    let dataObj = {
      ...data,
      day_date: moment(data.day_date).format("YYYY-MM-DD"),
    };
    if (editIndex !== null) {
      // Update existing itinerary
      const updatedList = [...itineraryList];
      updatedList[editIndex] = dataObj;
      setItineraryList(updatedList);
      setEditIndex(null);
      setEditModalOpen(false);
      //   dispatch(iternityDetail(updatedList)); // Dispatch the updated attractions data to your reducer
    } else {
      // Add new itinerary
      setItineraryList([
        ...itineraryList,
        {
          ...dataObj,
        },
      ]);
      setAddModalOpen(false);
      //   dispatch(iternityDetail([...itineraryList, data])); // Dispatch the updated attractions data to your reducer
      reset(); // Clear the form fields
    }
    console.log(data, "data");
    console.log(itineraryList); // Log the updated attractions data
  };

  const handleEditItinerary = (index) => {
    const itinerary = itineraryList[index];
    console.log("itinerary", itinerary);
    setEditIndex(index);

    for (const [key, value] of Object.entries(itinerary)) {
      console.log(`${key}: ${value}`);
      if (key === "day_date") {
        setValue(key, moment(value).format("YYYY-MM-DD"), {
          shouldValidate: true,
        });
      } else {
        setValue(key, value, { shouldValidate: true });
      }
    }
    // reset(itinerary);
    setEditModalOpen(true);
  };

  const handleDeleteItinerary = (index) => {
    setEditIndex(index);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedList = [...itineraryList];
    updatedList.splice(editIndex, 1);
    setItineraryList(updatedList);
    dispatch(iternityDetail(updatedList));
    setDeleteModalOpen(false);
    setEditIndex(null);
  };
  console.log(errors, "error");

  const saveItineraryList = () => {
    dispatch(iternityDetail(itineraryList));
  };

  const preFieldsFormEdit = () => {
    // packageDetailsFormReducer
    setItineraryList(iternityDetailDataFormReducer);
  };

  useEffect(() => {
    console.log("routerState", routerState);

    if (routerState !== null) {
      preFieldsFormEdit();
    }
  }, [iternityDetailDataFormReducer]);

  return (
    <Box border={"1px"} borderColor={"secondary"} rounded={"xl"}>
      <Box p={10} display="flex" justifyContent="center" marginTop="20px">
        <Button
          bgColor={"secondary"}
          color={"white"}
          _hover={""}
          rounded={"lg"}
          onClick={() => {
            setAddModalOpen(true);
            reset(); // Clear the form fields
          }}
        >
          + Add Itinerary
        </Button>
      </Box>

      <Modal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"} color={"secondary"}>
            Add Itinerary
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel color={"loginText"}>Day</FormLabel>
                  <Input
                    bgColor={"FormBackground"}
                    type="number"
                    {...register("day_no")}
                  />
                  {errors.day_no && (
                    <Text color="red">{errors.day_no.message}</Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel color={"loginText"}>Date</FormLabel>
                  <Input
                    bgColor={"FormBackground"}
                    min={defaultDate}
                    type="date"
                    {...register("day_date")}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setValue("day_date", e.target.value, {
                        shouldValidate: true,
                      });
                    }}
                  />
                  {errors.day_date && (
                    <Text color="red">{errors.day_date.message}</Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel color={"loginText"}>Title</FormLabel>
                  <Input bgColor={"FormBackground"} {...register("title")} />
                  {errors.title && (
                    <Text color="red">{errors.title.message}</Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel color={"loginText"}>Description</FormLabel>
                  <Input bgColor={"FormBackground"} {...register("desc")} />
                  {errors.desc && (
                    <Text color="red">{errors.desc.message}</Text>
                  )}
                </FormControl>
              </VStack>
            </form>
          </ModalBody>{" "}
          <Center>
            <Button
              my={"5"}
              bgColor={"secondary"}
              color={"white"}
              mr={3}
              _hover={""}
              onClick={handleSubmit(onSubmitForm)}
            >
              Submit
            </Button>
            {/* <Button onClick={() => setAddModalOpen(false)}>Cancel</Button> */}
          </Center>
        </ModalContent>
      </Modal>

      {/* for the data show  */}
      {itineraryList.map((itinerary, index) => (
        <VStack
          backgroundColor={"secondary"}
          key={index}
          spacing={4}
          align="stretch"
          marginTop="20px"
          bgColor={"secondary"}
          py={2}
          rounded={"xl"}
          px={4}
          mx={2}
        >
          <Flex justify={"space-between"} alignItems={"center"}>
            <Flex justify={"space-between"}>
              <Text color={"white"}>{itinerary.day_no}</Text>
              <Text color={"white"} ml={"20%"} w={"100%"} noOfLines={"1"}>
                {itinerary.title}
              </Text>
            </Flex>
            <Flex justifyContent={"flex-end"}>
              <Button
                bgColor={"secondary"}
                color={"white"}
                marginRight="10px"
                onClick={() => handleEditItinerary(index)}
                _hover={""}
              >
                Edit
              </Button>
              <Button
                bgColor={"secondary"}
                _hover={""}
                color={"white"}
                onClick={() => handleDeleteItinerary(index)}
              >
                Delete
              </Button>
            </Flex>
          </Flex>

          <Modal
            isOpen={editModalOpen && index === editIndex}
            onClose={() => setEditModalOpen(false)}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color={"secondary"} textAlign={"center"}>
                {" "}
                Edit Itinerary
              </ModalHeader>
              {/* <ModalCloseButton /> */}
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmitForm)}>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel color={"loginText"}>Day</FormLabel>
                      <Input
                        bgColor={"FormBackground"}
                        type="number"
                        {...register("day_no")}
                      />
                      {errors.day_no && (
                        <Text color="red">{errors.day_no.message}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel color={"loginText"}>Date</FormLabel>
                      <Input
                        bgColor={"FormBackground"}
                        min={defaultDate}
                        type="date"
                        {...register("day_date")}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setValue("day_date", e.target.value, {
                            shouldValidate: true,
                          });
                        }}
                      />
                      {errors.day_date && (
                        <Text color="red">{errors.day_date.message}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel color={"loginText"}>Title</FormLabel>
                      <Input
                        bgColor={"FormBackground"}
                        {...register("title")}
                      />
                      {errors.title && (
                        <Text color="red">{errors.title.message}</Text>
                      )}
                    </FormControl>
                    <FormControl>
                      <FormLabel color={"loginText"}>Description</FormLabel>
                      <Input bgColor={"FormBackground"} {...register("desc")} />
                      {errors.desc && (
                        <Text color="red">{errors.desc.message}</Text>
                      )}
                    </FormControl>
                  </VStack>
                </form>
              </ModalBody>

              <Center>
                <Button
                  bgColor={"secondary"}
                  color={"white"}
                  mr={3}
                  my={5}
                  onClick={handleSubmit(onSubmitForm)}
                >
                  Update
                </Button>
                {/* <Button onClick={() => setEditModalOpen(false)}>Cancel</Button> */}
              </Center>
            </ModalContent>
          </Modal>

          <Suspense fallback={<div>Loading...</div>}>
            <DeleteConfirmation
              isOpen={deleteModalOpen && index === editIndex}
              onClose={() => setDeleteModalOpen(false)}
              onDelete={confirmDelete}
              attraction={itineraryList[index]}
            />
          </Suspense>
        </VStack>
      ))}
      {/* Show Save Button */}
      {itineraryList.length > 0 && (
        <Box display="flex" justifyContent="center" my={8}>
          <Button
            type="button"
            bgColor={"secondary"}
            color={"white"}
            _hover={""}
            w={"15%"}
            onClick={() => saveItineraryList()}
          >
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Itinerary;
