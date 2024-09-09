import PartnersTable from "@/app/component/TableMain/Partners/PartnersTable";
import ServicesTable from "@/app/component/TableMain/Services/ServiceTable";
import { notFound } from "next/navigation";
import { ChakraProvider, Grid, GridItem, Show } from "@chakra-ui/react";
import Example from "../component/ChangeColorMode";
import NavBar from "../component/NavBar/NavBar";

const AdminPage = () => {
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
        <Example></Example>
      </GridItem>
      <Show above={"lg"}>
        <GridItem pl="2" bg="#2D3748" area={"nav"}>
          <NavBar></NavBar>
        </GridItem>
      </Show>

      <GridItem bg="#E2E8F0" area={"main"}></GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default AdminPage;
