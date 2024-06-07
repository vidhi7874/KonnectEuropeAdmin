import {
  Box,
  Card,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { group, mainTik, screen } from "../../assets/icons";
import {
  useGetHotelPerformancesMutation,
  useGetOverAllPerformancesMutation,
  useGetPackagePerformancesMutation,
  useGetSightseeingPerformancesMutation,
} from "../../features/dashboardApi.Slice";
import DatePicker from "react-datepicker";

import { RiCalendar2Line } from "react-icons/ri";
import moment from "moment/moment";
const bookings = [
  {
    title: "Holiday Booking",
    date: "16-08-2022",
    viewType: "Daily View",
    details: [
      {
        icon: group,
        title: "Total Hotel booking",
        number: "1,893",
      },
      {
        icon: mainTik,
        title: "Total Hotel booking",
        number: "1,893",
      },
      {
        icon: screen,
        title: "Total Hotel booking",
        number: "1,893",
      },
    ],
  },

  {
    title: "Holiday Booking",
    date: "16-08-2022",
    viewType: "Daily View",
    details: [
      {
        icon: group,
        title: "Total Hotel booking",
        number: "1,893",
      },
      {
        icon: mainTik,
        title: "Total Hotel booking",
        number: "1,893",
      },
      {
        icon: screen,
        title: "Total Hotel booking",
        number: "1,893",
      },
    ],
  },

  {
    title: "Holiday Booking",
    date: "16-08-2022",
    viewType: "Daily View",
    details: [
      {
        icon: group,
        title: "Total Hotel booking",
        number: "1,893",
      },
      {
        icon: mainTik,
        title: "Total Hotel booking",
        number: "1,893",
      },
      {
        icon: screen,
        title: "Total Hotel booking",
        number: "1,893",
      },
    ],
  },
];

const Dashboard = () => {
  return (
    <Box
      borderRadius={25}
      m={{ base: "90px 0px", md: "112px 0px", lg: "112px 0px" }}
      h="calc(100vh - 0vh)"
      w="100%"
      p={0}
      color="white"
    >
      {/* OverallPerformanceCard Start */}
      <OverallPerformanceCard />
      {/* OverallPerformanceCard End */}

      {/* HolidayBookingCard Start */}
      <HolidayBooking />

      <HotelBooking />
      <SightseeingBooking />

      {/* HolidayBookingCard End */}
    </Box>
  );
};

export default Dashboard;

// ============================ Inner Components Start ==================

/* OverallPerformanceCard Inner Component Start 1 */

const OverallPerformanceCard = () => {
  const [data, setData] = useState({
    total_holiday_package: "",
    total_hotel_booking: "",
    total_sightseeing_booking: "",
  });

  const [
    getOverAllPerformances,
    {
      data: allPerformancesData,
      error: getOverAllPerformancesApiErr,
      isLoading: getOverAllPerformancesApiIsLoading,
    },
  ] = useGetOverAllPerformancesMutation();

  const OverAllPerformance = async () => {
    try {
      const response = await getOverAllPerformances().unwrap();
      setData(response);
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };

  useEffect(() => {
    OverAllPerformance();
  }, []);

  if (getOverAllPerformancesApiErr) {
    console.error("Fetch error:", getOverAllPerformancesApiErr);
    // Handle the error (e.g., show an error message)
  }

  const hotelsDetailsCard = [
    {
      icon: group,
      title: "Total Holiday Package",
      number: data.total_holiday_package.toString(),
    },
    {
      icon: mainTik,
      title: "Total Hotel booking",
      number: data.total_hotel_booking.toString(),
    },
    {
      icon: screen,
      title: "Total Sight seen",
      number: data.total_sightseeing_booking.toString(),
    },
  ];

  return (
    <Box
      height={{ base: "500px", md: "260px", lg: "240px" }}
      p="8"
      borderRadius={17}
      bg="#fff"
    >
      <Text
        fontSize={{ base: "30px", md: "40px", lg: "36px" }}
        as="b"
        color="secondary"
        isTruncated
      >
        Overall Performance
      </Text>

      <Flex
        p={{ base: 0, md: 0 }}
        w="100%"
        gap={7}
        direction={{ base: "column-reverse", md: "row" }}
      >
        {hotelsDetailsCard.map((el) => (
          <Box
            w="100%"
            m={{ base: "10px 0px", md: "11px 0px", lg: "11px 0px" }}
          >
            <HotelsDetailsCard details={el} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

const HotelsDetailsCard = ({ details }) => {
  return (
    <Card
      border={{ borderRightColor: "red", borderRight: "2px" }}
      borderRadius="0"
      boxShadow=""
      borderBottom={60}
    >
      <Flex w="100%" gap="3" alignItems="center" p="2">
        <Box borderRadius="50" bg="#F4F5F7">
          <Image
            sx={{ mx: "auto" }}
            p="5"
            objectFit="cover"
            src={details.icon}
            alt="logo"
          />
        </Box>

        <Box>
          <Text size="sm" color="textPrimary">
            {details.title}
          </Text>
          <Heading color="secondary">
            {details.number ? details.number : "Loading..."}
          </Heading>
        </Box>
      </Flex>
    </Card>
  );
};

/* OverallPerformanceCard Inner Component End  1*/

/* #### ------------------------------------------------------ #### */

/* Holiday Booking Inner Component Start 2 */

/* <Box bg="tomato" height="80px"></Box> */

// for holiday booking component
const HolidayBooking = ({ data }) => {
  let date = moment(new Date()).format("YYYY-MM-DD");
  let month = moment().format("L").split("/")[0];
  let year = moment().format("L").split("/")[2];

  const [filter, setFilter] = useState({
    type: "holiday",
    filter: "date",
    booking_date: "",
    month: "",
    year: "",
  });
  const [
    getPackagePerformances,
    {
      data: allPackagePerformancesData,
      error: getPackagePerformancesApiErr,
      isLoading: getPackagePerformancesApiIsLoading,
    },
  ] = useGetPackagePerformancesMutation();

  const [packageData, setPackageData] = useState(null);

  const HolidayPackagePerformance = async () => {
    try {
      delete filter?.type;
      delete filter?.filter;

      const response = await getPackagePerformances(filter).unwrap();
      setPackageData(response);
      console.log(response, "yo");
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };

  useEffect(() => {
    HolidayPackagePerformance();
  }, []);

  useEffect(() => {
    HolidayPackagePerformance();
  }, [filter]);

  console.log("packageData", packageData);

  return (
    <Box
      //height={{ base: "500px", md: "260px", lg: "360px" }}
      p="8"
      mt={22}
      borderRadius={17}
      bg="#fff"
    >
      <Heading color="primary" py="5">
        {getPackagePerformancesApiIsLoading ? "Loading..." : "Holiday"}
      </Heading>
      <>
        <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={10}>
          {packageData && (
            <>
              <DetailsCard
                title="Holiday Booking"
                date="16-08-2022"
                viewType="Daily View"
                filterType="date"
                type="holiday"
                setFilter={setFilter}
                filter={filter}
                details={[
                  {
                    icon: group,
                    title: "Total booking",
                    number: packageData
                      ? (packageData.day_total_booking || 0).toString()
                      : "0",
                  },
                  {
                    icon: mainTik,
                    title: "Total Traveller",
                    number: packageData
                      ? (
                          packageData.day_total_traveler?.passenger__sum || 0
                        ).toString()
                      : "0",
                  },
                  {
                    icon: screen,
                    title: "Total Amount",
                    number: packageData
                      ? parseInt(
                          packageData.day_total_amount?.amount__sum
                        ).toFixed(2) || 0
                      : "0",
                  },
                ]}
              />

              <DetailsCard
                title="Holiday Booking"
                date="16-08-2022"
                filterType="month"
                type="holiday"
                viewType="Monthly View"
                setFilter={setFilter}
                filter={filter}
                details={[
                  {
                    icon: group,
                    title: "Total Booking",
                    number: packageData
                      ? (packageData.month_total_booking || 0).toString()
                      : "0",
                  },
                  {
                    icon: mainTik,
                    title: "Total Traveller",
                    number: packageData
                      ? (
                          packageData.month_total_traveler?.passenger__sum || 0
                        ).toString()
                      : "0",
                  },
                  {
                    icon: screen,
                    title: "Total Amount",
                    number: packageData
                      ? parseInt(
                          packageData.month_total_amount?.amount__sum
                        ).toFixed(2)
                      : "0",
                  },
                ]}
              />

              <DetailsCard
                title="Holiday Booking"
                date="16-08-2022"
                filterType="year"
                type="holiday"
                viewType="Yearly View"
                setFilter={setFilter}
                filter={filter}
                details={[
                  {
                    icon: group,
                    title: "Total Booking",
                    number: packageData
                      ? (packageData.year_total_booking || 0).toString()
                      : "0",
                  },
                  {
                    icon: mainTik,
                    title: "Total Traveller",
                    number: packageData
                      ? (
                          packageData.year_total_traveler?.passenger__sum || 0
                        ).toString()
                      : "0",
                  },
                  {
                    icon: screen,
                    title: "Total Amount",
                    number: packageData
                      ? (
                          parseInt(
                            packageData.year_total_amount?.amount__sum
                          ).toFixed(2) || 0
                        ).toString()
                      : "0",
                  },
                ]}
              />
            </>
          )}
        </SimpleGrid>
        {packageData === null && !getPackagePerformancesApiIsLoading && (
          <Text w="full" textAlign="center" color="#B8BFCC">
            Data Not Found
          </Text>
        )}
      </>
      <Divider orientation="horizontal" my={3} />
    </Box>
  );
};

// for hotel booking component
const HotelBooking = ({ data }) => {
  let date = moment(new Date()).format("YYYY-MM-DD");
  let month = moment().format("L").split("/")[0];
  let year = moment().format("L").split("/")[2];

  const [filter, setFilter] = useState({
    type: "holiday",
    filter: "date",
    booking_date: "",
    month: "",
    year: "",
  });
  const [
    getHotelPerformances,
    {
      data: allHotelPerformancesData,
      error: getHotelPerformancesApiErr,
      isLoading: getHotelPerformancesApiIsLoading,
    },
  ] = useGetHotelPerformancesMutation();

  const [hotelPackageData, setHotelPackageData] = useState(null);
  const HotelPackagePerformance = async () => {
    try {
      delete filter?.type;
      delete filter?.filter;

      const response = await getHotelPerformances(filter).unwrap();
      setHotelPackageData(response);
      console.log(response, "yo");
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };
  useEffect(() => {
    HotelPackagePerformance();
  }, []);

  useEffect(() => {
    HotelPackagePerformance();
  }, [filter]);

  return (
    <Box
      //height={{ base: "500px", md: "260px", lg: "360px" }}
      p="8"
      mt={22}
      borderRadius={17}
      bg="#fff"
    >
      <Heading color="primary" py="5">
        {getHotelPerformancesApiIsLoading ? "Loading..." : "Hotel"}
      </Heading>
      <>
        <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={10}>
          {hotelPackageData && (
            <>
              <DetailsCard
                title="Hotel Booking"
                date="16-08-2022"
                viewType="Daily View"
                filterType="date"
                type="hotel"
                setFilter={setFilter}
                filter={filter}
                details={[
                  {
                    icon: group,
                    title: "Total Booking",
                    number: hotelPackageData
                      ? (hotelPackageData.day_total_booking || 0).toString()
                      : "0",
                  },
                  {
                    icon: mainTik,
                    title: "Total Traveller",
                    number: hotelPackageData
                      ? (
                          hotelPackageData.day_total_traveler?.passenger__sum ||
                          0
                        ).toString()
                      : "0",
                  },
                  {
                    icon: screen,
                    title: "Total Amount",
                    number: hotelPackageData
                      ? parseInt(
                          hotelPackageData.day_total_amount?.amount__sum
                        ).toFixed(2)
                      : "0",
                  },
                ]}
              />

              <DetailsCard
                title="Hotel Booking"
                date="16-08-2022"
                filterType="month"
                type="hotel"
                viewType="Monthly View"
                setFilter={setFilter}
                filter={filter}
                details={[
                  {
                    icon: group,
                    title: "Total Booking",
                    number: hotelPackageData
                      ? (hotelPackageData.month_total_booking || 0).toString()
                      : "0",
                  },
                  {
                    icon: mainTik,
                    title: "Total Traveller",
                    number: hotelPackageData
                      ? (
                          hotelPackageData.month_total_traveler
                            ?.passenger__sum || 0
                        ).toString()
                      : "0",
                  },
                  {
                    icon: screen,
                    title: "Total Amount",
                    number: hotelPackageData
                      ? parseInt(
                          hotelPackageData.month_total_amount?.amount__sum
                        ).toFixed(2)
                      : "0",
                  },
                ]}
              />
              <DetailsCard
                title="Hotel Booking"
                date="16-08-2022"
                filterType="year"
                type="hotel"
                viewType="Yearly  View"
                setFilter={setFilter}
                filter={filter}
                details={[
                  {
                    icon: group,
                    title: "Total Booking",
                    number: hotelPackageData
                      ? (hotelPackageData.year_total_booking || 0).toString()
                      : "0",
                  },
                  {
                    icon: mainTik,
                    title: "Total Traveller",
                    number: hotelPackageData
                      ? (
                          hotelPackageData.year_total_traveler
                            ?.passenger__sum || 0
                        ).toString()
                      : "0",
                  },
                  {
                    icon: screen,
                    title: "Total Amount",
                    number: hotelPackageData
                      ? parseInt(
                          hotelPackageData.year_total_amount?.amount__sum
                        ).toFixed(2)
                      : "0",
                  },
                ]}
              />
            </>
          )}
        </SimpleGrid>

        {hotelPackageData === null && !getHotelPerformancesApiIsLoading && (
          <Text w="full" textAlign="center" color="#B8BFCC">
            Data Not Found
          </Text>
        )}
      </>
      <Divider orientation="horizontal" my={3} />
    </Box>
  );
};

// for Sightseeing Booking  component
const SightseeingBooking = ({ data }) => {
  let date = moment(new Date()).format("YYYY-MM-DD");
  let month = moment().format("L").split("/")[0];
  let year = moment().format("L").split("/")[2];

  const [filter, setFilter] = useState({
    type: "holiday",
    filter: "date",
    booking_date: "",
    month: "",
    year: "",
    isLoading: false,
  });
  const [
    getSightseeingPerformances,
    {
      data: allSightseeingPerformancesData,
      error: getSightseeingPerformancesApiErr,
      isLoading: getSightseeingPerformancesApiIsLoading,
    },
  ] = useGetSightseeingPerformancesMutation();

  const [sightseeingData, setSightseeingData] = useState(null);

  const SightseeingPerformance = async () => {
    try {
      delete filter?.type;
      delete filter?.filter;

      const response = await getSightseeingPerformances(filter).unwrap();
      setSightseeingData(response);
      console.log(response, "yo");
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };

  useEffect(() => {
    SightseeingPerformance();
  }, []);

  useEffect(() => {
    SightseeingPerformance();
  }, [filter]);

  return (
    <Box
      //height={{ base: "500px", md: "260px", lg: "360px" }}
      p="8"
      mt={22}
      borderRadius={17}
      bg="#fff"
    >
      <Heading color="primary" py="5">
        Sightseeing
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={10}>
        {/* {data.map((el) => (
          <HolidayBookingCard item={el} />
        ))} */}

        {sightseeingData && (
          <>
            <DetailsCard
              title="Sightseeing Booking"
              date="16-08-2022"
              viewType="Daily View"
              filterType="date"
              type="sightseeing"
              setFilter={setFilter}
              filter={filter}
              details={[
                {
                  icon: group,
                  title: "Total Booking",
                  number: sightseeingData
                    ? (sightseeingData.day_total_booking || 0).toString()
                    : "0",
                },
                {
                  icon: mainTik,
                  title: "Total Traveller",
                  number: sightseeingData
                    ? (
                        sightseeingData.day_total_traveler?.passenger__sum || 0
                      ).toString()
                    : "0",
                },
                {
                  icon: screen,
                  title: "Total Amount",
                  number: sightseeingData
                    ? (
                        sightseeingData.day_total_amount?.amount__sum || 0
                      ).toString()
                    : "0",
                },
              ]}
            />

            <DetailsCard
              title="Sightseeing Booking"
              date="16-08-2022"
              filterType="month"
              viewType="Monthly View"
              type="sightseeing"
              setFilter={setFilter}
              filter={filter}
              details={[
                {
                  icon: group,
                  title: "Total Booking",
                  number: sightseeingData
                    ? (sightseeingData.month_total_booking || 0).toString()
                    : "0",
                },
                {
                  icon: mainTik,
                  title: "Total Traveller",
                  number: sightseeingData
                    ? (
                        sightseeingData.month_total_traveler?.passenger__sum ||
                        0
                      ).toString()
                    : "0",
                },
                {
                  icon: screen,
                  title: "Total Amount",
                  number: sightseeingData
                    ? (
                        sightseeingData.month_total_amount?.amount__sum || 0
                      ).toString()
                    : "0",
                },
              ]}
            />

            <DetailsCard
              title="Sightseeing Booking"
              date="16-08-2022"
              filterType="year"
              viewType="Yearly  View"
              type="sightseeing"
              setFilter={setFilter}
              filter={filter}
              details={[
                {
                  icon: group,
                  title: "Total Booking",
                  number: sightseeingData
                    ? (sightseeingData.year_total_booking || 0).toString()
                    : "0",
                },
                {
                  icon: mainTik,
                  title: "Total Traveller",
                  number: sightseeingData
                    ? (
                        sightseeingData.year_total_traveler?.passenger__sum || 0
                      ).toString()
                    : "0",
                },
                {
                  icon: screen,
                  title: "Total Amount",
                  number: sightseeingData
                    ? (
                        sightseeingData.year_total_amount?.amount__sum || 0
                      ).toString()
                    : "0",
                },
              ]}
            />
          </>
        )}
      </SimpleGrid>
      <Center>
        <Text w="full" textAlign="center" color="#B8BFCC">
          Data Not Found
        </Text>
      </Center>
      <Divider orientation="horizontal" my={3} />
    </Box>
  );
};

// for detailed card component
const DetailsCard = ({
  title,
  date,
  viewType,
  details,
  type,
  filterType,
  setFilter,
  filter,
}) => {
  const [startDate, setStartDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = () => {};
  const bookingFilter = (val, key, type, filter) => {
    console.log("val testing onchange --> ", val);
    let value = "";
    let selected_date = moment(val).format("YYYY-MM-DD");
    let selected_month = moment(val).format("L").split("/")[0];
    let selected_year = moment(val).format("L").split("/")[2];

    console.log("selected_date ->", selected_date);
    console.log("selected_month ->", selected_month);
    console.log("selected_year ->", selected_year);

    value =
      filter === "date"
        ? selected_date
        : filter === "month"
        ? `${selected_month}-${selected_year}`
        : selected_year;

    console.log("key ->", key);
    console.log("type ->", type);
    console.log("filter ->", filter);

    setFilter((prev) => ({
      ...prev,
      type: type,
      filter: filter,
      [key]: value,
      [type]: val,
      isLoading: true,
    }));
    // return date
    // setSelectedDate(date);
    // setStartDate(date);
  };

  console.log("details ---> ", details);

  console.log("moment.js ===> ", moment().format("L").split("/")[0]);

  return (
    <Box
      borderRadius={17}
      p={4}
      border="1px"
      borderColor="#e3e3e3"
      //  height="80px"
    >
      <Flex
        // direction={{ base: "column", sm: "flex" }}
        justifyItems="center"
        justifyContent="space-between"
      >
        <Text
          fontSize={{ base: "30px", md: "40px", lg: "25px" }}
          as="b"
          color="secondary"
          isTruncated
        >
          {title}
        </Text>

        {filterType === "date" && (
          <Box
            style={{
              color: "#ACACAC",
              padding: "9px",
              borderRadius: "20px",
              backgroundColor: "#F4F5F7",
              display: "flex",
              alignItems: "center",
            }}
          >
            <RiCalendar2Line size={28} style={{ marginRight: 6 }} />
            <DatePicker
              selected={filter?.[type] || new Date()}
              onChange={(date) =>
                bookingFilter(date, "booking_date", type, "date")
              }
              //  onSelect={handleDateSelect}
              dateFormat="dd/MM/yyyy"
              customInput={
                <input
                  type="text"
                  className="custom-datepicker-input"
                  value={startDate ? startDate.toLocaleDateString("en-US") : ""}
                  readOnly
                />
              }
              inputClassName="custom-datepicker-input" // Apply custom CSS class to input
            />
          </Box>
        )}

        {filterType === "month" && (
          <Box
            style={{
              color: "#ACACAC",
              padding: "9px ",
              borderRadius: "20px",
              backgroundColor: "#F4F5F7",
              display: "flex",
              alignItems: "center",
            }}
          >
            <RiCalendar2Line size={16} style={{ marginRight: 6 }} />
            <DatePicker
              selected={filter?.[type] || new Date()}
              onChange={(month) => bookingFilter(month, "month", type, "month")}
              showMonthYearPicker
              dateFormat="MM/yyyy"
              customInput={
                <input
                  type="text"
                  className="custom-datepicker-input"
                  value={
                    selectedDate
                      ? selectedDate.toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                      : ""
                  }
                  readOnly
                />
              }
              inputClassName="custom-datepicker-input" // Apply custom CSS class to input
            />
          </Box>
        )}

        {filterType === "year" && (
          <Box
            style={{
              color: "#ACACAC",
              padding: "9px 20px",
              borderRadius: "20px",
              backgroundColor: "#F4F5F7",
              display: "flex",
              alignItems: "center",
            }}
          >
            <RiCalendar2Line size={16} style={{ marginRight: 6 }} />
            <DatePicker
              selected={filter?.[type] || new Date()}
              onChange={(year) => bookingFilter(year, "year", type, "year")}
              showYearPicker
              dateFormat="yyyy"
              yearItemNumber={10}
              customInput={
                <button className="custom-datepicker-button">
                  {filter?.[type]
                    ? moment(filter[type]).format("YYYY")
                    : "Year"}
                </button>
              }
            />
          </Box>
        )}
      </Flex>

      <Box mt="20px">
        <Text
          fontSize={{ base: "20px", md: "25px", lg: "18px" }}
          as="l"
          color="primary"
          isTruncated
        >
          {viewType}
        </Text>

        <VStack spacing={4} align="stretch" mt={10}>
          {details.map((detail) => (
            <Box>
              <Flex w="100%" gap="3" alignItems="center" p="2">
                <Box borderRadius="50" bg="#F4F5F7">
                  <Image
                    sx={{ mx: "auto" }}
                    p="5"
                    objectFit="cover"
                    src={detail.icon}
                    alt="logo"
                  />
                </Box>

                <Box mx={4}>
                  <Text size="sm" color="#ACACAC">
                    {detail.title}
                  </Text>
                  <Heading color="secondary" fontSize={"3xl"}>
                    {detail.number ? detail.number : "loading..."}{" "}
                  </Heading>
                </Box>
              </Flex>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

/* Holiday Booking Inner Component End 2 */

// parseInt(detail.number)?.toFixed(2)
