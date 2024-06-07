import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useGetSalesSupportListMutation } from "../../features/teamApi.slice";
import { useDebouncedCallback } from "use-debounce";
import CustomTable from "../../components/common/Table/CustomTable";

const SalesSupport = () => {
  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    pagination: false,
  });

  const [totalRows, setTotalRows] = useState(0);
  const [dataList, setDataList] = React.useState([]);
  const [mainList, setMainList] = React.useState([]);

  const [
    getSalesSupportList,
    { error: getSalesSupportApiErr, isLoading: getSalesSupportApiIsLoading },
  ] = useGetSalesSupportListMutation();

  const columns = [
    {
      name: "Agent id",
      selector: "id",
      sortable: true,
      cell: (row) => (
        <Badge cursor="pointer" color="blue.400">
          {row?.id?.toString().toUpperCase()}
        </Badge>
      ),
    },
    {
      name: "Company name",
      selector: "Konnect_Europe",
      sortable: true,
      cell: () => "Konnect Europe",
    },
    {
      name: "City",
      selector: "row.region",
      sortable: true,
      cell: (row) => row.region || "N/A",
    },
    {
      name: "person Name",
      selector: "first_name",
      sortable: true,
      cell: (row) => row.user_oto.first_name || "N/A",
    },
    {
      name: "Status",
      selector: "user_oto.status",
      sortable: true,
      cell: (row) => (
        <Box cursor="pointer" display="flex" alignItems="center" gap="2">
          <Box p="4" borderRadius={7} bg="#F9E5DE">
            <svg
              width="20"
              height="20"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.5 1.18182C3.56285 1.18182 1.18182 3.56285 1.18182 6.5C1.18182 9.43715 3.56285 11.8182 6.5 11.8182C9.43715 11.8182 11.8182 9.43715 11.8182 6.5C11.8182 3.56285 9.43715 1.18182 6.5 1.18182ZM0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5C13 10.0899 10.0899 13 6.5 13C2.91015 13 0 10.0899 0 6.5Z"
                fill="#F08F1A"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.50009 5.91016C6.82644 5.91016 7.091 6.17472 7.091 6.50107V8.8647C7.091 9.19105 6.82644 9.45561 6.50009 9.45561C6.17374 9.45561 5.90918 9.19105 5.90918 8.8647V6.50107C5.90918 6.17472 6.17374 5.91016 6.50009 5.91016Z"
                fill="#F08F1A"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.90918 4.13778C5.90918 3.81143 6.17374 3.54688 6.50009 3.54688H6.506C6.83235 3.54688 7.09691 3.81143 7.09691 4.13778C7.09691 4.46413 6.83235 4.72869 6.506 4.72869H6.50009C6.17374 4.72869 5.90918 4.46413 5.90918 4.13778Z"
                fill="#F08F1A"
              />
            </svg>
          </Box>
          <Box p="4" borderRadius={7} bg="#F9E5DE">
            <svg
              width="20"
              height="20"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6305 4.3329C11.3539 3.53646 10.8838 2.82439 10.264 2.26314C9.64417 1.70189 8.89492 1.30975 8.08614 1.12331C7.27735 0.936864 6.4354 0.962199 5.63882 1.19695C4.84225 1.43169 4.11702 1.8682 3.53082 2.46574L1 4.8886M12.9996 7.1114L10.4688 9.53426C9.88255 10.1318 9.15733 10.5683 8.36075 10.8031C7.56418 11.0378 6.72222 11.0631 5.91344 10.8767C5.10465 10.6903 4.35541 10.2981 3.73561 9.73686C3.11582 9.17561 2.64567 8.46354 2.36904 7.66711"
                stroke="#EC5D2B"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Box>
          <Box p="4" borderRadius={7} bg="#F9E5DE">
            <svg
              width="20"
              height="20"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 3.39844H2.22222H12"
                stroke="#EB7500"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.7777 3.4V11.8C10.7777 12.1183 10.649 12.4235 10.4197 12.6485C10.1905 12.8736 9.87965 13 9.5555 13H3.44439C3.12024 13 2.80936 12.8736 2.58015 12.6485C2.35094 12.4235 2.22217 12.1183 2.22217 11.8V3.4M4.0555 3.4V2.2C4.0555 1.88174 4.18427 1.57652 4.41348 1.35147C4.64269 1.12643 4.95357 1 5.27772 1H7.72217C8.04632 1 8.3572 1.12643 8.58641 1.35147C8.81562 1.57652 8.94439 1.88174 8.94439 2.2V3.4"
                stroke="#EB7500"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Box>
        </Box>
      ),
    },
  ];

  const debounced = useDebouncedCallback((value) => {
    setPagination((prev) => ({ ...prev, search: value }));
  }, 800);

  const onSearchFilter = (text) => {
    console.log("testing abc 123 ---->", text);
    debounced(text);
  };

  const onTabFilter = (val) => {
    console.log("onTabFilter called --->", dataList, val);
    let arr = [];

    arr =
      val !== "all"
        ? mainList.filter((el) => el.user_oto.status == val)
        : mainList;

    console.log("dddd --> ", arr);
    setDataList(arr);
  };

  const tableFilterBtnList = [
    {
      name: "Activated Agents",
      title: "active",
      totalCount: mainList.filter((item) => item.user_oto.status === "active")
        .length,
    },
    {
      name: "Approval Pending",
      title: "pending",
      totalCount: mainList.filter((item) => item.user_oto.status === "pending")
        .length,
    },
    {
      name: "Deactivated Pending",
      title: "deactive",
      totalCount: mainList.filter((item) => item.user_oto.status === "deactive")
        .length,
    },
    {
      name: "All Agents",
      title: "all",
      totalCount: mainList.length,
    },
  ];

  const fetchList = async () => {
    try {
      const res = await getSalesSupportList(pagination).unwrap();

      if (res.results) {
        setMainList(res.results);
        setDataList(res.results || []);
        setTotalRows(res.total);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log("handlePerRowsChange --->", newPerPage, page);
    setPagination((prev) => ({ ...prev, limit: newPerPage, pagination: true }));
  };

  const handlePageChange = (e) => {
    console.log("handlePageChange --->", e);
    setPagination((prev) => ({ ...prev, page: e, pagination: true }));
  };

  useEffect(() => {
    fetchList();
  }, [pagination]);

  return (
    <Box
      borderRadius={25}
      m={{ base: "90px 0px", md: "112px 0px", lg: "112px 0px" }}
      w="100%"
      p={6}
      bg="white"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        minWidth="max-content"
        gap="2"
      >
        <Box p="2">
          <Text
            fontSize={{ base: "30px", md: "40px", lg: "25px" }}
            as="b"
            color="primary"
            isTruncated
          >
            Sales & Support
          </Text>
        </Box>
        <Spacer />
        <ButtonGroup
          gap="2"
          display={{ base: "flex" }}
          justifyContent="flex-end"
        >
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button borderRadius={15} p={6} color="#ADB8CC">
              {" "}
              + Add Sales
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </Flex>
      <Box mt="16">
        <CustomTable
          data={dataList}
          tableFilterBtnList={tableFilterBtnList}
          isLoading={getSalesSupportApiIsLoading}
          columns={columns}
          onTabFilter={onTabFilter}
          onSearchFilter={onSearchFilter}
          pagination
          paginationServer
          paginationPerPage={pagination.first}
          total={totalRows}
          paginationDefaultPage={
            Math.ceil(pagination.skip / pagination.first) + 1
          }
          setPagination={setPagination}
          onChangePage={handlePerRowsChange}
          onChangeRowsPerPage={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default SalesSupport;
