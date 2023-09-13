import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getCartItems, removeItemFromCart } from "../api/cart";
import {
  Container,
  Title,
  Table,
  Image,
  Box,
  Button,
  Checkbox,
  Group,
  Space,
  Divider,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import Header from "../Header";
import { useMutation } from "@tanstack/react-query";
import Products from "../Products";

export default function Cart() {
  const [checkedList, setCheckedList] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  const queryClient = useQueryClient();
  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  /* check box*/
  const checkBoxAll = (event) => {
    if (event.target.checked) {
      const newCheckedList = [];
      cart.forEach((cart) => {
        newCheckedList.push(cart._id);
      });
      setCheckedList(newCheckedList);
      setCheckAll(true);
    } else {
      setCheckedList([]);
      setCheckAll(false);
    }
  };
  const checkboxOne = (event, id) => {
    if (event.target.checked) {
      const newCheckedList = [...checkedList];
      newCheckedList.push(id);
      setCheckedList(newCheckedList);
    } else {
      const newCheckedList = checkedList.filter((cart) => cart !== id);
      setCheckedList(newCheckedList);
    }
  };

  const deleteCheckedItems = () => {
    const newCart = cart.filter((item) => !checkedList.includes(item._id));

    queryClient.setQueryData(["cart"], newCart);

    setCheckedList([]);
    localStorage.setItem("cart", JSON.stringify(newCart));

    setCheckAll(false);
    setCheckedList([]);
  };

  /* check box*/

  const calculateTotal = () => {
    let total = 0;
    cart.map((item) => (total = total + item.quantity * item.price));
    return total;
  };

  // console.log(queryClient.getQueryData(["cart"]));
  // console.log(getCartItems());
  // console.log(cart);

  const deleteMutation = useMutation({
    mutationFn: removeItemFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      notifications.show({
        title: "Product Deleted",
        color: "green",
      });
    },
  });

  const rows = cart.map((c) => (
    <tr key={c.name}>
      <td>
        <Checkbox
          checked={checkedList && checkedList.includes(c._id) ? true : false}
          type="checkbox"
          onChange={(event) => {
            checkboxOne(event, c._id);
          }}
        />
      </td>
      <td width="20%">
        <Image src={"http://localhost:1226/" + c.image} width="100%" />
      </td>
      <td>{c.name}</td>
      <td>${c.price}</td>
      <td>{c.quantity}</td>
      <td>${c.price}</td>

      <td>
        <Box w={140}>
          <Button
            fullWidth
            variant="outline"
            color="red"
            onClick={(event) => {
              event.preventDefault();
              deleteMutation.mutate(c);
            }}>
            Remove
          </Button>
        </Box>
      </td>
    </tr>
  ));
  return (
    <>
      <Container>
        <Header />
        <Title order={3} align="center">
          Cart
        </Title>
        <Table>
          <thead>
            <tr>
              <th>
                <Checkbox
                  type="checkbox"
                  checked={checkAll}
                  disabled={cart && cart.length > 0 ? false : true}
                  onChange={(event) => {
                    checkBoxAll(event);
                  }}
                />
              </th>
              <th>Product</th>
              <th></th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows}

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>${calculateTotal()}</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <Divider />
        <Space h="20px" />
        <Group position="apart">
          <Button
            onClick={(event) => {
              event.preventDefault();
              deleteCheckedItems();
            }}>
            Delete Selected
          </Button>
          <Button>Checkout</Button>
        </Group>
      </Container>
    </>
  );
}