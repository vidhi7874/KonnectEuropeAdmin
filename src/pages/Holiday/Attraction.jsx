import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PackageDetails from "./Attraction/PackageDetails";
import { useForm, FormProvider } from "react-hook-form";
import AttractionDetail from "./Attraction/AttractionDetail";
import TourHighlight from "./Attraction/TourHighlight";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Iternity from "./Attraction/Iternity";
import AccomodationDetail from "./Attraction/AccomodationDetail";
import WhatsInclude from "./Attraction/WhatsInclude";
import WhatsNotInclude from "./Attraction/WhatsNotInclude";
import BookingPolicies from "./Attraction/BookingPolicies";
import CancellationPolicies from "./Attraction/CancellationPolicies";
import OptionalService from "./Attraction/OptionalService";
import PaymentDetails from "./Attraction/PaymentDetails/PaymentDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateHolidayPackageMutation,
  useGetHolidayPackageByIdMutation,
} from "../../features/holidayPackageApi.slice";
import ThrowErrors from "../../services/throwErrors";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import {
  accomodationDetail,
  attractionDetail,
  iternityDetail,
  packageDetail,
  tourHighlightDetail,
  whatsInclude,
  whatsNotInclude,
  paymentDetailsAdd,
  paymentTransferDetailsAdd,
} from "../../features/attractionPackage.slice";

