// "use client";
// import { ChakraProvider, Grid, GridItem, Show } from "@chakra-ui/react";
// import NavBar from "./NavBar/NavBar";
// import theme from "./Theme";
// import Example from "./ChangeColorMode";
// import { PropsWithChildren, useState } from "react";
// import PartnersTable from "./TableMain/Partners/PartnersTable";
// import ServicesTable from "./TableMain/Services/ServiceTable";
// import ExperienceTable from "./TableMain/Experience/ExperienceTable";
// import CertificateeTable from "./TableMain/Certificatee/CertificateeTable";
// import ContactTable from "./TableMain/Contact/ContactTable";
// import EventAndNewsTable from "./TableMain/EventAndeNews/EventAndeNewsTable";
// import DirectorsTable from "./TableMain/TeamOrDirectores/DirectoresTable";
// import GeneralInfoTable from "./TableMain/GeneralInfo/GeneralInfoTable";

// const GridLayout = ({ children }: PropsWithChildren) => {
//   const [activeTab, setActiveTab] = useState<string>(""); // State to track the active tab
//   console.log(activeTab);
//   return (
//     <Grid
//       templateAreas={{
//         lg: `"header header"
//                   "nav main"
//                   "footer footer"`,
//         base: `"header header""main main""footer footer"`,
//       }}
//       gridTemplateRows={"50px 1fr 30px"}
//       gridTemplateColumns={"150px 1fr"}
//       color="blackAlpha.700"
//       fontWeight="bold"
//     >
//       <GridItem pl="2" bg="orange.300" area={"header"}>
//         Header
//         <Example></Example>
//       </GridItem>
//       <Show above={"lg"}>
//         <GridItem pl="2" bg="#2D3748" area={"nav"}>
//           <NavBar></NavBar>
//         </GridItem>
//       </Show>

//       <GridItem bg="#E2E8F0" area={"main"}>
//         {/* main */}
//         {/* LETS GOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO */}
//         {activeTab === "1" && <PartnersTable></PartnersTable>}
//         {activeTab === "2" && <ServicesTable />}
//         {activeTab === "3" && <ExperienceTable />}
//         {activeTab === "4" && <CertificateeTable />}
//         {activeTab === "5" && <EventAndNewsTable></EventAndNewsTable>}
//         {activeTab === "6" && <CertificateeTable />}
//         {activeTab === "7" && <ContactTable />}
//         {activeTab === "8" && <GeneralInfoTable />}
//       </GridItem>
//       <GridItem pl="2" bg="blue.300" area={"footer"}>
//         Footer
//       </GridItem>
//     </Grid>
//   );
// };

// export default GridLayout;
