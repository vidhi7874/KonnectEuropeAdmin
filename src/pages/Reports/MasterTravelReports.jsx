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
import { useDebouncedCallback } from "use-debounce";
import CustomTable from "../../components/common/Table/CustomTable";
import { useGetMasterTravelReportMutation } from "../../features/reportsApi.slice";

const MasterTravelReports = () => {
  const [pagination, setPagination] = useState({
    limit: 10,
    page: 1,
    pagination: false,
  });

  const [totalRows, setTotalRows] = useState(0);
  const [dataList, setDataList] = React.useState([]);
  const [mainList, setMainList] = React.useState([]);

  const [getMasterTravelReport, { error: apiErr, isLoading: apiIsLoading }] =
    useGetMasterTravelReportMutation();

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
      name: "country",
      selector: "row.country",
      sortable: true,
      cell: (row) => row.country || "N/A",
    },
    {
      name: "Agency Name",
      selector: "agency_name",
      sortable: true,
      cell: (row) => `${row.agency_name}` || "N/A",
    },
    {
      name: "Agency Email",
      selector: "agency_email",
      sortable: true,
      cell: (row) => `${row.agency_email}` || "N/A",
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
      const res = await getMasterTravelReport(pagination).unwrap();
      console.log("master sales report --> ", res);
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
            Master Travel Report
          </Text>
        </Box>
      </Flex>
      <Box mt="16">
        <CustomTable
          data={dataList}
          tableFilterBtnList={[]}
          isLoading={apiIsLoading}
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

export default MasterTravelReports;
