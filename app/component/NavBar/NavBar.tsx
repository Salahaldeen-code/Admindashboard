"use client";
import { Button, StackDivider, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import ButtonNav from "./ButtonNav";

const NavBar = () => {
  return (
    <div>
      <VStack spacing={4} align="stretch" marginTop={12}>
        <ButtonNav link="partners" text="Partners"></ButtonNav>
        <ButtonNav link="services" text="Services"></ButtonNav>
        <ButtonNav link="experience" text="Experiernce"></ButtonNav>
        <ButtonNav link="certificates" text="Certificates"></ButtonNav>
        <ButtonNav link="eventnews" text="Event&News"></ButtonNav>
        <ButtonNav link="teamsdirectors" text="Team&Directors"></ButtonNav>
        <ButtonNav link="conatct" text="Contact"></ButtonNav>
        <ButtonNav link="generalInfo" text="GeneralInfo"></ButtonNav>
      </VStack>
    </div>
  );
};

export default NavBar;
