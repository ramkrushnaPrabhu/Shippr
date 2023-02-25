import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShipprState } from "../Context/ShipprContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const {setUser}=useShipprState()

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleUserLogin=async()=>{
    setLoading(true);
    const { email, password } = credentials;
    if (!email || !password) {
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
        "/user/api/login",
        { email, password },
        {
          Headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);
      toast({
        title: "Login Successful.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      navigate("/")
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
  }

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
            <Input type={"password"} width={"300px"} placeholder="Password" name="password" onChange={onchange}/>
          </FormControl>
          <Button width={"250px"} bg="blue.400" colorScheme="blue" isLoading={loading} onClick={handleUserLogin}>
            Login
          </Button>
          <Text>
            New Customer{" "}
            <Link
              to="/signup"
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

export default Login;
