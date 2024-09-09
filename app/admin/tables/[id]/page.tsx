import React from "react";

import {
  ChakraProvider,
  Grid,
  GridItem,
  IconButton,
  Show,
  Td,
  Tr,
} from "@chakra-ui/react";
import NavBar from "../../../component/NavBar/NavBar";
import EventAndNewsTable from "../../../component/TableMain/EventAndeNews/EventAndeNewsTable";
import { PrismaClient } from "@prisma/client";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import ServicesDeleteButton from "../../services/DeleteButton";
import PartnersDeleteButton from "../../partners/DeleteButton";
import DeleteButton from "../../eventsnews/DeleteButton";

import PartnersTable from "@/app/component/TableMain/Partners/PartnersTable";
import ServicesTable from "@/app/component/TableMain/Services/ServiceTable";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const prisma = new PrismaClient();
  const newsAndEvents = await prisma.newsEvents.findMany();
  const partners = await prisma.partners.findMany();
  const services = await prisma.services.findMany();

  return (
    <Grid
      templateAreas={{
        lg: `"header header"
                  "nav main"
                  "footer footer"`,
        base: `"header header""main main""footer footer"`,
      }}
      gridTemplateRows={"50px 1fr 30px"}
      gridTemplateColumns={"150px 1fr"}
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" bg="orange.300" area={"header"}>
        Header
      </GridItem>
      <Show above={"lg"}>
        <GridItem pl="2" bg="#2D3748" area={"nav"}>
          <NavBar />
        </GridItem>
      </Show>

      <GridItem bg="#E2E8F0" area={"main"}>
        {/*PartinerTable */}
        {params.id === "partners" && (
          <PartnersTable>
            {partners.map((partner) => (
              <Tr key={partner.id}>
                <Td> {partner.name}</Td>
                <Td>
                  <img
                    src={partner.logo!}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></img>
                </Td>
                <Td> {partner.createdAt.toDateString()}</Td>
                <Td> {partner.updatedAt.toDateString()}</Td>

                <Td isNumeric>
                  <PartnersDeleteButton
                    partnerId={partner.id}
                  ></PartnersDeleteButton>

                  <Link href={`/admin/partners/${partner.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </PartnersTable>
        )}

        {/*ServicesTable */}
        {params.id === "services" && (
          <ServicesTable>
            {services.map((service) => (
              <Tr key={service.id}>
                <Td> {service.title}</Td>
                <Td> {service.descriptionM}</Td>
                <Td> {service.descriptionL}</Td>
                <Td>
                  <img
                    src={service.icon}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></img>
                </Td>
                <Td>
                  <img
                    src={service.image!}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></img>
                </Td>
                <Td> {service.createdAt.toDateString()}</Td>
                <Td> {service.updatedAt.toDateString()}</Td>

                <Td isNumeric>
                  <ServicesDeleteButton
                    servicesId={service.id}
                  ></ServicesDeleteButton>

                  <Link href={`/admin/services/${service.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </ServicesTable>
        )}

        {/* EventAndNewsTable */}
        {params.id === "eventnews" && (
          <EventAndNewsTable>
            {newsAndEvents.map((event) => (
              <Tr key={event.id}>
                <Td> {event.title}</Td>
                <Td> {event.description}</Td>
                <Td> {event.short_description}</Td>
                <Td> {event.date}</Td>
                <Td>
                  <img
                    src={event.image!}
                    alt="huih"
                    style={{ maxWidth: "100px" }}
                  ></img>
                </Td>
                <Td> {event.createdAt.toDateString()}</Td>
                <Td> {event.updatedAt.toDateString()}</Td>

                <Td isNumeric>
                  <DeleteButton newsEventsId={event.id}></DeleteButton>
                  <Link href={`/admin/eventsnews/${event.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit event"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </EventAndNewsTable>
        )}
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default page;
