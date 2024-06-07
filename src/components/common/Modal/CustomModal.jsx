import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const CustomModal = ({
  size,
  isOpen,
  onClose,
  scrollBehavior,
  motionPreset,
  isCentered,
  closeOnOverlayClick,
  title,
  textAlign,
  children,
}) => {
  return (
    <Modal
      scrollBehavior={scrollBehavior}
      motionPreset="slideInBottom"
      onClose={onClose}
      //  isCentered={isCentered}
      closeOnOverlayClick={closeOnOverlayClick}
      size={size}
      isOpen={isOpen}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="secondary" textAlign={textAlign}>
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
