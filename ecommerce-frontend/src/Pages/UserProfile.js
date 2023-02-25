import { Avatar, Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useShipprState } from '../Context/ShipprContext';

const UserProfile = () => {
    const {user,setUser,setCart}=useShipprState();
    const [loading,setLoading]=useState(false)
    const [loadingD,setLoadingD]=useState(false)
    const [userP,setUserP]=useState(user);
    const navigate=useNavigate()
    const toast=useToast()
    const [credentials,setCredentials]=useState(
      {
        address: {
          street: "",
          city: "",
          state: "",
          postalCode: "",
        },
      }
    )
     const { isOpen, onOpen, onClose } = useDisclosure()
  

    const EditAddress=async()=>{
      try {
        setLoading(true);
      const {address } = credentials;
      const {data}=await axios.put('/user/api/updateUser',{
        address:address
      },{
        headers:{
          "Content-Type":"application/json",
          "authorization":user.token,
        }
      })
      setUserP(data);
      onClose();
      setLoading(false)
      toast({
        title:"Address edited",
        status:"success",
        duration:5000,
        isClosable:'true',
        position:"bottom"
      })
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
      
    }

    const DeleteUser=async()=>{
      setLoadingD(true)
      try {
        const data=await axios.delete('/user/api/deleteUser/',{
        headers:{
          "Content-Type":"application/json",
          "authorization":user.token
        }
      })
      localStorage.removeItem("userInfo");
      setUser()
      navigate("/");
      setCart([]);
      toast({
        title: "account Deleted",
        status: "success",
        duration: 3500,
        isClosable: true,
        position: "bottom",
      });
      setLoadingD(false);
      } catch (error) {
        toast({
          title:"Error occurred",
          status:"error",
          duration:5000,
          isClosable:'true',
          position:"bottom"
        })
        setLoadingD(false);
      }
      
    }


  return (
    <>
        {
         user ?  
         
            (
              <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      marginTop={"12px"}
      height={"800px"}
    >
      <Box
        border={{ base: "none", sm: "1px Solid lightgrey" }}
        padding={"55px 55px 55px 55px"}
        borderRadius={"15px"}
      >
        <VStack>
          <Avatar src={userP.pic} size='2xl' name={userP.name}/>
          <HStack fontFamily='Roboto'>
            <Text>Name :-</Text>
            <Text>{userP.name}</Text>
          </HStack>
          <HStack fontFamily='Roboto'>
            <Text>Email Address :-</Text>
            <Text>{userP.email}</Text>
          </HStack>
          <HStack>
            <Text fontFamily='Roboto' marginTop={'4px'}>Address</Text>
          </HStack>
          <VStack>
            <Text fontFamily='Roboto'>Street</Text>
            <Text >{userP.address.street}</Text>
          </VStack>
          <VStack>
            <Text fontFamily='Roboto'>City</Text>
            <Text >{userP.address.city}</Text>
          </VStack>
          <VStack>
            <Text fontFamily='Roboto'>State</Text>
            <Text >{userP.address.state}</Text>
          </VStack>
          <VStack>
            <Text fontFamily='Roboto'>postalCode</Text>
            <Text >{userP.address.postalCode}</Text>
          </VStack>
          <VStack fontFamily='Roboto'>
            <Button isLoading={loading} onClick={onOpen} colorScheme='orange'>Edit Address</Button>
            <Button isLoading={loadingD} onClick={DeleteUser} colorScheme='red'>Delete Account</Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={EditAddress}>
              Submit
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
          </VStack>
        </VStack>
      </Box>
    </Box>
           
    ) 

:
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
                Please Signup/Login For Purchase product on Shippr
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
        }
    </>
    
  )
}

export default UserProfile




