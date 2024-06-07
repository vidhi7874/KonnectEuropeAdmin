import { Box, ListItem, OrderedList, useDisclosure } from "@chakra-ui/react";
import React from "react";
import CustomModal from "../../../../components/common/Modal/CustomModal";
import Attraction from "../../Attraction";
import AttractionsPayments from "./PaymentsTypes/AttractionsPayments";
import AccommodationPayment from "./PaymentsTypes/AccommodationPayment";
import TransferPayment from "./PaymentsTypes/TransferPayment";

const PaymentDetails = () => {
  const {
    isOpen: attractionModalIsOpen,
    onOpen: attractionModalOnOpen,
    onClose: attractionModalOnClose,
  } = useDisclosure();

  const {
    isOpen: accommodationIsOpen,
    onOpen: accommodationOnOpen,
    onClose: accommodationOnClose,
  } = useDisclosure();

  const {
    isOpen: paymentTransferIsOpen,
    onOpen: paymentTransferOnOpen,
    onClose: paymentTransferOnClose,
  } = useDisclosure();

  return (
    <Box p="3" cursor="pointer">
      <Box
        border="1px"
        borderColor="#E6F4FA"
        p="3"
        _hover={{
          bg: "#E6F4FA",
        }}
        fontSize="lg"
        onClick={() => attractionModalOnOpen()}
      >
        Attractions
        <CustomModal
          size="3xl"
          isOpen={attractionModalIsOpen}
          onClose={() => attractionModalOnClose()}
        >
          <AttractionsPayments onClose={() => attractionModalOnClose()} />
        </CustomModal>
      </Box>

      <Box
        border="1px"
        borderColor="#E6F4FA"
        p="3"
        _hover={{
          bg: "#E6F4FA",
        }}
        fontSize="lg"
        onClick={() => accommodationOnOpen()}
      >
        Accommodation
        <CustomModal
          size="6xl"
          isOpen={accommodationIsOpen}
          onClose={() => accommodationOnClose()}
        >
          <AccommodationPayment onClose={() => accommodationOnClose()} />
        </CustomModal>
      </Box>

      <Box
        border="1px"
        borderColor="#E6F4FA"
        p="3"
        _hover={{
          bg: "#E6F4FA",
        }}
        fontSize="lg"
        onClick={() => paymentTransferOnOpen()}
      >
        Transfer
        <CustomModal
          size="5xl"
          isOpen={paymentTransferIsOpen}
          onClose={() => paymentTransferOnClose()}
        >
          <TransferPayment onClose={() => paymentTransferOnClose()} />
        </CustomModal>
      </Box>

      <Box
        border="1px"
        borderColor="#E6F4FA"
        p="3"
        _hover={{
          bg: "#E6F4FA",
        }}
        fontSize="lg"
      >
        Eurail
      </Box>
    </Box>
  );
};

export default PaymentDetails;
