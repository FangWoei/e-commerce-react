import {
  Container,
  Table,
  Button,
  Space,
  Image,
  Select,
  Group,
} from "@mantine/core";
import { Link } from "react-router-dom";
import Header from "../Header";
import { fetchOrders, deleteOrder, updateStatus, getOrder } from "../api/order";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export default function Orders() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("");
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
  console.log(orders);

  const { isLoading } = useQuery({
    queryKey: ["order", orders._id],
    queryFn: () => getOrder(orders._id),
    onSuccess: (data) => {
      setStatus(data.status);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      notifications.show({
        title: "Status Edited",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: error.response.data.message,
        color: "red",
      });
    },
  });

  const handleUpdateStatus = async (order, valueOne) => {
    console.log(valueOne);
    updateMutation.mutate({
      id: order._id,
      data: JSON.stringify({
        status: valueOne,
      }),
    });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      notifications.show({
        title: "Orders Deleted",
        color: "green",
      });
    },
  });
  return (
    <>
      <Container>
        <Header title="My Orders" page="orders" />
        <Space h="35px" />
        <Table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Products</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders
              ? orders.map((o) => {
                  return (
                    <tr key={o._id}>
                      <td>
                        {o.customerName}
                        <br />
                        {o.customerEmail}
                      </td>
                      <td>
                        {o.products.map((product, index) => (
                          <div key={index} style={{ display: "flex" }}>
                            <Image
                              src={"http://localhost:1226/" + product.image}
                              width="140px"
                              my="10px"
                            />
                            <Space w="10px" />
                            <Group position="center">
                              <strong>{product.name}</strong>
                            </Group>
                          </div>
                        ))}
                      </td>
                      <td>${o.totalPrice}</td>
                      <td>
                        <Select
                          value={o.status}
                          onChange={(valueOne) =>
                            handleUpdateStatus(o, valueOne)
                          }
                          w="150px"
                          placeholder={o.status}
                          disabled={o.status == "Pending" ? true : false}
                          data={["Paid", "Failed", "Shipped", "Delivered"]}
                        />
                      </td>
                      <td>{o.paid_at}</td>
                      <td>
                        {o.status == "Pending" && (
                          <Button
                            variant="outline"
                            color="red"
                            onClick={() => {
                              deleteMutation.mutate(o._id);
                            }}>
                            Delete Selected
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
          <Button component={Link} to="/">
            Continue Shopping
          </Button>
        </Table>
        <Space h="100px" />
      </Container>
    </>
  );
}
