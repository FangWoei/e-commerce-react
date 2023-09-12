import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Title,
  Grid,
  Card,
  Badge,
  Group,
  Space,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchProducts, deleteProduct } from "../api/products";

function Products() {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState("");
  const [currentProducts, setCurrentProducts] = useState([]);
  const { isLoading, data: products } = useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProducts(category),
  });

  useEffect(() => {
    // this will trigger when products is updated OR category is changed
    // method 1:
    // if (category !== "") {
    //   const filteredProducts = products.filter((p) => p.category === category);
    //   setCurrentProducts(filteredProducts);
    // } else {
    //   setCurrentProducts(products);
    // }
    // method 2:
    let newList = products ? [...products] : [];
    // filter by category
    if (category !== "") {
      newList = newList.filter((p) => p.category === category);
    }
    setCurrentProducts(newList);
  }, [products, category]);

  const categoryOptions = useMemo(() => {
    let options = [];
    if (products && products.length > 0) {
      products.forEach((product) => {
        if (!options.includes(product.category)) {
          options.push(product.category);
        }
      });
    }
    return options;
  }, [products]);

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", category],
      });
      notifications.show({
        title: "Products Deleted",
        color: "green",
      });
    },
  });

  return (
    <>
      <Group position="apart">
        <Title order={3} align="center">
          Products
        </Title>
        <Button
          component={Link}
          to="/product_add"
          variant="gradient"
          gradient={{ from: "black", to: "White", deg: 105 }}>
          Add New
        </Button>
      </Group>
      <Space h="20px" />
      <Group>
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}>
          <option value="">All Categories</option>
          {categoryOptions.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </Group>
      <Space h="20px" />
      <LoadingOverlay visible={isLoading} />
      <Grid>
        {currentProducts
          ? currentProducts.map((pro) => {
              return (
                <Grid.Col sm={12} md={6} lg={4} key={pro._id}>
                  <Card withBorder shadow="sm" p="20px">
                    <Title order={5}>{pro.name}</Title>
                    <Space h="20px" />
                    <Group position="apart" spacing="5px">
                      <Badge
                        variant="gradient"
                        gradient={{ from: "teal", to: "lime", deg: 105 }}>
                        {pro.price}
                      </Badge>
                      <Badge
                        variant="gradient"
                        gradient={{ from: "red", to: "blue" }}>
                        {pro.category}
                      </Badge>
                    </Group>
                    <Space h="20px" />
                    <Group position="center">
                      <Button
                        component={Link}
                        to=""
                        variant="gradient"
                        gradient={{ from: "blue", to: "blue" }}
                        fullWidth>
                        Add To Cart
                      </Button>
                    </Group>
                    <Space h="20px" />
                    <Group position="apart">
                      <Button
                        component={Link}
                        to={"/products/" + pro._id}
                        variant="gradient"
                        gradient={{ from: "blue", to: "darkblue" }}
                        size="xs"
                        radius="50px">
                        Edit
                      </Button>
                      <Button
                        variant="gradient"
                        gradient={{ from: "orange", to: "red" }}
                        size="xs"
                        radius="50px"
                        onClick={() => {
                          deleteMutation.mutate(pro._id);
                        }}>
                        Delete
                      </Button>
                    </Group>
                  </Card>
                </Grid.Col>
              );
            })
          : null}
      </Grid>
    </>
  );
}

export default Products;
