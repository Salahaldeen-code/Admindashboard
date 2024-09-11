"use client";

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
import { useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";

const ExperienceTable = ({children}: PropsWithChildren) => {
  const route = useRouter();

  return (
    <div>
      <TableContainer borderRadius={0}>
        <Table size="lg">
          <Thead>
            <Tr bg={"#2D3748"}>
              <Th color={"white"}>Title</Th>
              <Th color={"white"}>Description</Th>
              <Th color={"white"}>Logo</Th>
              <Th color={"white"}>Date</Th>
              <Th color={"white"}>Created At</Th>
              <Th color={"white"}>Updated At</Th>
              <Th color={"white"} isNumeric>
              <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => route.push("/admin/experiences/new")}
                >
                  Create
                </Button>{" "}
              </Th>
            </Tr>
          </Thead>
          <Tbody bg={"#CBD5E0"}>
           {children}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExperienceTable;
