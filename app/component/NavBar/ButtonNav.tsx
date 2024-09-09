"use clint";
import React from "react";
import { Button, Link, StackDivider, VStack } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
interface porops {
  text: string;
  link: string;
}

const ButtonNav = ({ text, link }: porops) => {
  const route = useRouter();
  const pathname = usePathname();

  return (
    <Button
      onClick={() => {
        route.push(
          `${
            pathname === `/admin`
              ? `/admin/tables/${link}`
              : `/admin/tables/${link}`
          }`
        );
      }}
      _hover={{ bg: "gray" }}
      textColor={"white"}
      variant="ghost"
    >
      {text}
    </Button>
  );
};

export default ButtonNav;
