import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const DeleteConfirmation = ({ isOpen, onClose, onDelete, attraction }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody fontSize="xl" mt="10" color="red">
          Are you sure you want to delete {attraction?.name}?
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button
            w="40%"
            bgColor="secondary"
            color="white"
            onClick={onClose}
            _hover=""
          >
            Cancel
          </Button>
          <Button
            w="40%"
            bgColor="#F52E2E"
            color="white"
            onClick={onDelete}
            _hover=""
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmation;
