import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  IconButton,
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
import { Link, useParams } from "react-router-dom";
import Rating from "../Components/Rating";
import { useShipprState } from "../Context/ShipprContext";

const SingleProduct = () => {
  const [singleProductA, setSingleProductA] = useState();
  const [QTY, setQTY] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, AddToCart } = useShipprState();
  const { id } = useParams();
  const toast = useToast();
  const [review, setReview] = useState();
  const [paymentMethod, setPaymentMethod] = useState("cash on delivery");
  const [loadingPlaceOrd, setLoadingPlaceOrd] = useState(false);

  const fetchSigleProduct = async (id) => {
    try {
      const { data } = await axios.get(
        `/product/api/getProductById/${id}`
      );

      setSingleProductA(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSigleProduct(id);
    // eslint-disable-next-line
  }, [id]);

  const displayReviews = async () => {
    const { data } = await axios.get(
      `/review/api/getReviews/${id}`
    );
    setReview(data);
  };

  useEffect(() => {
    displayReviews();
    // eslint-disable-next-line
  }, []);

  const addToOrderList = async(id) => {
    try {
      setLoadingPlaceOrd(true);
       const { data } = await axios.post(
      "/orderHistory/api/finalOrderD",

      {
        product: id,
        qty: QTY,
        paymentMethod: paymentMethod,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: user.token,
        },
      }
    )
    setLoadingPlaceOrd(false);
    toast({
      title: "Order Confirm",
      status: "success",
      isClosable: true,
      position: "bottom",
      duration: 5000,
    });
  
    } catch (error) {
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

  return (
    <Box
      display={"flex"}
      justifyContent={{ base: "center", lg: "center" }}
      alignItems={"center"}
      width={"100%"}
      // height={{ lg: "710px" }}
    >
      {singleProductA ? (
        <Box marginTop="15px" marginBottom={"15px"}>
          <Box marginLeft={"10px"} marginRight={"10px"}>
            <VStack>
              <Image
                src={singleProductA.pic}
                height={{
                  base: "100px",
                  sm: "150px",
                  md: "200px",
                  lg: "250px",
                }}
                marginBottom={"10px"}
              />
              <Text fontFamily={"Roboto"} fontWeight="bold" color={"gray.700"} >
                {singleProductA.name}
              </Text>
              <Text fontFamily={"Roboto"} fontWeight="bold" color={"gray.700"}>
                Brand:-{singleProductA.brand}
              </Text>
              <Text fontFamily={"Roboto"} color={"gray.700"} >
                <Text>Description :- </Text>
                {singleProductA.description}
              </Text>
              <Text><Rating rating={singleProductA.rating}/></Text>
              <Text fontFamily={"Roboto"} fontWeight="bold" color={"red"} marginTop={'15px'} marginBottom='15px'>
                {!singleProductA.stopSelling && singleProductA.totalQTY > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </Text>
              <Text fontFamily={"Roboto"} fontSize="2xl" color={"gray.700"}>
                ₹{singleProductA.price}/-
              </Text>
              <Select
                width="205px"
                placeholder="Select Quantity"
                name="category"
                onChange={(e) => setQTY(e.target.value)}
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
                colorScheme={"yellow"}
                onClick={
                  user
                    ? () =>
                        AddToCart(
                          singleProductA._id,
                          singleProductA.name,
                          QTY,
                          singleProductA.pic,
                          singleProductA.price
                        )
                    : onOpen
                }
              >
                Add to Cart
              </Button>
              { user ? <Box marginTop={'10px'}  padding={'35px'} borderRadius='25px'>
              <Text marginBottom={'10px'} fontFamily='Roboto'>Select Payment Method </Text>
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
              </Box> : <></>}
              <Button
                colorScheme={"green"}
                onClick={user ? ()=>addToOrderList(singleProductA._id) : onOpen}
                isLoading={loadingPlaceOrd}
              >
                Buy
              </Button>
            </VStack>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Warning</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text fontWeight="bold" mb="1rem">
                    Please Login For add product to cart
                  </Text>
                  <Link to="http://localhost:3000/login">
                    <Button>Login</Button>
                  </Link>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Box>
              {review ? (
                <VStack marginTop='45px'>
                <Text fontFamily={'Roboto'} fontSize='2xl' >Reviews</Text>
                  {review.map((itemx) => (
                    <Card maxW="md" width={'100%'}>
                      <CardHeader>
                        <Flex spacing="4">
                          <Flex
                            flex="1"
                            gap="4"
                            alignItems="center"
                            flexWrap="wrap"
                          >
                            <Avatar name={itemx.user.name} src={itemx.user.pic} />

                            <Box>
                              <Heading size="sm">{itemx.user.name}</Heading>
                            </Box>
                          </Flex>
                         
                        </Flex>
                      </CardHeader>
                      <CardBody>
                      <Box >
                        <Rating rating={itemx.rating}/>
                      </Box>
                        <Text>{itemx.comment}</Text>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              ) : (
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
                      No reviews
                    </Text>
                  </VStack>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export default SingleProduct;
