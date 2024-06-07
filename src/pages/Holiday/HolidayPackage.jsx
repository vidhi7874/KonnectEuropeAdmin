import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import CustomTable from "../../components/common/Table/CustomTable";
import { Search2Icon } from "@chakra-ui/icons";
import { useAllHolidayPackageMutation } from "../../features/holidayPackageApi.slice";

const HolidayPackage = () => {
  const [allHolidayPackages, setAllHolidayPackages] = useState([]);
  const [holidayPackageDataList, setHolidayPackageDataList] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [travelAgentData, setTravelAgentData] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenShowDetailsModal, setIsOpenShowDetailsModal] = React.useState({
    show: false,
  });

  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    pagination: false,
    // booking_status: "pending",
  });
  // const [allAgents, { error: errGetAgent, isLoading: getAgentIsLoading }] =
  //   useAllAgentsMutation();

  const showAgentDetails = (row) => {
    let id = row?.id;
    console.log("row details --> ", row);
    setIsOpenShowDetailsModal((prev) => ({
      ...prev,
      show: true,
      id: id,
    }));
  };

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();
  ``;
  const editHolidayPackage = (row) => {
    console.log("row --> ", row);
    //  window.open("holiday-packages/attraction", "_blank"); //
  };

  const columns = [
    {
      name: "Tour code",
      selector: "id",
      sortable: true,
      cell: (row) => (
        <Badge
          cursor="pointer"
          color="blue.400"
          //onClick={() => editHolidayPackage(row)}
        >
          <Link to="/holiday-packages/attraction" state={{ id: row.id }}>
            {row.id.toString().toUpperCase()}
          </Link>
        </Badge>
      ),
    },
    {
      name: "Package Name",
      selector: "package_name",
      sortable: true,
      cell: (row) => row.package_name || "N/A",
    },
    {
      name: "Duration",
      selector: "days",
      sortable: true,
      cell: (row) => `${row.nights} nights ${row.days} days ` || "N/A",
    },
    {
      name: "Start Date",
      selector: "validity_start_date",
      sortable: true,
      cell: (row) => row.validity_start_date || "N/A",
    },
    {
      name: "End Date",
      selector: "validity_end_date",
      sortable: true,
      cell: (row) => row.validity_end_date || "N/A",
    },
    {
      name: "Price",
      selector: "price_per_people",
      sortable: true,
      cell: (row) => row.price_per_people || "N/A",
    },
    {
      name: "Status",
      selector: "is_active",
      sortable: true,
      cell: (row) => (
        <Badge
          px="5"
          py="3"
          borderRadius={7}
          bg={row.is_active ? "green.100" : "red.100"}
          color={row.is_active ? "green.500" : "red.500"}
        >
          {row.is_active ? "Active" : "DeActive"}
        </Badge>
      ),
    },
  ];

  const details = {
    tragelAgentDetails: [
      {
        compnayName: "  Xyeu pvt. ltd  ",
        contactPersonName: "Mr. jdhsg ",
        companyRegistrationNumber: "24APAaaa",
        agentCode: "KEL44454",
      },
    ],
    travelAgentContact: [
      {
        contactNo: "+91 9537642005",
        email: "ankitmb15@gmail.com",
        companyAddress: "510/11 Shivalik shilp",
        city: "ahemdabad",
        area: 3883883,
        country: "india",
      },
    ],
  };

  const agentDetails = {
    agency_name: "ankit",
    agency_contact: "339243234",
    agency_reg_no: "2223232",
    agency_email: "ankitmb15@gmail.com",
    address: "shivalik place",
    city: "ahemdabad",
    state: "gujarat",
    country: "india",
    zip_code: "25478",
    agent_proof: "",
    company_Agent_id_proof: "",
    user_oto: "",
    sales_link: "",
  };

  const debounced = useDebouncedCallback((value) => {
    setPagination((prev) => ({ ...prev, search: value }));
  }, 800);

  const [
    allHolidayPackage,
    {
      error: allHolidayPackageApiErr,
      isLoading: allHolidayPackageApiIsLoading,
    },
  ] = useAllHolidayPackageMutation();

  const onSearchFilter = (text) => {
    console.log("testing abc 123 ---->");
    debounced(text);
  };

  const onTabFilter = (val) => {
    console.log("onTabFilter called --->", allHolidayPackages, val);

    //debounced(text);
    console.log("el status ==", val);
    let arr = [];

    if (val === "active") {
      arr = allHolidayPackages.filter((el) => el?.is_active);
    }
    if (val === "deActive") {
      arr = allHolidayPackages.filter((el) => !el?.is_active);
    }

    if (val === "all") {
      arr = [...allHolidayPackages];
    }

    console.log("dddd --> ", arr);
    setHolidayPackageDataList(arr);
  };

  const tableFilterBtnList = [
    {
      name: "Activated Agents",
      title: "active",
      totalCount: allHolidayPackages.filter((item) => item.is_active).length,
    },

    {
      name: "Deactivated Pending",
      title: "deActive",
      totalCount: allHolidayPackages.filter((item) => !item.is_active).length,
    },
    {
      name: "All Agents",
      title: "all",
      totalCount: allHolidayPackages.length,
    },
  ];

  const addAgent = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const fetchAllHolidayPackage = async () => {
    try {
      const res = await allHolidayPackage(pagination).unwrap();
      //  const res = await getAllVouchers(pagination).unwrap();
      console.log(" fetchAllHolidayPackage api res --> ", res);
      if (res?.results) {
        setHolidayPackageDataList(res.results);
        setTotalData(res.total);
        setAllHolidayPackages(res.results);
      }
    } catch (err) {
      console.log(err);
      // ThrowErrors({}, error?.status);
    }
  };

  const handleAddPackageClick = () => {
    window.open("holiday-packages/attraction", "_blank"); // Replace '/attraction' with the actual URL or route of the "Attraction" component
  };

  // Function to handle pagination changes
  const handlePaginationChange = ({ page, perPage }) => {
    const skip = (page - 1) * perPage;
    setPagination((prevPagination) => ({
      ...prevPagination,
      first: perPage,
      skip: skip,
    }));
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log("handlePerRowsChange --->", newPerPage, page);
    //setPagination((prev) => ({ ...prev, limit: newPerPage, pagination: true }));
  };

  useEffect(() => {
    fetchAllHolidayPackage();
  }, [pagination]);

  return (
    <Box
      borderRadius={25}
      m={{ base: "90px 0px", md: "112px 0px", lg: "112px 0px" }}
      // h="calc(100vh - 0vh)"
      w="100%"
      p={6}
      bg="white"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        // justify={{
        //   base: "flex-start",
        //   md: "space-between",
        //   lg: "space-between",
        // }}
        minWidth="max-content"
        // alignItems="center"
        gap="2"
      >
        <Box p="2">
          <Text
            fontSize={{ base: "30px", md: "40px", lg: "25px" }}
            as="b"
            color="primary"
            isTruncated
          >
            Holiday Package
          </Text>
        </Box>
        <Spacer />
        <ButtonGroup
          gap="2"
          // border="1px"
          display={{ base: "flex" }}
          justifyContent="flex-end"
        >
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button
              borderRadius={15}
              p={6}
              color="#ADB8CC"
              onClick={handleAddPackageClick}
            >
              {" "}
              + Add package
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </Flex>

      {/* table */}

      <Box mt="16">
        <CustomTable
          data={holidayPackageDataList}
          tableFilterBtnList={tableFilterBtnList}
          columns={columns}
          onTabFilter={onTabFilter}
          onSearchFilter={onSearchFilter}
          pagination
          paginationServer
          isLoading={allHolidayPackageApiIsLoading}
          paginationTotalRows={totalData}
          paginationPerPage={pagination?.first}
          paginationDefaultPage={
            Math.ceil(pagination.skip / pagination.first) + 1
          }
          setPagination={setPagination}
          onChangePage={handlePaginationChange}
          onChangeRowsPerPage={handlePerRowsChange}
        />
      </Box>
      {/* const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] */}
      {isOpen && (
        <CustomModal
          title="Add New Agent"
          isCentered="true"
          closeOnOverlayClick="false"
          scrollBehavior="inside"
          motionPreset="slideInBottom"
          size="6xl"
          textAlign="center"
          isOpen={isOpen}
          onClose={() => onClose()}
        >
          <AgentForm />
        </CustomModal>
      )}

      {isOpenShowDetailsModal?.show && (
        <CustomModal
          title=""
          isCentered="true"
          closeOnOverlayClick="false"
          scrollBehavior="inside"
          motionPreset="slideInBottom"
          size="3xl"
          textAlign="center"
          isOpen={isOpenShowDetailsModal?.show}
          onClose={() =>
            setIsOpenShowDetailsModal((prev) => ({ ...prev, show: false }))
          }
        >
          <EditAgentDetailsModal
            id={isOpenShowDetailsModal.id}
            details={agentDetails}
            errors={errors}
            setValue={setValue}
            register={register}
          />
        </CustomModal>
      )}
    </Box>
  );
};

export default HolidayPackage;
