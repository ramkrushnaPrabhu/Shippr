import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  Toast,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Review from "../Components/Review";
import { useShipprState } from "../Context/ShipprContext";

const OrderHistory = () => {
  const { user, cart} = useShipprState();
  const [displayOrderH, setDisplayOrderH] = useState();
  const [fetchAgain,setfetchAgain]=useState();
  const toast = useToast();

  const OrderAgain = async (id) => {
    try {
     const dataOA=await axios.post('/orderHistory/api/orderAgain',{
      id:id
     },{
      headers:{
        "Content-Type":"application/json",
        "authorization":user.token
      }
     }
     
     );
     setfetchAgain(!fetchAgain);
      toast({
        title: "Order successfully placed",
        status: "success",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "Error occurred!",
        status: "error",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
    }
  };

  const handleCancelOrder = async (id) => {

    try {
     const dataC=await axios.post('/orderHistory/api/cancelOrder',{
      id:id
     },{
      headers:{
        "Content-Type":"application/json",
        "authorization":user.token
      }
     });
     setfetchAgain(!fetchAgain)
      toast({
        title: "Order Cancel",
        status: "success",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });

    } catch (error) {
      toast({
        title: "Error occurred!",
        status: "error",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });

    }
  };



  const fetchDisplayOrderH = async () => {
    const { data } = await axios.get(
      "/orderHistory/api/displayAllOrders",
      {
        headers: {
          Authorization: user.token,
        },
      }
    );
    setDisplayOrderH(data);
  };
  useEffect(() => {
    fetchDisplayOrderH();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <>
      {user ? (
        displayOrderH ? (
          <Box
            display={"flex"}
            justifyContent={{ base: "center", lg: "center" }}
            alignItems={"center"}
            width={"100%"}
          >
            <Box
            
              marginBottom={"25px"}
            >
              {displayOrderH.map((item) => (
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
                    src={item.product.pic}
                    alt={item.product.name}
                  />

                  <Stack>
                    <CardBody>
                      <Heading size="md" fontFamily={"Roboto"}>
                        {item.product.name}
                      </Heading>
                      <Text fontFamily={"Roboto"}>QTY :-({item.qty})</Text>
                      <Text fontFamily={"Roboto"}>₹{item.product.price}/-</Text>
                      <Text fontFamily={"Roboto"} display="flex">
                        isDeliverd :-{" "}
                        {item.isDeliverd ? (
                          "Deliverd"
                        ) : item.cancelOrder ? (
                          "Order Cancel"
                        ) : (
                          <Text color={"yellow.600"} fontFamily="Roboto">
                            On the way
                          </Text>
                        )}
                      </Text>
                    </CardBody>
                    <CardFooter>
                    <Box display={'flex'} justifyContent='space-around'>
                    { 
                    item.cancelOrder ? (
                        <Button
                          colorScheme={"green"}
                          size={"md"}
                          fontFamily={"Roboto"}
                          onClick={() => OrderAgain(item._id)}
                        >
                          Order again
                        </Button>
                      ) : (
                        <Button
                          colorScheme={"red"}
                          size={"md"}
                          fontFamily={"Roboto"}
                          onClick={() => handleCancelOrder(item._id)}
                        >
                          Cancel Order
                        </Button>
                      ) 
                    
                      }
                      <Box>
                      {item.cancelOrder ? <></>:<Review productId={item.product._id} orderId={item._id}/> }
                      </Box>
                    </Box>
                    </CardFooter>
                  </Stack>
                </Card>
              ))}
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
                <Text fontSize={"2xl"} fontWeight="bold" fontFamily={"Roboto"}>
                  Nothing to show
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
            {" "}
            <VStack>
              <Text fontSize={"2xl"} fontWeight="bold" fontFamily={"Roboto"}>
                Login/Signup
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

export default OrderHistory;
