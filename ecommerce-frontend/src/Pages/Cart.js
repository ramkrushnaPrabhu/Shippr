import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  Text,

  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShipprState } from "../Context/ShipprContext";
import shieldImage from "../Icons/shield.png";

const Cart = () => {
  const { cart, user } = useShipprState();
  const [editQTYID, setEditQTYID] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loadingEdit, setloadingEdit] = useState(false);
  const [qty, setQty] = useState("");
  const [total, setTotal] = useState();
  const [paymentMethod, setPaymentMethod] = useState("cash on delivery");
  const [loadingPlaceOrd, setLoadingPlaceOrd] = useState(false);
  const toast = useToast();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  const handlePlaceOrder = async () => {
    if (cart) {
      setLoadingPlaceOrd(true);
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        const { data } = await axios
          .post(
            "/orderHistory/api/finalOrder",

            {
              product: item.productId,
              qty: item.qty,
              paymentMethod: paymentMethod,
            },
            {
              headers: {
                "Content-Type": "application/json",
                authorization: user.token,
              },
            }
          )
          .catch((error) => {
          
            return toast({
              title: "error",
              status: "error",
              isClosable: true,
              position: "bottom",
              duration: 5000,
            });
          });
        setLoadingPlaceOrd(false);
        toast({
          title: "Order Confirm",
          status: "success",
          isClosable: true,
          position: "bottom",
          duration: 5000,
        });
      }
    } else {
      toast({
        title: "error",
        status: "error",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
      setLoadingPlaceOrd(false);
    }
  };

  const removeFromCart = async (id) => {
    setloading(true);
    try {
      const removeItem = await axios.delete(
        `/cart/api/removeFromCart/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: user.token,
          },
        }
      );
      toast({
        title: "Product remove from cart",
        status: "success",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
      setloading(false);
    } catch (error) {
      toast({
        title: "Error occured!",
        status: "error",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
      setloading(false);
    }
  };

  const handleEditQty = async (id, qty) => {
    setloadingEdit(true);
    try {
      const editqty = await axios.put(
        `/cart/api/Editqty/${id}`,
        { qty },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: user.token,
          },
        }
      );
      toast({
        title: "Quantity is edited",
        status: "success",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
      setloadingEdit(false);
      onClose();
    } catch (error) {
    
      toast({
        title: "Error occurred",
        status: "error",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
      setloadingEdit(false);
    }
  };

  const handleSetId = (id) => {
    setEditQTYID(id);
    onOpen();
  };

  return (
    <>
      {user ? (
        cart ? (
          cart.length > 0 ? (
            <Box
              display={"flex"}
              justifyContent={{ base: "center", lg: "center" }}
              alignItems={"center"}
              width={"100%"}
            >
              <Box
               
                marginBottom={"25px"}
              >
                {cart.map((item) => (
                  <Card
                    direction={{ base: "column", sm: "column", md: "row" }}
                    overflow="hidden"
                    variant="outline"
                    width={{ lg: "1020px" }}
                    key={item._id}
                  >
                    <Image
                      objectFit="cover"
                      maxW={{
                        base: "100%",
                        sm: "400px",
                        md: "300px",
                        lg: "400",
                      }}
                      src={item.pic}
                      alt={item.name}
                    />

                    <Stack>
                      <CardBody>
                        <Heading size="md">{item.name}</Heading>

                        <Button
                          display={"grid"}
                          onClick={() => handleSetId(item._id)}
                        >
                          Edit qty ({item.qty})
                        </Button>
                        <Modal
                          blockScrollOnMount={false}
                          isOpen={isOpen}
                          onClose={onClose}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Edit Qty</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                              <Select
                                width="205px"
                                placeholder="Select Quantity"
                                name="category"
                                onChange={(e) => setQty(e.target.value)}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                              </Select>
                              <Button
                                colorScheme={"blue"}
                                onClick={() => handleEditQty(editQTYID, qty)}
                                isLoading={loadingEdit}
                              >
                                Edit
                              </Button>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={onClose}
                              >
                                Close
                              </Button>
                            </ModalFooter>
                          </ModalContent>
                        </Modal>
                        <Text py="2" fontFamily={"Roboto"} fontSize="2xl">
                          ₹{item.price}/-
                        </Text>
                      </CardBody>
                      <CardFooter>
                        <Button
                          colorScheme={"red"}
                          size={"md"}
                          isLoading={loading}
                          onClick={() => removeFromCart(item._id)}
                        >
                          Remove From Cart
                        </Button>
                      </CardFooter>
                    </Stack>
                  </Card>
                ))}
                <Box
                  marginTop={"15px"}
                  border={"1px solid gray"}
                  borderRadius="2xl"
                >
                  <Card align="center">
                    <CardHeader borderBottom={"1px solid gray"}>
                      <Heading size="md" color={"gray"} fontFamily="Roboto">
                        {" "}
                        Price Details
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <Box
                        display={"flex"}
                        justifyContent="space-between"
                        width="300px"
                        marginBottom={"15px"}
                        fontFamily="Roboto"
                      >
                        <Text>Price ({cart.length})</Text>
                        <Text>₹{total}</Text>
                      </Box>
                      <Box
                        display={"flex"}
                        justifyContent="space-between"
                        width="300px"
                        marginBottom={"15px"}
                        fontFamily="Roboto"
                      >
                        <Text>Delivery Charges</Text>
                        <Text color={"green.500"}>Free</Text>
                      </Box>
                      <Box
                        display={"flex"}
                        justifyContent="space-between"
                        width="300px"
                        borderTop={"1px solid gray"}
                        marginBottom={"25px"}
                        fontFamily="Roboto"
                        padding={"3px"}
                      >
                        <Text>Total Amount</Text>
                        <Text>₹{total}</Text>
                      </Box>
                    </CardBody>
                    <CardFooter display="grid" borderTop={"1px solid gray"}>
                      <Text fontFamily={"Roboto"} color="gray">
                        Select payment method for Place Order
                      </Text>
                      <RadioGroup
                        defaultValue="cash on delivery"
                        marginBottom={"7px"}
                        marginTop="3px"
                      >
                        <Stack spacing={5} direction="row">
                          <Radio
                            colorScheme="red"
                            value="credit card"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          >
                            Credit card
                          </Radio>
                          <Radio
                            colorScheme="green"
                            value="debit card"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          >
                            Debit card
                          </Radio>
                          <Radio
                            colorScheme="blue"
                            value="cash on delivery"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          >
                            Cash on delivery
                          </Radio>
                        </Stack>
                      </RadioGroup>
                      <Button
                        colorScheme="orange"
                        fontFamily="Roboto"
                        onClick={handlePlaceOrder}
                        isLoading={loadingPlaceOrd}
                      >
                        Place Order
                      </Button>
                      <Text
                        fontFamily={"Roboto"}
                        color="gray"
                        display="flex"
                        marginTop={"8px"}
                      >
                        <Image src={shieldImage} height="25px" /> Safe and
                        Secure Payments.Easy returns.100% Authentic products.
                      </Text>
                    </CardFooter>
                  </Card>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              marginTop={"12px"}
              height={"400px"}
            >
              <Box
                border={{ base: "none", sm: "1px Solid lightgrey" }}
                padding={"50px 55px 55px 55px"}
                borderRadius={"15px"}
              >
                {" "}
                <VStack>
                  <Text
                    fontSize={"2xl"}
                    fontWeight="bold"
                    fontFamily={"Roboto"}
                  >
                    Cart is Empty
                  </Text>
                </VStack>
              </Box>
            </Box>
          )
        ) : (
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            marginTop={"12px"}
            height={"400px"}
          >
            <Box
              border={{ base: "none", sm: "1px Solid lightgrey" }}
              padding={"50px 55px 55px 55px"}
              borderRadius={"15px"}
            >
              <Spinner />
            </Box>
          </Box>
        )
      ) : (
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          marginTop={"12px"}
          height={"400px"}
        >
          <Box
            border={{ base: "none", sm: "1px Solid lightgrey" }}
            padding={"50px 55px 55px 55px"}
            borderRadius={"15px"}
          >
            {" "}
            <VStack>
              <Text fontSize={"2xl"} fontWeight="bold" fontFamily={"Roboto"}>
                Please Login/Signup for add product to cart
              </Text>
              <Link to="/signup">
                <Button colorScheme={"blue"}>Signup</Button>
              </Link>
              <Link to="/login">
                <Button colorScheme={"blue"}>Login</Button>
              </Link>
            </VStack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Cart;
