import React, { useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Tooltip,
  IconButton,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Center,
  Box,
} from "@chakra-ui/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { format } from "date-fns";
import SearchInput from "./SearchInput";

let pesosARG = Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  useGrouping: true,
});

const COLUMNS = [
  {
    Header: "id",
    accessor: "id",
  },
  {
    Header: "Nombre",
    accessor: "name",
  },
  {
    Header: "Cantidad",
    accessor: "amount",
    Cell: ({ value }) => {
      return `${pesosARG.format(value)}`;
    },
  },
  {
    Header: "Tipo",
    accessor: "type",
    Cell: ({ value }) => {
      if (value === "egress") return "Egreso";
      if (value === "ingress") return "Ingreso";
      return value;
    },
  },
  {
    Header: "Fecha",
    accessor: "date",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
];

function MyTable() {
  const { user } = useSelector((state) => state.user);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => user.wallet.transactions, [user]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { pageIndex, globalFilter } = state;

  return (
    <>
      <TableContainer>
        <SearchInput filter={globalFilter} setFilter={setGlobalFilter} />

        <Table
          {...getTableProps()}
          variant="striped"
          colorScheme="gray"
          backgroundColor="white"
          borderWidth={1}
          borderRadius="lg"
        >
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    bg="gray.600"
                    textColor="white"
                    textAlign="center"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▼"
                          : " ▲"
                        : ""}
                    </span>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Center p={2} w="100%" bg="gray.600" mt={"-32px"} maxW="568px">
        <Flex justifyContent="space-between" alignItems="center" columnGap={5}>
          <Center>
            <IconButton
              size="sm"
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
            />
          </Center>
          <Center>
            <IconButton
              size="sm"
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Center>

          <Center>
            <Text flexShrink="0" textColor="white">
              Page{" "}
              <Text fontWeight="bold" as="span">
                {pageIndex + 1}
              </Text>{" "}
              of{" "}
              <Text fontWeight="bold" as="span">
                {pageOptions.length}
              </Text>
            </Text>
          </Center>

          <Center>
            <IconButton
              size="sm"
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Center>
          <Center>
            <IconButton
              size="sm"
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
            />
          </Center>
        </Flex>
      </Center>
    </>
  );
}

export default MyTable;
