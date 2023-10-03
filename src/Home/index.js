import { Container } from "@mantine/core";
import Products from "../Products";
import Header from "../Header";
// import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

function Home() {
  const [cookies] = useCookies(["currentUser"]);
  console.log(cookies);
  return (
    <Container>
      <Header title={"Welcome To My Store"} page="home" />
      <Products />
    </Container>
  );
}

export default Home;
