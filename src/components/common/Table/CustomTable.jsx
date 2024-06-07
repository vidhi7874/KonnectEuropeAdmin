import React, { useEffect } from "react";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { MdBuild } from "react-icons/md";
import { Search2Icon, PhoneIcon } from "@chakra-ui/icons";
import { render } from "@testing-library/react";
import DataTable from "react-data-table-component";
import { useDebouncedCallback } from "use-debounce";
import { exportData } from "../../../services/exportToCsv";
import { saveAs } from "file-saver";

const color = {
  primary: "#F95700",
  secondary: "#0090C5",
  textPrimary: "#5E6282",
  borderPrimary: "#E7E7E7",
  warning: "",
  danger: "",
  hoverBg: "rgba(249, 87, 0, 0.1);",
};

const customStyles = {
  rows: {
    style: {
      minHeight: "72px",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      color: color.primary,
      fontWeight: "600",
      fontSize: "1rem",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
};

// ----------------------------------------- //

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="16"
        // boxShadow="md"
        borderColor="borderPrimary"
        _checked={{
          bg: "secondary",
          color: "white",
          borderColor: "",
        }}
        _focus={
          {
            // boxShadow: "outline",
          }
        }
        px={8}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function FilterBtn({ options, onTabFilter }) {
  const test = () => {
    console.log("ontab filter");
  };
  const { getRootProps, getRadioProps } = useRadioGroup({
    // name: "framework",
    defaultValue: "All Agents",
    onChange: onTabFilter,
  });

  const group = getRootProps();

  // const actionsMemo = React.useMemo(
  //   () => <Export onExport={() => downloadCSV(data)} />,
  //   []
  // );

  return (
    <SimpleGrid
      columns={{ base: 1, md: 1, lg: 2, xl: 4 }}
      spacing={6}
      //w="100%"
      // border="1px"
      //w="850"
      {...group}
    >
      {options?.map((value) => {
        // const radio = getRadioProps({ name, totalCount });
        return (
          <RadioCard
            key={value.name}
            // w="3%"
            //  border="1px"
            //borderColor="red"
            variant="outline"
            {...getRadioProps({
              value: value.title,
            })}
          >
            <>
              <Badge
                py="2"
                px="3"
                mb={5}
                borderRadius={8}
                bg="white"
                variant="outline"
                border="borderPrimary"
                color="secondary"
              >
                {value.totalCount}
              </Badge>

              <Box
                fontSize={{
                  base: "14",
                  md: "15",
                }}
                //  border="1px"
                //maxW={190}
              >
                {value.name}
              </Box>
            </>
          </RadioCard>
        );
      })}
    </SimpleGrid>
  );
}

const CustomTable = ({
  data,
  columns,
  onSearchFilter,
  onTabFilter,
  tableFilterBtnList,
  isLoading,
  total,
  setPagination,
}) => {
  const [filterText, setFilterText] = React.useState("");
  const [filterData, setFilterData] = React.useState([]);
  const [isConverting, setIsConverting] = React.useState(false);
  let data_copy = data || [];

  console.log("data ------------------------>", data);

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  // const filteredItems =
  //   data &&
  //   data.filter(
  //     (item) =>
  //       item.agency_name &&
  //       item.agency_name.toLowerCase().includes(filterText.toLowerCase())
  //   );

  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        //  setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    const handleExport = () => {
      setIsConverting(true);
      const csvData = exportData.convertToCSV(data, columns); // Convert data to CSV format
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "data.csv"); // Save file using FileSaver.js
      setIsConverting(false);
    };

    return (
      <Box w="100%" mb={10}>
        <TableFilterBtn
          options={tableFilterBtnList}
          // onFilter={(e) => setFilterText(e.target.value)}
          onFilter={(val) => {
            console.log("testing on search text ---> -=", val);
            setFilterText(val);
            onSearchFilter(val);
            // setPagination(val);
          }}
          onTabFilter={(val) => onTabFilter(val)}
          onClear={handleClear}
          filterText={filterText}
          handleExport={() => handleExport()}
          isConverting={isConverting}
        />
      </Box>
    );
  }, [data, filterText]);

  const handlePerRowsChange = async (newPerPage, page) => {
    console.log("handlePerRowsChange --->", newPerPage, page);
    setPagination((prev) => ({
      ...prev,
      limit: newPerPage,
      page: page,
      pagination: true,
    }));
  };

  const handlePageChange = (e) => {
    console.log("handlePageChange --->", e);
    setPagination((prev) => ({ ...prev, page: e, pagination: true }));
  };

  //console.log("filteredItems ---> ", filteredItems);

  // const filteredData = filteredItems.filter((item) =>
  //   item.name.toLowerCase().includes(searchText.toLowerCase())
  // );

  return (
    <DataTable
      pagination
      striped={false}
      highlightOnHover={true}
      fixedHeader={true}
      fixedHeaderScrollHeight="520px"
      columns={columns}
      // data={filteredData}
      data={data}
      onSort={handleSort}
      customStyles={customStyles}
      paginationTotalRows={total}
      subHeader={true}
      subHeaderComponent={subHeaderComponentMemo}
      progressPending={isLoading}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      paginationServer
      // actions={actionsMemo}
    />
  );
};

export default CustomTable;

const TableFilterBtn = ({
  options,
  onTabFilter,
  onFilter,
  filterText,
  handleExport,
  isConverting,
}) => {
  return (
    // <Grid columns={{ base: 1, md: 1, lg: 1, xl: 2 }} spacing={10}>
    <Box>
      <Box p="3" display="flex" justifyContent="right" w="100%">
        <Box mb="10">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              mt="1"
              children={<Search2Icon color="gray.300" />}
            />
            <Input
              w={60}
              py="6"
              type="text"
              borderRadius={16}
              placeholder="Search..."
              value={filterText}
              onChange={(e) => onFilter(e.target.value)}
            />
          </InputGroup>
        </Box>
      </Box>

      <Flex
        direction={{ base: "column", md: "column", xl: "row" }}
        justify={{
          base: "flex-start",
          md: "space-between",
          lg: "space-between",
        }}
        // align={{ base: "center", md: "stretch" }}
        // wrap={{ base: "wrap" }}
        gap="3"
      >
        <Box>
          <FilterBtn options={options} onTabFilter={onTabFilter} />
        </Box>

        <Box>
          <Flex
            gap="2"
            //border="1px"
            // justifyContent="between"
            direction={{ base: "column", md: "row" }}
            justify={{
              base: "flex-start",
              md: "space-between",
              lg: "space-between",
            }}
            //direction={{ base: "flex", md: "flex" }}
            //direction={{ base: "column", md: "row" }}
          >
            <Box display="flex" justifyContent="flex-end">
              <Box>
                <ButtonGroup size="sm" isAttached variant="outline">
                  <Button
                    bg="secondary"
                    color="white"
                    borderRadius={12}
                    px={10}
                    py={6}
                    isLoading={isConverting}
                    _hover={{}}
                    onClick={() => handleExport()}
                  >
                    Export
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
