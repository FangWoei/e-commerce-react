import {
  Container,
  Title,
  Space,
  Card,
  TextInput,
  NumberInput,
  Divider,
  Button,
  Group,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

const addPro = async (data) => {
  const response = await axios({
    method: "POST",
    url: "http://localhost:1226/products",
    headers: { "Content-Type": "application/json" },
    data: data,
  });
  return response.data;
};

function ProductAdd() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const createMutation = useMutation({
    mutationFn: addPro,
    onSuccess: () => {
      notifications.show({
        title: "Product Added",
        color: "green",
      });
      navigate("/");
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleAddNewPro = async (event) => {
    event.preventDefault();
    createMutation.mutate(
      JSON.stringify({
        name: name,
        description: description,
        price: price,
        category: category,
      })
    );
  };
  return (
    <Container>
      <Space h="50px" />
      <Title order={2} align="center">
        Add New Products
      </Title>
      <Space h="50px" />
      <Card withBorder shadow="md" p="20px">
        <TextInput
          value={name}
          placeholder="Enter the products name here"
          label="Name"
          description="The name of the products"
          withAsterisk
          onChange={(event) => setName(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={description}
          placeholder="Enter the products description here"
          label="description"
          description="The description of the products"
          withAsterisk
          onChange={(event) => setDescription(event.target.value)}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <NumberInput
          value={price}
          placeholder="Enter the price here"
          label="Price"
          description="The price of the products"
          withAsterisk
          onChange={setPrice}
        />
        <Space h="20px" />
        <Divider />
        <Space h="20px" />
        <TextInput
          value={category}
          placeholder="Enter the category here"
          label="Category"
          description="The category of the products"
          withAsterisk
          onChange={(event) => setCategory(event.target.value)}
        />
        <Space h="20px" />
        <Button
          variant="gradient"
          gradient={{ from: "yellow", to: "purple", deg: 105 }}
          fullWidth
          onClick={handleAddNewPro}>
          Add New Products
        </Button>
      </Card>
      <Space h="20px" />
      <Group position="center">
        <Button component={Link} to="/" variant="subtle" size="xs" color="gray">
          Go back to Home
        </Button>
      </Group>
      <Space h="100px" />
    </Container>
  );
}
export default ProductAdd;
