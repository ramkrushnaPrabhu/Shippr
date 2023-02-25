import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useShipprState } from "../Context/ShipprContext";
import axios from "axios";

const SignupSeller = () => {
  const [show, setShow] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    companyName: "",
    companyAddress: "",
    password: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const { setSeller } = useShipprState();

  const handleSignup = async () => {
    setLoading(true);
    const { name, email, companyName, companyAddress, password } = credentials;
    if (
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !credentials.companyName ||
      !credentials.companyAddress
    ) {
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
        "/seller/api/becomeSeller",
        { name, email, companyName, companyAddress, password },
        {
          Headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast({
        title: "Registration Successful.",
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
      height={"700px"}
    >
      <Box
        border={{ base: "none", sm: "1px Solid lightgrey" }}
        padding={"50px 55px 55px 55px"}
        borderRadius={"15px"}
      >
        <VStack>
          <Text fontFamily={"Roboto"} fontSize={"3xl"} fontWeight={"bold"}>
            SignUp
          </Text>
          <FormControl isRequired="true">
            <FormLabel>Name</FormLabel>
            <Input
              type={"text"}
              width={"300px"}
              placeholder="Full Name"
              name="name"
              onChange={onChange}
            />
          </FormControl>

          <FormControl isRequired="true">
            <FormLabel>Email</FormLabel>
            <Input
              type={"email"}
              width={"300px"}
              placeholder="Enter Email Address"
              name="email"
              onChange={onChange}
            />
          </FormControl>

          <FormControl isRequired="true">
            <FormLabel>Company Name</FormLabel>
            <Input
              type={"text"}
              width={"300px"}
              placeholder="company Name"
              name="companyName"
              onChange={onChange}
            />
          </FormControl>

          <FormControl isRequired="true">
            <FormLabel>Company Address</FormLabel>
            <Input
              type={"text"}
              width={"300px"}
              placeholder="company Address"
              name="companyAddress"
              onChange={onChange}
            />
          </FormControl>

          <FormControl isRequired="true">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                width={"300px"}
                placeholder="Password"
                name="password"
                onChange={onChange}
              />
              <InputRightElement width={"4.5rem"}>
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            width={"250px"}
            bg="blue.400"
            colorScheme="blue"
            isLoading={loading}
            onClick={handleSignup}
          >
            Signup
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default SignupSeller;
