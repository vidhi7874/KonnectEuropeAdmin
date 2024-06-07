import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Box,
  Heading,
  IconButton,
  List,
  ListItem,
  Spacer,
  Text,
  Center,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { tourHighlightDetail } from "../../../features/attractionPackage.slice";

const tourHighlightschema = Yup.object().shape({
  //   title: Yup.string().required("Title is required"),
  highlight: Yup.string().required("Description is required"),
});

const TourHighlight = ({ routerState }) => {
  const tourHighlightDetailFormReducer = useSelector(
    (state) => state.attractionPackageReducer.tourHighlightDetail
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const {
    isOpen: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure();
  const [highlights, setHighlights] = useState([]);
  const [editIndex, setEditIndex] = useState({ index: null, highlight: null });
  const [deletingIndex, setDeletingIndex] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(tourHighlightschema),
  });

  const handleAddHighlight = (data) => {
    setHighlights([data]);
    onClose();
    reset();
  };

  const handleEditHighlight = (index, highlight) => {
    setEditIndex({ index, highlight });
    console.log("highlight", highlight.highlight);
    setValue("highlight", highlight.highlight, { shouldValidate: true });
    onOpen();
  };

  const handleUpdateHighlight = (data) => {
    const updatedHighlights = [...highlights];
    updatedHighlights[editIndex.index] = data;
    setHighlights(updatedHighlights);
    setEditIndex({ index: null, highlight: null });
    onClose();
    reset();
  };

  const handleDeleteHighlight = (index) => {
    setDeletingIndex(index);
    onConfirmationOpen();
  };

  const handleConfirmationDeleteHighlight = () => {
    setHighlights([]);
    setDeletingIndex(null);
    dispatch(tourHighlightDetail([]));
    onConfirmationClose();
  };

  const onSubmit = (data) => {
    if (editIndex.index !== null) {
      handleUpdateHighlight(data);
    } else {
      handleAddHighlight(data);
    }
    console.log(data, "sbchsbhcbdhbcb");
    // dispatch(tourHighlightDetail(highlights)); // Dispatch the action to update the tour highlights data
    onClose();
    reset();
    // Perform additional actions here
    // ...
  };

  const preFieldsFormEdit = () => {
    // packageDetailsFormReducer
    setHighlights(tourHighlightDetailFormReducer);
  };

  const saveAttractions = () => {
    dispatch(tourHighlightDetail(highlights));
  };

  console.log(highlights, "fbdhfbhjba");
  console.log("errors ", errors);

  useEffect(() => {
    console.log("routerState", routerState);

    if (routerState !== null) {
      preFieldsFormEdit();
    }
  }, [tourHighlightDetailFormReducer]);

  return (
    <>
      <Box
        p={{ base: 8 }}
        border={"1px"}
        borderColor={"secondary"}
        rounded={"xl"}
      >
        {highlights.length === 0 && (
          <Box p={10} display="flex" justifyContent="center" marginTop="20px">
            <Button
              onClick={onOpen}
              bgColor={"secondary"}
              color={"white"}
              _hover={""}
            >
              + Add Highlight
            </Button>
          </Box>
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={"center"} color={"secondary"}>
              {editIndex.index !== null
                ? "Update Tour Highlights"
                : "Add Highlights"}
            </ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                {/* <FormControl isInvalid={errors.title}>
                    <FormLabel>Title</FormLabel>
                    <Input {...register("title")} />
                    <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                  </FormControl> */}

                <FormControl isInvalid={errors.highlight}>
                  <FormLabel color={"loginText"}>Description</FormLabel>
                  <Textarea
                    bgColor={"FormBackground"}
                    {...register("highlight")}
                  />
                  <FormErrorMessage>
                    {errors.highlight?.message}
                  </FormErrorMessage>
                </FormControl>
              </ModalBody>

              <Center>
                <Button
                  bgColor={"secondary"}
                  color={"white"}
                  mr={3}
                  type="submit"
                  _hover={""}
                  my={"6"}
                  width={"30%"}
                >
                  {editIndex.index !== null ? "Update" : "Add"}
                </Button>
              </Center>
              {/* <Button onClick={onClose}>Cancel</Button> */}
            </form>
          </ModalContent>
        </Modal>{" "}
        <Modal isOpen={isConfirmationOpen} onClose={onConfirmationClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color={"red"}>
              Are you sure you want to delete this highlight?
            </ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalFooter justifyContent={"space-evenly"}>
              <Button
                bgColor={"secondary"}
                color={"white"}
                onClick={onConfirmationClose}
                _hover={""}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                mr={3}
                onClick={handleConfirmationDeleteHighlight}
                _hover={""}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {highlights.length > 0 ? (
          <>
            <List p={2}>
              {highlights.map((highlight, index) => (
                <ListItem key={index} mt={4}>
                  <Box borderRadius={10} bgColor={"secondary"}>
                    <Flex p={6} rounded={"xl"}>
                      <Text
                        lineHeight={9}
                        pl={6}
                        color={"white"}
                        fontSize={"xl"}
                        overflow={"auto"}
                      >
                        {highlight.highlight}
                      </Text>
                    </Flex>

                    <Box
                      p="5"
                      w="full"
                      display={"flex"}
                      justifyContent={"flex-end"}
                    >
                      <Button
                        aria-label="Edit"
                        bgColor={"secondary"}
                        color={"white"}
                        _hover={""}
                        icon={<EditIcon />}
                        onClick={() => handleEditHighlight(index, highlight)}
                        mr={2}
                      >
                        {" "}
                        Edit
                      </Button>
                      <Button
                        aria-label="Delete"
                        bgColor={"secondary"}
                        color={"white"}
                        _hover={""}
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteHighlight(index)}
                      >
                        {" "}
                        Delete
                      </Button>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Box px="2" textAlign={"right"} mt={2}>
              <Button
                bgColor={"secondary"}
                color={"white"}
                _hover={""}
                w={"15%"}
                type="button"
                onClick={() => saveAttractions()}
              >
                Save
              </Button>
            </Box>
          </>
        ) : (
          <Text color={"secondary"} ml={6} mt={4}>
            No highlights available
          </Text>
        )}
      </Box>
    </>
  );
};

export default TourHighlight;
