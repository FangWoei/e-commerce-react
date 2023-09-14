import { Link } from "react-router-dom";
import { Group, Space, Divider, Title, Button } from "@mantine/core";
function Header({ title, page = "" }) {
  return (
    <div>
      <Space h="xl" />
      <div className="App">
        <Title
          align="center"
          variant="gradient"
          gradient={{ from: "grape", to: "pink" }}>
          {title}
        </Title>
        <Space h="40px" />
      </div>
      <Space h="md" />
      <Group position="apart">
        <Link to="/" align="center" style={{ textDecoration: "none" }}>
          <Button variant="gradient" gradient={{ from: "cyan", to: "teal" }}>
            Home
          </Button>
        </Link>
        <Link to="/cart" align="center" style={{ textDecoration: "none" }}>
          <Button variant="gradient" gradient={{ from: "grape", to: "violet" }}>
            Cart
          </Button>
        </Link>
        <Link to="/order" align="center" style={{ textDecoration: "none" }}>
          <Button variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
            My Orders
          </Button>
        </Link>
      </Group>
      <Space h="40px" />
      <Divider />
      <Space h="20px" />
    </div>
  );
}

export default Header;
