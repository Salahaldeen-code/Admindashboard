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
import React, { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
const GeneralInfoTable = ({ children }: PropsWithChildren) => {
  const route = useRouter();

  return (
    <div>
      <TableContainer borderRadius={0}>
        <Table size="lg">
          <Thead>
            <Tr bg={"#2D3748"}>
              <Th color={"white"}>Title</Th>
              <Th color={"white"}>Small Description</Th>
              <Th color={"white"}>Long Description </Th>
              <Th color={"white"}>Created At</Th>
              <Th color={"white"}>Deleted At </Th>
              <Th color={"white"} isNumeric>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => route.push("/admin/generalInfo/new")}
                >
                  Create
                </Button>{" "}
              </Th>
            </Tr>
          </Thead>
          <Tbody bg={"#CBD5E0"}>{children}</Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GeneralInfoTable;
