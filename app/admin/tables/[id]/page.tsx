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
import NavBar from "@/app/component/NavBar/NavBar";
import EventAndNewsForm from "@/app/component/CreateNew/EventAndNews/EventAndNewsForm";
import { PrismaClient } from "@prisma/client";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import PartnersDeleteButton from "../../partners/DeleteButton";
import DeleteButton from "../../eventsnews/DeleteButton";

import GeneralInfoTable from "../../Components/TableMain/GeneralInfo/GeneralInfoTable";
import PartnersForm from "@/app/component/CreateNew/Partner/partnerForm";
import ExperienceTable from "@/app/admin/Components/TableMain/Experience/ExperienceTable";
import ExperiencesDeleteButton from "../../experiences/DeleteButton";
import CertificatesDeleteButton from "../../certificates/DeleteButton";
import CertificatesTable from "@/app/admin/Components/TableMain/Certificatee/CertificateeTable";
import ServicesTable from "@/app/component/TableMain/Services/ServiceTable";
import ServicesDeleteButton from "../../services/DeleteButton";
import DirectorsTable from "@/app/admin/Components/TableMain/TeamAndDirectores/DirectoresTable";
import TeamsDeleteButton from "../../teamsdirectors/DeleteButton";
import PartnersTable from "@/app/component/TableMain/Partners/PartnersTable";
import EventsTable from "@/app/component/TableMain/EventAndeNews/EventAndeNewsTable";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const prisma = new PrismaClient();
  const newsAndEvents = await prisma.newsEvents.findMany();
  const partners = await prisma.partners.findMany();
  const experiences = await prisma.experiences.findMany();
  const certificates = await prisma.certificates.findMany();
  const services = await prisma.services.findMany();
  const generalInfo = await prisma.generalInfo.findMany();
  const teamsDirectors = await prisma.teamOrDirectors.findMany();

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

        {/*experienceTable */}
        {params.id === "experience" && (
          <ExperienceTable>
            {experiences.map((experience) => (
              <Tr key={experience.id}>
                <Td> {experience.title}</Td>
                <Td> {experience.description}</Td>
                <Td> {experience.date}</Td>
                <Td>
                  <img
                    src={experience.logo!}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></img>
                </Td>
                <Td> {experience.createdAt.toDateString()}</Td>
                <Td> {experience.updatedAt.toDateString()}</Td>

                <Td isNumeric>
                  <ExperiencesDeleteButton
                    partnerId={experience.id}
                  ></ExperiencesDeleteButton>

                  <Link href={`/admin/experiences/${experience.id}/edit`}>
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
          </ExperienceTable>
        )}

        {/*CertificatesTable */}
        {params.id === "certificates" && (
          <CertificatesTable>
            {certificates.map((certificate) => (
              <Tr key={certificate.id}>
                <Td> {certificate.name}</Td>
                <Td> {certificate.description}</Td>
                <Td>
                  <img
                    src={certificate.image!}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></img>
                </Td>
                <Td> {certificate.createdAt.toDateString()}</Td>
                <Td> {certificate.updatedAt.toDateString()}</Td>

                <Td isNumeric>
                  <CertificatesDeleteButton
                    certificatesId={certificate.id}
                  ></CertificatesDeleteButton>

                  <Link href={`/admin/certificates/${certificate.id}/edit`}>
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
          </CertificatesTable>
        )}

        {/* EventAndNewsTable */}
        {params.id === "eventnews" && (
          <EventsTable>
            {newsAndEvents.map((event) => (
              <Tr key={event.id}>
                <Td> {event.title}</Td>
                <Td>
                  {event.description.length > 60
                    ? `${event.description.slice(0, 60)}...`
                    : event.description}
                </Td>
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
          </EventsTable>
        )}

        {/* GeneralInfoTable */}
        {params.id === "generalInfo" && (
          <GeneralInfoTable>
            {generalInfo.map((generalInfo) => (
              <Tr key={generalInfo.id}>
                <Td> {generalInfo.title}</Td>
                <Td> {generalInfo.key}</Td>
                <Td> {generalInfo.value}</Td>
                <Td> {generalInfo.createdAt.toDateString()}</Td>
                <Td> {generalInfo.updatedAt.toDateString()}</Td>

                <Td isNumeric>
                  <DeleteButton newsEventsId={generalInfo.id}></DeleteButton>
                  <Link href={`/admin/generalInfo/${generalInfo.id}/edit`}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Edit generalInfo"
                      marginLeft={2}
                      icon={<MdModeEdit />}
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </GeneralInfoTable>
        )}
        {/* ServicesTable */}
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

        {/* TeamsDirectors Table */}
        {params.id === "teamsdirectors" && (
          <DirectorsTable>
            {teamsDirectors.map((team) => (
              <Tr key={team.id}>
                <Td> {team.name}</Td>
                <Td> {team.position}</Td>
                <Td> {team.bio}</Td>
                <Td>
                  <img
                    src={team.image}
                    alt=""
                    style={{ maxWidth: "100px" }}
                  ></img>
                </Td>
                <Td> {team.createdAt.toDateString()}</Td>
                <Td> {team.updatedAt.toDateString()}</Td>
                <Td isNumeric>
                  <TeamsDeleteButton
                    teamsdirectorsId={team.id}
                  ></TeamsDeleteButton>

                  <Link href={`/admin/teamsdirectors/${team.id}/edit`}>
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
          </DirectorsTable>
        )}
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default page;
