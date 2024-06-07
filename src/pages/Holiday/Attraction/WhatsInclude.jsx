import { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { whatsInclude } from "../../../features/attractionPackage.slice";

const WhatIncludeSchema = yup.object().shape({
  included_point: yup.string().required("Include is required"),
});

const WhatsInclude = ({ routerState }) => {
  const whatsIncludeDataFormReducer = useSelector(
    (state) => state.attractionPackageReducer.whatsIncludeData
  );
  const [showModal, setShowModal] = useState(false);
  const [includeData, setIncludeData] = useState([]);
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
  } = useForm({ resolver: yupResolver(WhatIncludeSchema) });

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
    setIncludeData((prevData) => [...prevData, newItem]);
    reset();
    closeModal();
  };

  const handleEdit = (id) => {
    const itemToEdit = includeData.find((item) => item.id === id);
    if (itemToEdit) {
      setValue("included_point", itemToEdit.included_point);
      setSelectedItemId(itemToEdit.id);
      openModal();
    }
  };

  const handleUpdate = (id, formData) => {
    const updatedData = includeData.map((item) =>
      item.id === id ? { ...item, ...formData } : item
    );
    setIncludeData(updatedData);
    reset();
    closeModal();
  };

  const handleDelete = (id) => {
    const filteredData = includeData.filter((item) => item.id !== id);
    setIncludeData(filteredData);
    dispatch(whatsInclude(filteredData));
    closeDeleteConfirmation();
  };

  const saveWhatsInclude = () => {
    dispatch(whatsInclude(includeData));
    console.log("What's included detail", includeData);
  };

  //

  const preFieldsFormEdit = () => {
    // packageDetailsFormReducer
    setIncludeData(whatsIncludeDataFormReducer);
  };

  useEffect(() => {
    console.log("whatsIncludeDataFormReducer", whatsIncludeDataFormReducer);

    if (routerState !== null) {
      preFieldsFormEdit();
    }
  }, [whatsIncludeDataFormReducer]);

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
          Add What's Included
        </Button>
      </Box>

      {includeData.length > 0 ? (
        <Box mx={10} px={4} bgColor={"secondary"} py={2} rounded={"xl"} mb={2}>
          {includeData.map((item) => (
            <UnorderedList px={5} py={2} key={item.id}>
              <ListItem color={"white"}>
                <Box display="flex" alignItems="center">
                  <Box fontWeight="bold" color={"white"} p={1}>
                    <Text>{item.included_point}</Text>
                  </Box>

                  <Box>
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
                </Box>
              </ListItem>
            </UnorderedList>
          ))}
        </Box>
      ) : (
        <Center py="3">
          <Text>No data available</Text>
        </Center>
      )}

      {/* Show Save Button */}
      {includeData.length > 0 && (
        <Box display="flex" justifyContent="end" mr={10} marginTop="20px">
          <Button
            _hover={""}
            backgroundColor={"secondary"}
            color={"white"}
            type="button"
            my={4}
            w={"15%"}
            onClick={() => saveWhatsInclude()}
          >
            Save
          </Button>
        </Box>
      )}

      <Modal isOpen={showModal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent textAlign={"center"} color={"secondary"}>
          <ModalHeader>
            {selectedItemId ? "Update" : "Add"} What's Included
          </ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <FormControl isInvalid={errors.included_point}>
                <FormLabel color={"loginText"}>Add What's Included</FormLabel>
                <Textarea
                  bgColor={"#F1F2F6"}
                  color={"loginText"}
                  {...register("included_point")}
                />
                <FormErrorMessage>
                  {errors.included_point?.message}
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
          <ModalBody textAlign={"center"} fontSize={"2xl"} color={"red"}>
            Are you sure you want to delete What's Included?
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

export default WhatsInclude;
