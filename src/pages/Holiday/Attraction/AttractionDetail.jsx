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
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { attractionDetail } from "../../../features/attractionPackage.slice";
import DeleteConfirmation from "../../../components/common/DeleteConfirmation";
import { commonService } from "../../../services/common.service";
import { useUploadImageMutation } from "../../../features/holidayPackageApi.slice";

// This is for the validation on form
const AttractionDetailschema = yup.object().shape({
  name: yup.string().required("Attraction name is required"),
  image: yup
    .mixed()
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value || !value[0]) return true; // If no file is provided, validation passes
      const validExtensions = ["jpg", "jpeg", "png", "gif"];
      const fileExtension = value[0].name.split(".").pop().toLowerCase();
      return validExtensions.includes(fileExtension);
    })
    .required("Attraction image is required"),
  desc: yup.string().required("Attraction detail is required"),
  adult_price: yup.string(),
  child_price: yup.string(),
});

//  this is main function
const AttractionDetail = ({ routerState }) => {
  const attractionDetailDataFormReducer = useSelector(
    (state) => state.attractionPackageReducer.attractionDetailData
  );
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
    getValues,
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(AttractionDetailschema) });

  const [fileName, setFileName] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [editingAttraction, setEditingAttraction] = useState(null);
  const [deleteAttraction, setDeleteAttraction] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);
  const dispatch = useDispatch();

  const [
    uploadImage,
    { error: uploadImageApiError, isLoading: uploadImageApiIsLoading },
  ] = useUploadImageMutation();

  console.log("errors --> ", errors);

  const onSubmit = (data) => {
    if (editingAttraction) {
      const updatedAttractions = attractions.map((attraction) =>
        attraction.id === editingAttraction.id
          ? { ...attraction, ...data }
          : attraction
      );
      console.log("updatedAttractions: " + updatedAttractions);
      setAttractions(updatedAttractions);
      setEditingAttraction(null);
      ///  dispatch(attractionDetail(updatedAttractions)); // Dispatch the updated attractions data to your reducer
    } else {
      const newAttraction = { id: attractions.length + 1, ...data };
      console.log("newAttraction: " + newAttraction);
      setAttractions([...attractions, newAttraction]);

      // dispatch(attractionDetail([...attractions, newAttraction])); // Dispatch the updated attractions data to your reducer
    }

    onClose();
    reset();
    console.log(attractions); // Log the updated attractions data
  };

  const uploadAllImages = (data) => {
    console.log("allData ---> ", data);
    let imgUrlList = [];
    data &&
      data.forEach(async ({ image, name }, ind) => {
        let title = name.split(" ").join("_");
        var time = commonService.getCurrentTimeFileName();
        let file_name = `${title}_${ind}_${time}_${image.name}`;

        // Usage example

        console.log(file_name);

        console.log("file_name --> ", file_name);
        let formData = new FormData();
        formData.append("image_name", file_name);
        formData.append("image", image);
        let url = await imageUpload(formData);

        console.log("onSubmit --> ", url);
        // imgUrlList.push(url);
        setImageUrl((prev) => [...prev, url]);
      });

    console.log("imgUrlList ==========> ", imgUrlList);

    //return imgUrlList;
  };

  const imageUpload = async (imgObj) => {
    try {
      const res = await uploadImage(imgObj).unwrap();

      console.log("image upload res --> ", res);
      if (res.status === 201) {
        return res.image;
      }
    } catch (err) {
      console.log("image upload err --> ", err);
      // ThrowErrors({}, error?.status);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setValue("image", file);
  };

  //   this is for the edit
  const handleEdit = (attraction) => {
    setEditingAttraction(attraction);
    onOpen();
  };

  //   this is for the delete
  const handleDelete = (attraction) => {
    setDeleteAttraction(attraction);
    confirmationModalOnOpen();
  };

  //   these is for the confirmation delete
  const confirmDelete = () => {
    const filteredAttractions = attractions.filter(
      (a) => a.id !== deleteAttraction.id
    );
    setAttractions(filteredAttractions);
    dispatch(attractionDetail(filteredAttractions || []));
    confirmationModalOnClose();
  };

  const saveAttractions = () => {
    uploadAllImages(attractions);
  };

  const preFieldsFormEdit = () => {
    // packageDetailsFormReducer
    setAttractions(attractionDetailDataFormReducer);
    // for (const [key, value] of Object.entries(attractionDetailDataFormReducer)) {
    //   console.log(`${key}: ${value}`);
    //   setValue(key, value, { shouldValidate: true });
    // }
  };

  useMemo(() => {
    console.log("all attractions details --> ", attractions);
    console.log("imageUrl --> ", imageUrl);
    if (imageUrl) {
      const finalData = attractions.map((item, ind) => {
        return {
          ...item,
          image: imageUrl[ind],
        };
      });
      console.log("finalData form ===> ", finalData);
      dispatch(attractionDetail(finalData));
    }
  }, [imageUrl]);

  useEffect(() => {
    console.log(
      "attractionDetailDataFormReducer",
      attractionDetailDataFormReducer
    );
    console.log("routerState", routerState);

    if (routerState !== null) {
      preFieldsFormEdit();
    }
  }, [attractionDetailDataFormReducer]);

  return (
    <>
      <Box border={"1px"} borderColor={"secondary"} rounded={"xl"}>
        {/* This is a main box  */}
        <Box p={10} display="flex" justifyContent="center" marginTop="20px">
          <Button
            onClick={onOpen}
            leftIcon={<AddIcon />}
            bgColor={"secondary"}
            color={"white"}
            _hover={""}
            rounded={"lg"}
          >
            Add Attraction
          </Button>
        </Box>

        {/* Modal for Add/Edit Attraction */}
        {isOpen && (
          <Modal
            size={"xl"}
            isOpen={isOpen}
            onClose={() => {
              onClose();
              reset();
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textAlign={"center"} color={"secondary"}>
                {editingAttraction ? "Update Attraction" : "Add Attraction"}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid templateColumns="1fr 1fr" gap="36px" mt={5}>
                    <FormControl isInvalid={errors.name}>
                      <FormLabel color={"loginText"}>Attraction Name</FormLabel>
                      <Input
                        bgColor={"#F1F2F6"}
                        {...register("name")}
                        defaultValue={editingAttraction?.name || ""}
                      />
                      {errors.name && (
                        <Box color="red">{errors.name.message}</Box>
                      )}
                    </FormControl>
                    <FormControl isInvalid={errors.image}>
                      <FormLabel color={"loginText"}>
                        Attraction Image
                      </FormLabel>
                      <Box
                        sx={{
                          border: "1px dashed skyblue ",
                          borderRadius: "6px",
                          backgroundColor: "#F1F2F6",
                        }}
                      >
                        <Flex position="relative">
                          <Image
                            borderRadius="full"
                            src="/assets/icons/addImage.svg"
                            alt="add image"
                          />
                          <Tooltip label={fileName} aria-label="A tooltip">
                            <Box>
                              <Input
                                bgColor={"#F1F2F6"}
                                type="file"
                                // image
                                // {...register()}
                                zIndex={1}
                                opacity={0}
                                onChange={handleImageChange}
                              />

                              <Text
                                as="span"
                                top={2}
                                ml="4"
                                position="absolute"
                                color="black"
                                noOfLines={1}
                                w={"80%"}
                              >
                                {fileName}
                              </Text>
                            </Box>
                          </Tooltip>
                        </Flex>
                      </Box>

                      {errors.image && (
                        <Box color="red">
                          {errors.image.message ||
                            "Attraction image is required"}
                        </Box>
                      )}
                    </FormControl>
                  </Grid>
                  <FormControl isInvalid={errors.desc} marginTop="10px">
                    <FormLabel color={"loginText"}>Attraction Detail</FormLabel>
                    <Textarea
                      bgColor={"#F1F2F6"}
                      {...register("desc")}
                      defaultValue={editingAttraction?.desc || ""}
                    />
                    {errors.desc && (
                      <Box color="red">{errors.desc.message}</Box>
                    )}
                  </FormControl>
                  <Input display="none" {...register("adult_price")} />
                  <Input display="none" {...register("child_price")} />
                  <Center>
                    <Button
                      type="submit"
                      marginTop="10px"
                      bgColor={"secondary"}
                      color={"white"}
                      _hover={""}
                    >
                      {editingAttraction ? "Update" : "Add"}
                    </Button>
                  </Center>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

        {/* Delete Confirmation Modal */}
        <DeleteConfirmation
          isOpen={confirmationModalIsOpen && deleteAttraction !== null}
          onClose={() => {
            setDeleteAttraction(null);
            confirmationModalOnClose();
          }}
          onDelete={confirmDelete}
          attraction={deleteAttraction}
        />

        {/* Display Attractions */}
        {attractions &&
          attractions.map((attraction) => (
            <Box
              m={4}
              key={attraction.id}
              marginTop="20px"
              bgColor={"secondary"}
              py={2}
              rounded={"xl"}
              px={4}
            >
              <Box display="flex" justifyContent="space-between">
                <Box fontWeight="bold" color={"white"} p={1} overflow={""}>
                  {attraction.name}
                </Box>
                <Box>
                  <Button
                    onClick={() => handleEdit(attraction)}
                    backgroundColor={"secondary"}
                    color={"white"}
                    marginRight="10px"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(attraction)}
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
        {attractions.length > 0 && (
          <Box px="4" textAlign={"right"} marginTop="20px">
            <Button
              _hover={""}
              backgroundColor={"secondary"}
              color={"white"}
              type="button"
              my={4}
              isLoading={uploadImageApiIsLoading}
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

export default AttractionDetail;
