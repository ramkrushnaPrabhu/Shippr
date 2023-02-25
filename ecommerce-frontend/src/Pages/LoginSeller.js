import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShipprState } from "../Context/ShipprContext";

const LoginSeller = () => {
  const [loading, setLoading] = useState(false);
  const { setSeller } = useShipprState();
  const navigate = useNavigate();
  const toast = useToast();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const SellerLogin = async () => {

    setLoading(true);
    const { email, password } = credentials;
    if (!credentials.email || !credentials.password) {
      setLoading(false);
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(
        "/seller/api/sellerLogin",
        { email, password },
        {
          Headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast({
        title: "Login Successful.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("sellerInfo", JSON.stringify(data));
      const sellerInfo = JSON.parse(localStorage.getItem("sellerInfo"));
      setSeller(sellerInfo);
      setLoading(false);
      navigate("/addProducts");
    } catch (error) {
      toast({
        title: "Error Occured !",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      marginTop={"12px"}
      height={"400px"}
    >
      <Box
        border={{ base: "none", sm: "1px Solid lightgrey" }}
        padding={"55px 55px 45px 55px"}
        borderRadius={"15px"}
      >
        <VStack>
          <Text fontFamily={"Roboto"} fontSize={"3xl"} fontWeight={"bold"}>
            Login
          </Text>
          <FormControl isRequired="true">
            <FormLabel>Email</FormLabel>
            <Input
              type={"email"}
              width={"300px"}
              placeholder="Enter Email Address"
              name="email"
              onChange={onchange}
            />
          </FormControl>
          <FormControl isRequired="true">
            <FormLabel>Password</FormLabel>
            <Input
              type={"password"}
              width={"300px"}
              placeholder="Password"
              onChange={onchange}
              name="password"
            />
          </FormControl>
          <Button
            width={"250px"}
            bg="blue.400"
            colorScheme="blue"
            isLoading={loading}
            onClick={SellerLogin}
          >
            Login
          </Button>
          <Text>
            New Seller{" "}
            <Link
              to="/signupSeller"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Signup
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginSeller;
