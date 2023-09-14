import { Container } from "@mantine/core";
import Products from "../Products";
import Header from "../Header";
// import { Link } from "react-router-dom";

function Home() {
  return (
    <Container>
      <Header title={"Welcome To My Store"} page="home" />
      <Products />
    </Container>
  );
}

export default Home;
