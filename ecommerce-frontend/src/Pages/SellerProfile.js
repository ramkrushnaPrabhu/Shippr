import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useShipprState } from "../Context/ShipprContext";
// import SellerImage from "../Icons/icons8-business-building-96.png";
import { Link } from "react-router-dom";

const SellerProfile = () => {
  const { seller } = useShipprState();

  return (
    <>
      {seller ? (
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems="center"
          flexDirection={"column"}
          marginTop={"15px"}
        >
          <Box display={"flex"} justifyContent="center">
            <Card align="center">
            <Avatar
              size="2xl"
              name={seller.name}
              // src={SellerImage}
              marginBottom={"10px"}
              borderRight="3px solid blue"
              borderLeft={"3px solid red"}
            />
              <CardHeader fontFamily={'Roboto'} >
                <Heading size="md">{seller.name}</Heading>
              </CardHeader>
              <CardBody>
                <Text fontFamily={'Roboto'} >
                  Email : {seller.email}
                </Text>
                <Text fontFamily={'Roboto'} >
                 Company Name : {seller.companyName}
                </Text>
                <Text fontFamily={'Roboto'} >
                 Company Address : {seller.companyAddress}
                </Text>
              </CardBody>
            </Card>
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

export default SellerProfile;
