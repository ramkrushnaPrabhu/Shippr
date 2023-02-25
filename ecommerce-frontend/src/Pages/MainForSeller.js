import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useShipprState } from "../Context/ShipprContext";

const MainForSeller = () => {
  const { setSellerHeaderB } = useShipprState();
 
  return (
    <Box>
      <Box
        bg={"blue.400"}
        display={"flex"}
        justifyContent="center"
        padding={"10px 0 10px 0"}
      >
        <Link to={"/"} onClick={() => setSellerHeaderB(false)}>
          <Button colorScheme={"orange"} size={"sm"}>
            Go Back To Shippr(as a Customer)
          </Button>
        </Link>
      </Box>
      <Box display={{ base: "none", sm: "none", md: "none", lg: "flex" }}>
        <Image src="https://img1a.flixcart.com/fk-sp-static/images/welcome_potal_banner_Desktop_V2_02.svg" />

        <Box
          position={"absolute"}
          display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
          flexDir={"column"}
          justifyContent="center"
          alignItems={"center"}
          width="40%"
          height={"15%"}
        >
          <Text
            color={"white"}
            fontFamily={"Roboto"}
            fontWeight="bold"
            fontSize={"2xl"}
          >
            Launch your business in 10 minutes
          </Text>
          <Link to='/signupSeller'><Button
            rightIcon={<ArrowForwardIcon />}
            bg={"yellow.300"}
            color={"blackAlpha.800"}
            border={"1px"}
          >
            Start Selling{" "}
          </Button></Link>
          
        </Box>
      </Box>
      <Box display={{ base: "none", sm: "none", md: "flex", lg: "none" }}>
        <Image src="https://img1a.flixcart.com/fk-sp-static/images/Tablet_without_title_02.svg" />

        <Box
          position={"absolute"}
          display={{ base: "none", sm: "none", md: "flex", lg: "none" }}
          flexDir={"column"}
          justifyContent="center"
          alignItems={"center"}
          width="60%"
          height={"15%"}
          paddingLeft={"45px"}
        >
          <Text
            color={"yellow.300"}
            fontWeight="bold"
            fontSize={"2xl"}
            fontFamily={"Roboto"}
          >
            Sell online to 50 crores+ customers
          </Text>
          <Text color={"yellow.300"} fontWeight="bold" fontFamily={"Roboto"}>
            Pan-India-Delivery
          </Text>
          <Text
            color={"white"}
            fontFamily={"Roboto"}
            fontWeight="bold"
            fontSize={"2xl"}
          >
            Launch your business in 10 minutes
          </Text>
          <Link to='/signupSeller'><Button
            rightIcon={<ArrowForwardIcon />}
            bg={"yellow.300"}
            color={"blackAlpha.800"}
            border={"1px"}
          >
            Start Selling{" "}
          </Button></Link>
          
        </Box>
      </Box>

      <Box display={{ base: "flex", sm: "flex", md: "none", lg: "none" }}>
        <Image src="https://img1a.flixcart.com/fk-sp-static/images/banner_mobile_v2.4.png" />

        <Box
          position={"absolute"}
          display={{ base: "flex", sm: "flex", md: "none", lg: "none" }}
          flexDir={"column"}
          justifyContent="center"
          alignItems={"center"}
          width="30%"
          height={{ base: "12%", sm: "20%", md: "none" }}
          paddingLeft={"45px"}
        >
        <Link to='/signupSeller'><Button
            rightIcon={<ArrowForwardIcon />}
            bg={"gold"}
            color={"blackAlpha.800"}
            border={"1px"}
            size={{ base: "sm", sm: "sm", md: "none" }}
          >
            Start Selling
          </Button></Link>
          
        </Box>
      </Box>
   
      <Box>
        <Heading
          as="h3"
          size="md"
          display={"flex"}
          justifyContent="center"
          marginTop={"10px"}
          color="blue.600"
        >
          WHY SELL ONLINE
        </Heading>
        <Card align="center">
          <CardHeader>
            <Heading size="md"> Growth in the online retail market</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Witnessing tremendous growth for the past 5 years, retailers are
              moving towards online selling.
            </Text>
          </CardBody>
        </Card>
        <Card align="center">
          <CardHeader>
            <Heading size="md"> Get orders across India</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Receive orders from every part of the country and follow the
              simple steps to fulfill the orders.
            </Text>
          </CardBody>
        </Card>
        <Card align="center">
          <CardHeader>
            <Heading size="md"> Ship with ease</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              Enjoy easy pick-up and delivery across India with Ekart, our
              logistics partner.
            </Text>
          </CardBody>
        </Card>

        <Heading
          as="h3"
          size="md"
          display={"flex"}
          justifyContent="center"
          marginTop={"10px"}
          color="blue.600"
        >
          HOW TO BE A SELLER
        </Heading>

        <Card align="center">
          <CardHeader>
            <Heading size="md"> At least 1 product to sell</Heading>
          </CardHeader>
          <CardBody>
            <Text>
              All you need is a minimum of 1 unique product to start selling on
              Shippr.
            </Text>
          </CardBody>
        </Card>

        <Card align="center">
          <CardHeader>
            <Heading size="md"> Signup</Heading>
          </CardHeader>
          <CardBody>
            <Text>You need to register on Shippr for Selling your product</Text>
          </CardBody>
        </Card>

        <Heading
          as="h3"
          size="md"
          display={"flex"}
          justifyContent="center"
          marginTop={"10px"}
          color="blue.600"
        >
          SELL On Shippr
        </Heading>
        <Card align="center">
          <CardBody>
            <Text>
              Shippr Marketplace is India's leading platform for selling online.
              Be it a manufacturer, vendor or supplier, simply sell your
              products online on Shippr and become a top e-commerce player with
              minimum investment. Through a team of experts offering exclusive
              seller workshops, training, and seller support, Shippr focuses on
              empowering sellers across India. Selling on Shippr.com is easy and
              absolutely free. All you need is to register, list your catalog
              and start selling your products. What's more? We have third party
              'Ecommerce Service Providers' who provide logistics, cataloging
              support, product photoshoot and packaging materials. We have a
              program called Seller Protection Fund to safeguard sellers from
              losses via compensations. We provide Shippr Fulfilment services
              through which you can ensure faster delivery of your items,
              quality check by our experts and a delightful packaging. Combine
              these with the fastest payments in the industry and you get an
              excellent seller portal. No wonder Shippr is India's favourite
              place to sell online.
            </Text>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
};

export default MainForSeller;
