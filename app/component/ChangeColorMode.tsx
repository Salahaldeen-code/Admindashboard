"use client"; // Add this line at the top of the file

import { Text, HStack, Switch, useColorMode } from "@chakra-ui/react";

export default function Example() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack>
      <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
      <Text>Dark Mode</Text>
    </HStack>
  );
}
