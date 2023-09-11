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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useQuery, useMutation } from "@tanstack/react-query";

const getMovie = async (id) => {
  const response = await axios.get("http://localhost:1226/products/" + id);
  return response.data;
};

const updatePro = async ({ id, data }) => {
  const response = await axios({
    method: "PUT",
    url: "http://localhost:1226/products/" + id,
    headers: { "Content-Type": "application/json" },
    data: data,
  });
  return response.data;
};

function MovieEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const { data } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id),
    onSuccess: (data) => {
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setCategory(data.category);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePro,
    onSuccess: () => {
      notifications.show({
        title: "Products Edited",
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

  const handleUpdatePro = async (event) => {
    event.preventDefault();
    updateMutation.mutate({
      id: id,
      data: JSON.stringify({
        name: name,
        description: description,
        price: price,
        category: category,
      }),
    });
  };
  return (
    <Container>
      <Space h="50px" />
      <Title order={2} align="center">
        Update Products
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
          step={0.01}
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
          onClick={handleUpdatePro}>
          Update
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
export default MovieEdit;
