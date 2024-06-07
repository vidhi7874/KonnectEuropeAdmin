import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { optionalServices } from "../../../features/attractionPackage.slice";

const CancellationPoliciesschema = yup.object().shape({
  service_name: yup.string().required(" service name is Required"),
  price_per_people: yup.number().required(" price per people is Required"),
  description: yup.string().required(" discription is Required"),
});

const OptionalService = ({ routerState }) => {
  const optionalServicesDataFormReducer = useSelector(
    (state) => state.attractionPackageReducer.optionalServicesData
  );
  const [showModal, setShowModal] = useState(false);
  const [optionalServiceData, setOptionalServiceData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isShow: false,
    id: null,
  });
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(CancellationPoliciesschema) });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItemId(null);
    reset();
  };

  const openDeleteConfirmation = (id) => {
    setDeleteConfirmation({ isShow: true, id: id });
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmation({ isShow: false, id: null });
  };

  const onSubmit = (formData) => {
    if (selectedItemId) {
      handleUpdate(selectedItemId, formData);
    } else {
      handleAdd(formData);
    }
  };

  const handleAdd = (formData) => {
    const newItem = {
      id: Date.now(),
      ...formData,
    };
    setOptionalServiceData((prevData) => [...prevData, newItem]);
    reset();
    closeModal();
  };

  const handleEdit = (id) => {
    const itemToEdit = optionalServiceData.find((item) => item.id === id);
    if (itemToEdit) {
      setValue("service_name", itemToEdit.service_name);
      setValue("price_per_people", itemToEdit.price_per_people);
      setValue("description", itemToEdit.description);
      setSelectedItemId(itemToEdit.id);
      openModal();
    }
  };

  const handleUpdate = (id, formData) => {
    const updatedData = optionalServiceData.map((item) =>
      item.id === id ? { ...item, ...formData } : item
    );
    setOptionalServiceData(updatedData);
    reset();
    closeModal();
  };

  const handleDelete = (id) => {
    const filteredData = optionalServiceData.filter((item) => item.id !== id);
    setOptionalServiceData(filteredData);
    dispatch(optionalServices(filteredData));
    closeDeleteConfirmation();
  };

  const saveoptionalServices = () => {
    dispatch(optionalServices(optionalServiceData));
    console.log("What's optional services detail", optionalServiceData);
  };

  useEffect(() => {
    if (optionalServiceData.length > 0) {
      setShowModal(false); // Disable the modal when at least one data item is added
    }
  }, [optionalServiceData]);

  const preFieldsFormEdit = () => {
    // packageDetailsFormReducer
    setOptionalServiceData(optionalServicesDataFormReducer);
  };

  useEffect(() => {
    console.log(
      "optionalServicesDataFormReducer",
      optionalServicesDataFormReducer
    );

    if (routerState !== null) {
      preFieldsFormEdit();
    }
  }, [optionalServicesDataFormReducer]);

  return (
    <Box border={"1px"} borderColor={"secondary"} rounded={"xl"}>
      <Box p={10} display="flex" justifyContent="center" marginTop="20px">
        <Button
          onClick={openModal}
          leftIcon={<AddIcon />}
          bgColor={"secondary"}
          color={"white"}
          _hover={""}
          rounded={"lg"}
        >
          Add Optional Services
        </Button>
      </Box>

      {optionalServiceData.length > 0 ? (
        <Box mx={6} px={4} py={2} rounded={"xl"} mb={2}>
          {optionalServiceData.map((item) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgColor={"secondary"}
              mx={6}
              px={4}
              py={2}
              rounded={"xl"}
              mb={2}
              color={"white"}
              key={item.id}
              p="3"
            >
              <Box alignItems="center" fontWeight="bold" color={"white"} p={1}>
                <Flex>
                  <Text fontSize="lg">{item.service_name}</Text>
                  <Text fontSize="lg" ml={14}>
                    {" "}
                    {item.price_per_people}
                  </Text>
                </Flex>
              </Box>
              <Flex justifyContent={"flex-end"}>
                <Button
                  onClick={() => handleEdit(item.id)}
                  backgroundColor={"secondary"}
                  color={"white"}
                  marginRight="10px"
                  _hover={""}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    //  setSelectedItemId(item.id);
                    openDeleteConfirmation(item.id);
                  }}
                  backgroundColor={"secondary"}
                  color={"white"}
                  _hover={""}
                >
                  Delete
                </Button>
              </Flex>
            </Box>
          ))}
        </Box>
      ) : (
        <Center py="3">
          <Text>No data available</Text>
        </Center>
      )}

      {/* Show Save Button */}
      {optionalServiceData.length > 0 && (
        <Box display="flex" justifyContent="end" mr={10} marginTop="20px">
          <Button
            _hover={""}
            backgroundColor={"secondary"}
            color={"white"}
            type="button"
            my={4}
            w={"15%"}
            onClick={() => saveoptionalServices()}
          >
            Save
          </Button>
        </Box>
      )}

      <Modal size={"2xl"} isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent textAlign={"center"} color={"secondary"}>
          <ModalHeader>
            {selectedItemId ? "Update" : "Add"} Optional Service
          </ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Grid templateColumns="1fr 1fr" gap="36px" mt={5}>
                <FormControl>
                  <FormLabel color="loginText">Enter Optional Title</FormLabel>
                  <Input
                    type="text"
                    color="loginText"
                    bgColor="#F1F2F6"
                    {...register("service_name")}
                    borderColor={errors.service_name ? "red" : "#CBD5E0"}
                  />
                  {errors.service_name && (
                    <Text color={"red"}>{errors.service_name.message}</Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel color="loginText">Enter price</FormLabel>
                  <Input
                    type="number"
                    color="loginText"
                    bgColor="#F1F2F6"
                    {...register("price_per_people")}
                    borderColor={errors.price_per_people ? "red" : "#CBD5E0"}
                  />
                  {errors.price_per_people && (
                    <Text color={"red"}>{errors.price_per_people.message}</Text>
                  )}
                </FormControl>
              </Grid>
              <FormControl isInvalid={errors.description}>
                <FormLabel color={"loginText"}>
                  Enter Optional Description
                </FormLabel>
                <Textarea
                  bgColor={"#F1F2F6"}
                  color={"loginText"}
                  {...register("description")}
                />
                <FormErrorMessage>
                  {errors.description?.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <Center>
              <Button
                type="submit"
                my="15px"
                bgColor={"secondary"}
                color={"white"}
                _hover={""}
              >
                {selectedItemId ? "Update" : "Add"}
              </Button>
            </Center>
          </form>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={deleteConfirmation.isShow}
        onClose={closeDeleteConfirmation}
      >
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Delete Confirmation</ModalHeader>
                <ModalCloseButton /> */}
          <ModalBody textAlign={"center"} fontSize={"2xl"} color={"red"}>
            Are you sure want to delete Optional Service
          </ModalBody>
          <Flex justify={"space-evenly"} my={4}>
            <Button
              _hover={""}
              bgColor={"secondary"}
              color={"white"}
              w={"30%"}
              onClick={closeDeleteConfirmation}
            >
              Cancel
            </Button>
            <Button
              _hover={""}
              bgColor={"red"}
              color={"white"}
              w={"30%"}
              onClick={() => handleDelete(deleteConfirmation.id)}
            >
              Delete
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OptionalService;
