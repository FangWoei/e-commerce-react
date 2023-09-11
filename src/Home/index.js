import { Container, Title, Space, Divider } from "@mantine/core";
import Products from "../Products";

function Home() {
  return (
    <Container>
      <Space h="xl" />
      <div className="App">
        <Title
          align="center"
          variant="gradient"
          gradient={{ from: "yellow", to: "orange"}}
        >
          Welcome to My Store
        </Title>
        <Space h="30px" />
        <Divider />
        <Space h="30px" />
      </div>
      <Space h="md" />
      <Products />
    </Container>
  );
}

export default Home;
