"use clint";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";

const ServicesTable = () => {
  return (
    <div>
      <TableContainer borderRadius={0}>
        <Table size="lg">
          <Thead>
            <Tr bg={"#2D3748"}>
              <Th color={"white"}>Title </Th>
              <Th color={"white"}>Long Description </Th>
              <Th color={"white"}>Short Descriptionlg </Th>
              <Th color={"white"}>Image </Th>
              <Th color={"white"}>Icon by</Th>
              <Th color={"white"}>Created At</Th>
              <Th color={"white"}>Updated At</Th>
              <Th color={"white"} isNumeric>
                <Button colorScheme="teal" variant="outline">
                  create
                </Button>{" "}
              </Th>
            </Tr>
          </Thead>
          <Tbody bg={"#CBD5E0"}></Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ServicesTable;