const Attraction = () => {
  const dispatch = useDispatch();
  const d = useSelector((state) => state.attractionPackageReducer);
  const [
    createHolidayPackage,
    { error: createPackageApiError, isLoading: createPackageApiIsLoading },
  ] = useCreateHolidayPackageMutation();

  const [
    getHolidayPackageById,
    {
      error: getHolidayPackageByIdApiError,
      isLoading: getHolidayPackageByIdApiIsLoading,
    },
  ] = useGetHolidayPackageByIdMutation();

  const reducer = useSelector((state) => state.attractionPackageReducer);

  const [disabledSaveBtn, setDisabledSaveBtn] = useState(true);

  const location = useLocation();

  const location_state = location.state;

  console.log("data url state ===> ", location_state);

  console.log("all data form reducer ---> ", d);

  const checkAllData = () => {
    let obj = {
      accomodation: reducer.accomodationDetail?.length,
      attractionDetails: reducer.attractionDetailData?.length,
      bookingPolicies: reducer.bookingPoliciesData?.length,
      cancellationPolicies: reducer.cancellationPoliciesData?.length,
      iternity: reducer.iternityDetail?.length,
      optionalServices: reducer.optionalServicesData?.length,
      package: JSON.stringify(reducer.packageDetail) !== "{}" ? 1 : 0,
      payment: reducer.paymentDetails?.length,
      tourHighlight: reducer.tourHighlightDetail?.length,
      whatsInclude: reducer.whatsIncludeData?.length,
      whatsNotInclude: reducer.whatsNotIncludeData?.length,
      accommodationPayments: reducer.paymentDetails?.accommodation?.length,
      paymentTransfer: reducer.paymentDetails?.paymentTransfer?.length,
    };

    console.log("obj data test ==> ", obj);
    if (
      obj.accomodation &&
      obj.attractionDetails &&
      obj.bookingPolicies &&
      obj.cancellationPolicies &&
      obj.iternity &&
      obj.optionalServices &&
      obj.package &&
      obj.tourHighlight &&
      obj.whatsInclude &&
      obj.whatsNotInclude &&
      obj.accommodationPayments &&
      obj.paymentTransfer
    ) {
      setDisabledSaveBtn(false);
    }
  };

  const createNewPackage = async () => {
    console.log("createNewPackage");
    let formData = {
      attraction: attractionDetailData,
      itinerary: iternityDetail,
      included: whatsIncludeData,
      not_included: whatsNotIncludeData,
      tour_highlight: tourHighlightDetail,
      accomodation: accomodationDetail,
      accommodation_price: paymentDetails.accommodation,
      transfer_price: paymentDetails.paymentTransfer,
      eurail_price: [
        {
          adult_price: 0,
          child_price: 0,
          is_swiss_pass: 0,
          swiss_adult_price: 0,
          swiss_child_price: 0,
        },
      ],
      booking_policy: bookingPoliciesData,
      cancelation_policy: cancellationPoliciesData,
      optional_service: optionalServicesData,
      ...packageDetailData,
      package_range: packageDetailData.days,
      price_per_people: 0,
      rating: 5,
    };

    let testData = {
      attraction: [
        {
          child_price: 343,
          adult_price: 232,
          id: 1,
          name: "ewrew",
          desc: "fgfdg sdfgsdfg",
          image:
            "http://13.234.172.231/media/media/package/rebe-adelaida-293711-unsplash-jpeg-opt_Wj3Eg4y.jpg",
        },
      ],
      itinerary: [
        {
          desc: "dsfadfsf",
          title: "dsfsdf",
          day_date: "2023-06-14",
          day_no: 23,
        },
      ],
      included: [
        {
          id: 1685701841381,
          included_point: "sdfsdfewr",
        },
      ],
      not_included: [
        {
          id: 1685701847116,
          not_included_point: "sdfsdfsdf",
        },
      ],
      tour_highlight: [
        {
          highlight:
            "sdfad fasdf asfsdafsafa sdasfassdfassfdad asdfasdfasdff asdf asdfasdfadfdfsdfs sdf sdfsdfsdf",
        },
      ],
      accomodation: [
        {
          rating_field: "3",
          rating: "3",
          city: "302",
          first_name: "sdfsd",
          second_name: "werwe",
          third_name: "asdf",
          desc: "wrwerw",
        },
        {
          rating_field: "4",
          rating: "4",
          city: "32",
          first_name: "werewr",
          second_name: "sdfsdf",
          third_name: "erewr",
          desc: "erer",
        },
        {
          rating_field: "5",
          rating: "5",
          city: "302",
          first_name: "sdsdfdsf",
          second_name: "wer",
          third_name: "sddfsdf",
          desc: "erer",
        },
        {
          rating_field: "3",
          rating: "3",
          city: "302",
          first_name: "sdfsd",
          second_name: "wrewr",
          third_name: "erer",
          desc: "34lkjsdlkkjsdfdlkj asddf jkalk;sdjdflk",
        },
        {
          rating_field: "4",
          rating: "4",
          city: "302",
          first_name: "werwer",
          second_name: "werwer",
          third_name: "werw",
          desc: "jklsddjjlk sddlkkjlksdkdfj lksdfjjklsjddlkfj lsdfjjkls",
        },
        {
          rating_field: "5",
          rating: "5",
          city: "302",
          first_name: "sdfsdf",
          second_name: "weerwe",
          third_name: "rwrw",
          desc: "lfjlk;asddf jsdslfjlkasd assdfjjlkadflk; dodfjj;laksdjfkl;jjlksjdflk; asdf", // new adding
        },
      ],
      accommodation_price: [
        {
          extra_bed_price: 342,
          quad_price: 3434,
          triple_price: 434,
          twin_price: 343433,
          double_price: 434,
          single_price: 43434,
          rating: 3,
          name: "Three Star Hotel Price",
        },
        {
          extra_bed_price: 3424,
          quad_price: 5345,
          triple_price: 6756,
          twin_price: 56546,
          double_price: 345,
          single_price: 342,
          rating: 4,
          name: "Four Star Hotel Price",
        },
        {
          extra_bed_price: 4540,
          quad_price: 345,
          triple_price: 656,
          twin_price: 345,
          double_price: 565,
          single_price: 6545635,
          rating: 5,
          name: "Four Star Hotel Price",
        },
      ],
      transfer_price: [
        {
          twelve_person_price: 232,
          eleven_person_price: 433,
          ten_person_price: 234,
          nine_person_price: 545,
          eight_person_price: 435,
          seven_person_price: 435,
          six_person_price: 454,
          five_person_price: 545,
          four_person_price: 34,
          three_person_price: 232,
          transfer_name: "Standard",
        },
        {
          twelve_person_price: 55,
          eleven_person_price: 456,
          ten_person_price: 66,
          nine_person_price: 567,
          eight_person_price: 67,
          seven_person_price: 65,
          six_person_price: 55,
          five_person_price: 33,
          four_person_price: 45,
          three_person_price: 34,
          transfer_name: "Standard",
        },
      ],
      eurail_price: [
        {
          adult_price: 0,
          child_price: 0,
          is_swiss_pass: 0,
          swiss_adult_price: 0,
          swiss_child_price: 0,
        },
      ],
      booking_policy: [
        {
          id: 1685701855245,
          booking_policy: "sdfdas fsdafsfsdfsdfsd sdfdsfdf dfdfdfd dfdfd",
        },
      ],
      cancelation_policy: [
        {
          id: 1685701865756,
          cancelation_policy: "sdfdsf asdfdsfsfs fsdfsd fsdfsdfsdfsdf",
        },
      ],
      optional_service: [
        {
          id: 1685701878629,
          service_name: "werwer",
          price_per_people: "343",
          description: "dfsdfsdfsdf",
        },
      ],
      first_image:
        "http://13.234.172.231/media/media/package/rebe-adelaida-293711-unsplash-jpeg-opt_Wj3Eg4y.jpg",
      second_image:
        "http://13.234.172.231/media/media/package/rebe-adelaida-293711-unsplash-jpeg-opt_Wj3Eg4y.jpg",
      third_image:
        "http://13.234.172.231/media/media/package/rebe-adelaida-293711-unsplash-jpeg-opt_Wj3Eg4y.jpg",
      fourth_image:
        "http://13.234.172.231/media/media/package/rebe-adelaida-293711-unsplash-jpeg-opt_Wj3Eg4y.jpg",
      fifth_image:
        "http://13.234.172.231/media/media/package/rebe-adelaida-293711-unsplash-jpeg-opt_Wj3Eg4y.jpg",
      nights: "12",
      days: "13",
      is_active: "true",
      description: "sdsdf",
      city: "302", // new added code
      state: "X",
      country: "AR",
      validity_end_date: "2023-06-30",
      validity_start_date: "2023-06-17",
      package_name: "dfsdf",

      // new added fields
      package_range: "13",
      price_per_people: 3434,
      season: "sum",
      rating: 5,
      travel_type: "self_guided",
    };

    try {
      const res = await createHolidayPackage(formData).unwrap();

      ///const res = await createHolidayPackage(testData).unwrap();

      console.log("Api res --> ", res);
      if (res.status === 201) {
        ThrowErrors(res.message, res.status);
        window.location.reload();
      }
    } catch (err) {
      console.log(" err --> ", err);
      ThrowErrors({}, error?.status);
    }

    console.log("final formData ----> ", formData);
  };

  const getDetailsById = async () => {
    try {
      const res = await getHolidayPackageById(location_state?.id).unwrap();
      console.log("getDetailsById Api res --> ", res);
      if (res.status === 200) {
        let package_details = {
          package_name: res.data.package_name,
          validity_start_date: res.data.validity_start_date,
          validity_end_date: res.data.validity_end_date,
          country: res.data.country,
          state: res.data.state,
          city: res.data.city,
          description: res.data.description,
          is_active: res.data.is_active,
          season: res.data.season,
          travel_type: res.data.travel_type,
          days: res.data.travel_type,
          nights: res.data.nights,
        };
        dispatch(packageDetail(package_details));
        dispatch(attractionDetail(res.data.attraction));

        dispatch(tourHighlightDetail(res.data.tour_highlight));
        dispatch(iternityDetail(res.data.itinerary));
        dispatch(accomodationDetail(res.data.accomodation));
        dispatch(whatsInclude(res.data.included));
        dispatch(whatsNotInclude(res.data.not_included));
        dispatch(bookingPolicies(res.data.booking_policy));
        dispatch(cancellationPolicies(res.data.cancelation_policy));
        dispatch(optionalServices(res.data.optional_service));
        dispatch(paymentDetailsAdd(res.data.accommodation_price));
        dispatch(paymentTransferDetailsAdd(res.data.transfer_price));
      }
    } catch (err) {
      console.log(" err --> ", err);
      ThrowErrors({}, err?.status);
    }
  };

  useEffect(() => {
    checkAllData();
  }, [d]);

  useEffect(() => {
    console.log("on load --> ");
    if (location_state !== null) {
      getDetailsById();
    }
  }, []);

  return (
    <>
      <Box
        borderRadius={25}
        m={{ base: "90px 0px", md: "112px 0px", lg: "112px 0px" }}
        // h="calc(100vh - 0vh)"
        w="100%"
        p={6}
        bg="white"
      >
        <Center>
          <Heading color={"secondary"} mb={8}>
            {location_state ? "Update Holiday Package" : "Add Holiday Package"}
          </Heading>
        </Center>
        <Box p={6}>
          {/* <FormProvider
            //   allMethods={use}
            {...methods}
          >
            <form onSubmit={methods.handleSubmit(onSubmit)}> */}
          {!getHolidayPackageByIdApiIsLoading && (
            <>
              <Accordion defaultIndex={[0]}>
                {/* This Tabpanel is for the PackageDetail */}
                <AccordionItem bgColor={"#0090C51A"} my={2} rounded={"2xl"}>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      color={"secondary"}
                      fontWeight={"medium"}
                      my={"2"}
                    >
                      {" "}
                      Package Details
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  {/* This Tabpanel is for the PackageDetail */}
                  <AccordionPanel pb={4} pt={6} bgColor={"white"}>
                    <PackageDetails routerState={location_state} />
                  </AccordionPanel>
                </AccordionItem>

                {/* This is for the AttractionDetail Page Panel */}
                <AccordionItem bgColor={"#0090C51A"} my={2} rounded={"2xl"}>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      color={"secondary"}
                      fontWeight={"medium"}
                      my={"2"}
                    >
                      Attraction detail
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  {/* This is for the AttractionDetail Page Panel */}
                  <AccordionPanel pb={4} bgColor={"white"}>
                    <AttractionDetail routerState={location_state} />
                  </AccordionPanel>
                </AccordionItem>
                {/* This is for the TourHighlight Page Panel */}
                <AccordionItem bgColor={"#0090C51A"} my={2} rounded={"2xl"}>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      color={"secondary"}
                      fontWeight={"medium"}
                      my={"2"}
                    >
                      Tour highlight
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  {/* This is for the TourHighlight Page Panel */}
                  <AccordionPanel pb={4} bgColor={"white"}>
                    <TourHighlight routerState={location_state} />
                  </AccordionPanel>
                </AccordionItem>
                {/* This is for the Itinarary Page Panel */}
                <AccordionItem bgColor={"#0090C51A"} my={2} rounded={"2xl"}>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      color={"secondary"}
                      fontWeight={"medium"}
                      my={"2"}
                    >
                      Itinarary
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  {/* This is for the Itinarary Page Panel */}
                  <AccordionPanel pb={4} bgColor={"white"}>
                    <Iternity routerState={location_state} />
                  </AccordionPanel>
                </AccordionItem>
                {/* This Tabpanel is for the Accomodation */}
                <AccordionItem bgColor={"#0090C51A"} my={2} rounded={"2xl"}>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      color={"secondary"}
                      fontWeight={"medium"}
                      my={"2"}
                    >
                      {" "}
                      Accomodation
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  {/* This Tabpanel is for the Accomodation */}
                  <AccordionPanel pb={4} bgColor={"white"}>
                    <AccomodationDetail routerState={location_state} />
                  </AccordionPanel>
                </AccordionItem>
                {/* This is for the What’s include Page Panel */}
                <AccordionItem bgColor={"#0090C51A"} my={2} rounded={"2xl"}>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      color={"secondary"}
                      fontWeight={"medium"}
                      my={"2"}
                    >
                      What’s include
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  {/* This is for the What’s include Page Panel */}
                  <AccordionPanel pb={4} bgColor={"white"}>
                    <WhatsInclude routerState={location_state} />
                  </AccordionPanel>
                </AccordionItem>
                {/* This is for the What’s not include Page Panel */}
                <AccordionItem bgColor={"#0090C51A"} my={2} rounded={"2xl"}>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      color={"secondary"}
                      fontWeight={"medium"}
                      my={"2"}
                    >
                      What’s not include
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  {/* This is for the What’s not include Page Panel */}
                  <AccordionPanel pb={4} bgColor={"white"}>
                    <WhatsNotInclude routerState={location_state} />
                  </AccordionPanel>
                </AccordionItem>
                {/* This is for the Booking Policies Page Panel */}
                <AccordionItem bgColor={"#0090C51A"} my={2} rounded={"2xl"}>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      color={"secondary"}
                      fontWeight={"medium"}
                      my={"2"}
                    >
                      Booking Policies
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  {/* This is for the Booking Policies Page Panel */}
                  <AccordionPanel pb={4} bgColor={"white"}>
                    <BookingPolicies routerState={location_state} />
                  </AccordionPanel>
                </AccordionItem>
                {/* This is for the Cancellation Policies Page Panel */}
                <AccordionItem bgColor={"#0090C51A"} my={2} rounded={"2xl"}>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      color={"secondary"}
                      fontWeight={"medium"}
                      my={"2"}
                    >
                      Cancellation Policies
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  {/* This is for the Cancellation Policies Page Panel */}
                  <AccordionPanel pb={4} bgColor={"white"}>
                    <CancellationPolicies routerState={location_state} />
                  </AccordionPanel>
                </AccordionItem>
                {/* This is for the Optional Services Page Panel */}
                <AccordionItem bgColor={"#0090C51A"} my={2} rounded={"2xl"}>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      color={"secondary"}
                      fontWeight={"medium"}
                      my={"2"}
                    >
                      Optional Services
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  {/* This is for the Optional Services Page Panel */}
                  <AccordionPanel pb={4} bgColor={"white"}>
                    <OptionalService routerState={location_state} />
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem bgColor={"#0090C51A"} my={2} rounded={"2xl"}>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      color={"secondary"}
                      fontWeight={"medium"}
                      my={"2"}
                    >
                      Payment Detail
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  {/* This is for the Optional Services Page Panel */}
                  <AccordionPanel pb={4} bgColor={"white"}>
                    <PaymentDetails routerState={location_state} />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              {/* </form>
          </FormProvider> */}

              <Box textAlign="center" width={{ base: "100%" }} my="10">
                <Button
                  _hover={{}}
                  width={{ base: 200 }}
                  color="white"
                  bg="secondary"
                  isLoading={createPackageApiIsLoading}
                  isDisabled={disabledSaveBtn}
                  onClick={() => createNewPackage()}
                >
                  Save
                </Button>
              </Box>
            </>
          )}

          {getHolidayPackageByIdApiIsLoading && (
            <Box textAlign="center">
              <Loader />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Attraction;
