import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useShipprState } from "../Context/ShipprContext";

const MyProducts = () => {
  const { seller, sellerMyProducts, setSellerMyProducts } = useShipprState();
  const toast = useToast();

  const fetchMyproducts = async () => {
    const data = await axios.get("/seller/api/getSeller", {
      headers: {
        "Content-Type": "application/json",
        authorization: seller.token,
      },
    });

    setSellerMyProducts(data.data.productsId);
  };

  const handleRemoveProduct = async (id) => {
    try {
      const data = await axios.delete(
        `/product/api/removeProduct/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: seller.token,
          },
        }
      );
      toast({
        title: "Product remove from list",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error ocuured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const stopSelling = async (id) => {
    try {
      const { data } = await axios.post(
        "/product/api/stopSelling",
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: seller.token,
          },
        }
      );
      toast({
        title: "Product not available for customers",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error ocuured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };


  const startSelling=async(id)=>{
    try {
      const { data } = await axios.post(
        "/product/api/startSelling",
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: seller.token,
          },
        }
      );
      toast({
        title: "Product available for customers",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error ocuured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }

  useEffect(() => {
    fetchMyproducts();
    // eslint-disable-next-line
  }, [sellerMyProducts]);

  return (
    <>
      {seller ? (
        <Box display={"grid"} justifyContent="center">
          {sellerMyProducts ? (
            sellerMyProducts.map((item) => (
              <Card
                maxW={"lg"}
                marginTop="15px"
                key={item._id}
                marginBottom="10px"
              >
                <CardBody>
                  <Heading as={"h5"}>{item.name}</Heading>
                  <Image src={item.pic} />
                  <Flex>
                    <Button variant={"ghost"}>
                      <Grid>
                        <Text fontSize={{ base: "sm", sm: "md" }}>
                          TotalQTY
                        </Text>
                        <Text fontSize={{ base: "sm", sm: "md" }}>
                          {item.totalQTY}
                        </Text>
                      </Grid>
                    </Button>
                    <Button variant={"ghost"}>
                      <Grid>
                        <Text fontSize={{ base: "sm", sm: "md" }}>SoldQTY</Text>
                        <Text fontSize={{ base: "sm", sm: "md" }}>
                          {item.totalSoldItems}
                        </Text>
                      </Grid>
                    </Button>
                    <Button variant={"ghost"}>
                      <Grid>
                        <Text fontSize={{ base: "sm", sm: "md" }}>
                          Remaining QTY
                        </Text>
                        <Text fontSize={{ base: "sm", sm: "md" }}>
                          {item.qty}
                        </Text>
                      </Grid>
                    </Button>
                  </Flex>
                </CardBody>
                <CardFooter display={"flex"} justifyContent="space-around">
                  <Button
                    onClick={() => handleRemoveProduct(item._id)}
                    colorScheme="red"
                    fontSize={{ base: "x-small", sm: "md" }}
                  >
                    Remove Product
                  </Button>
                  {item.stopSelling ? (
                    <Button
                    onClick={()=>startSelling(item._id)}
                      colorScheme="green"
                      fontSize={{ base: "x-small", sm: "md" }}
                    >
                      Start Selling
                    </Button>
                  ) : (
                    <Button
                      onClick={() => stopSelling(item._id)}
                      colorScheme="red"
                      fontSize={{ base: "x-small", sm: "md" }}
                    >
                      Stop Selling
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
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
                    No Products to Show
                  </Text>
                </VStack>
              </Box>
            </Box>
          )}
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
              <Text fontSize={"2xl"} fontWeight="bold" fontFamily={"Roboto"}>
                Please Signup/Login For Sale your product on Shippr
              </Text>
              <Link to="/signupSeller">
                <Button colorScheme={"blue"}>Signup</Button>
              </Link>
              <Link to="/loginSeller">
                <Button colorScheme={"blue"}>Login</Button>
              </Link>
            </VStack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MyProducts;
