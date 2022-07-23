import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function MyTable() {
  return (
    <TableContainer
      bg="white"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Table>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th isNumeric>Precio</Th>
            <Th>Tipo</Th>
            <Th>Fecha</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td isNumeric>$25.4</Td>
            <Td>millimetres (mm)</Td>
            <Td>
              {new Date().toLocaleString("es-AR", { dateStyle: "short" })}
            </Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td isNumeric>$30.48</Td>
            <Td>centimetres (cm)</Td>
            <Td>
              {new Date().toLocaleString("es-AR", { dateStyle: "short" })}
            </Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td isNumeric>$0.91444</Td>
            <Td>metres (m)</Td>
            <Td>
              {new Date().toLocaleString("es-AR", { dateStyle: "short" })}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default MyTable;
