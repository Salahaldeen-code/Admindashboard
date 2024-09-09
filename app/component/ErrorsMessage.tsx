import { Text } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

const ErrorsMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Text color={"red"} as="p">
      {children}
    </Text>
  );
};

export default ErrorsMessage;
