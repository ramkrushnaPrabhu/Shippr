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
import axios from "axios";
import React, { useState } from "react";
import { useShipprState } from "../Context/ShipprContext";
import {useNavigate } from 'react-router-dom';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { user, setUser } = useShipprState();
  const navigate=useNavigate()
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
    password: "",
    pic: "",
  });
  const toast = useToast();

  const postDetail = (pic) => {
    setLoading(true);

    if (pic === undefined) {
      toast({
        title: "Please select image",
        state: "warning",
        duration: 5000,
        isClosable: "true",
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "");
      data.append("cloud_name", "");
      fetch("https://api.cloudinary.com/v1_1//image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          credentials.pic = data.url.toString();
          setLoading(false);
        })
        .catch((error) => {
     
          toast({
            title: "Error Occurred!",
            status: "error",
            duration: 3000,
            isClosable: "true",
            position: "bottom",
          });
        });
      
    } else {
      toast({
        title: "Please select other Image for Upload!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleSignupUser = async () => {
    setLoading(true);
    const { name, email, password, address, pic } = credentials;
    if (
      !name ||
      !email ||
      !password ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.postalCode ||
      !pic
    ) {
      toast({
        title: "Please fill all fileds",
        status: "warning",
        duration: 5000,
        isClosable: "true",
        position: "bottom",
      });
      setLoading(false);
    }
    try {
      const { data } = await axios.post(
        "/user/api/",
        { name, email, address, password, pic },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);
      navigate("/")

      toast({
        title:"Signup Successful",
        status:"success",
        duration:5000,
        isClosable:'true',
        position:"bottom"
      })
      setLoading(false);
    } catch (error) {
      toast({
        title:"Error occurred",
        status:"error",
        duration:5000,
        isClosable:'true',
        position:"bottom"
      })
      setLoading(false);
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      marginTop={"12px"}
      height={"900px"}
    >
      <Box
        border={{ base: "none", sm: "1px Solid lightgrey" }}
        padding={"55px 55px 55px 55px"}
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
              onChange={(e) => (credentials.name = e.target.value)}
            />
          </FormControl>

          <FormControl isRequired="true">
            <FormLabel>Email</FormLabel>
            <Input
              type={"email"}
              width={"300px"}
              placeholder="Enter Email Address"
              onChange={(e) => (credentials.email = e.target.value)}
            />
          </FormControl>

          <FormControl isRequired="true">
            <FormLabel>
              <Text display={"flex"} justifyContent={"center"}>
                Address
              </Text>
            </FormLabel>
            <FormLabel>Street</FormLabel>
            <Input
              type={"text"}
              placeholder="Street"
              width={"300px"}
              onChange={(e) => (credentials.address.street = e.target.value)}
            />
            <FormLabel>City</FormLabel>
            <Input
              type={"text"}
              placeholder="City"
              width={"300px"}
              onChange={(e) => (credentials.address.city = e.target.value)}
            />
            <FormLabel>State</FormLabel>
            <Input
              type={"text"}
              placeholder="State"
              width={"300px"}
              onChange={(e) => (credentials.address.state = e.target.value)}
            />
            <FormLabel>postalCode</FormLabel>
            <Input
              type={"text"}
              placeholder="postalCode"
              width={"300px"}
              onChange={(e) =>
                (credentials.address.postalCode = e.target.value)
              }
            />
          </FormControl>

          <FormControl isRequired="true">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                width={"300px"}
                placeholder="Password"
                onChange={(e) => (credentials.password = e.target.value)}
              />
              <InputRightElement width={"4.5rem"}>
                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl isRequired="true">
            <FormLabel>Upload Image</FormLabel>
            <Input
              type={"file"}
              accept="image/*"
              p={"1.5"}
              width={"300px"}
              onChange={(e) => postDetail(e.target.files[0])}
            />
          </FormControl>

          <Button
            width={"250px"}
            bg="blue.400"
            colorScheme="blue"
            onClick={handleSignupUser}
            isLoading={loading}
          >
            Signup
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Signup;
