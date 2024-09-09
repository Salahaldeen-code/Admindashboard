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

const ExperienceTable = () => {
  return (
    <div>
      <TableContainer borderRadius={0}>
        <Table size="lg">
          <Thead>
            <Tr bg={"#2D3748"}>
              <Th color={"white"}>To convert</Th>
              <Th color={"white"}>into</Th>
              <Th color={"white"}>multiply by</Th>
              <Th color={"white"}>into</Th>
              <Th color={"white"}>multiply by</Th>
              <Th color={"white"} isNumeric>
                <Button colorScheme="teal" variant="outline">
                  create
                </Button>{" "}
              </Th>
            </Tr>
          </Thead>
          <Tbody bg={"#CBD5E0"}>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td>25.4</Td>
              <Td>millimetres (mm)</Td>
              <Td>25.4</Td>
              <Td isNumeric>
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Send email"
                  icon={<DeleteIcon />}
                />
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Send email"
                  marginLeft={2}
                  icon={<EditIcon />}
                />
              </Td>{" "}
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td>30.48</Td>
              <Td>centimetres (cm)</Td>
              <Td>30.48</Td>
              <Td isNumeric>
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Send email"
                  icon={<DeleteIcon />}
                />
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Send email"
                  marginLeft={2}
                  icon={<EditIcon />}
                />
              </Td>{" "}
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td>0.91444</Td>
              <Td>0.cvx</Td>
              <Td>0.91444</Td>
              <Td isNumeric>
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Send email"
                  icon={<DeleteIcon />}
                />
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Send email"
                  marginLeft={2}
                  icon={<EditIcon />}
                />
              </Td>{" "}
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExperienceTable;
