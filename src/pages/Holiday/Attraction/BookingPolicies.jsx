import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
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
import { useDispatch } from "react-redux";
import { bookingPolicies } from "../../../features/attractionPackage.slice";

const BookingPoliciesschema = yup.object().shape({
  booking_policy: yup.string().required(" booking policies is Required"),
});

const BookingPolicies = () => {
  const [showModal, setShowModal] = useState(false);
  const [policiesData, setPoliciesData] = useState([]);
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
  } = useForm({ resolver: yupResolver(BookingPoliciesschema) });

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
    setPoliciesData((prevData) => [...prevData, newItem]);
    reset();
    closeModal();
  };

  const handleEdit = (id) => {
    const itemToEdit = policiesData.find((item) => item.id === id);
    if (itemToEdit) {
      setValue("booking_policy", itemToEdit.booking_policy);
      setSelectedItemId(itemToEdit.id);
      openModal();
    }
  };

  const handleUpdate = (id, formData) => {
    const updatedData = policiesData.map((item) =>
      item.id === id ? { ...item, ...formData } : item
    );
    setPoliciesData(updatedData);
    reset();
    closeModal();
  };

  const handleDelete = (id) => {
    const filteredData = policiesData.filter((item) => item.id !== id);
    setPoliciesData(filteredData);
    dispatch(bookingPolicies(filteredData));
    closeDeleteConfirmation();
  };

  const savebookingPolicies = () => {
    dispatch(bookingPolicies(policiesData));
    console.log("What's policiesData detail", policiesData);
  };

  useEffect(() => {
    if (policiesData.length > 0) {
      setShowModal(false); // Disable the modal when at least one data item is added
    }
  }, [policiesData]);

  return (
    <Box border={"1px"} borderColor={"secondary"} rounded={"xl"}>
      <Box p={10} display="flex" justifyContent="center" marginTop="20px">
        {policiesData.length === 0 && (
          <Button
            onClick={openModal}
            leftIcon={<AddIcon />}
            bgColor={"secondary"}
            color={"white"}
            _hover={""}
            rounded={"lg"}
            disabled={policiesData.length > 0} // Disable the button when at least one data item is added
          >
            Add Booking Policies
          </Button>
        )}
      </Box>

      {policiesData.length > 0 ? (
        <Box mx={6} px={4} bgColor={"secondary"} py={2} rounded={"xl"} mb={2}>
          {policiesData.map((item) => (
            <Text color={"white"} key={item.id}>
              <Box>
                <Box fontWeight="bold" color={"white"} p={1}>
                  <Text>{item.booking_policy}</Text>
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
            </Text>
          ))}
        </Box>
      ) : (
        <Center py="3">
          <Text>No data available</Text>
        </Center>
      )}

      {/* Show Save Button */}
      {policiesData.length > 0 && (
        <Box display="flex" justifyContent="end" mr={10} marginTop="20px">
          <Button
            _hover={""}
            backgroundColor={"secondary"}
            color={"white"}
            type="button"
            my={4}
            w={"15%"}
            onClick={() => savebookingPolicies()}
          >
            Save
          </Button>
        </Box>
      )}

      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent textAlign={"center"} color={"secondary"}>
          <ModalHeader>
            {selectedItemId ? "Update" : "Add"} Booking Policies
          </ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl isInvalid={errors.booking_policy}>
                <FormLabel color={"loginText"}>Add Booking Policies</FormLabel>
                <Textarea
                  bgColor={"#F1F2F6"}
                  color={"loginText"}
                  {...register("booking_policy")}
                />
                <FormErrorMessage>
                  {errors.booking_policy?.message}
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
            Are you sure want to delete Booking Policies
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

export default BookingPolicies;
