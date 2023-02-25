import { Box, Heading, Image, Text} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useShipprState } from "../Context/ShipprContext";
import paymentM from "../Icons/paymentM.svg"
import becomeSeller from "../Icons/index.svg"

const Footer = () => {
  const {setSellerHeaderB}=useShipprState();
  return (
    <>
    <Box
      bg={"#172337"}
      display="flex"
      justifyContent={{ base: "center", lg: "center" }}
      alignItems={"center"}
      width={"100%"}
     
      padding={"55px"}
      fontFamily="Roboto"
    >
      <Box display={"flex"} justifyContent="space-around" flexWrap="wrap" width={'90%'}>
        <Box display={"grid"} color="white" fontSize={'sm'} marginTop='5px' width={{base:"100%",sm:"100%",md:"15%",lg:"10%"}} >
          <Heading fontSize={"medium"} color="#878787" fontFamily="Roboto">
            About us
          </Heading>
          <Link to="/">Contact us</Link>
          <Link to="/">About us</Link>
        </Box>
        <Box display={"grid"} color="white" fontSize={'sm'} marginTop='10px' width={{base:"100%",sm:"100%",md:"15%",lg:"10%"}} >
          <Heading fontSize={"medium"} color="#878787" fontFamily="Roboto">
            Help
          </Heading>
          <Link to="/">Payments</Link>
          <Link to="/">shipping</Link>
          <Link to="/">FAQ</Link>
        </Box>
        <Box display={"grid"} color="white" fontSize={'sm'} marginTop='10px' width={{base:"100%",sm:"100%",md:"15%",lg:"10%"}} >
          <Heading fontSize={"medium"} color="#878787" fontFamily="Roboto">
            Policy
          </Heading>
          <Link to="/">Return Policy</Link>
          <Link to="/">Terms of Use</Link>
          <Link to="/">security</Link>
          <Link to="/">privacy</Link>
        </Box>
       <Box borderLeft={{md:"none",lg:"1px solid gray"}}></Box>
        <Box display={"grid"} color="white" fontSize={'sm'} marginTop='10px' width={{base:"100%",sm:"100%",md:"15%",lg:"18%"}} >
          <Heading fontSize={"medium"} color="#878787" fontFamily="Roboto">
            Mail
          </Heading>
          <Text>
            Shippr Internet Private Limited,
          </Text>
          <Text>Buildings Alyssa, Begonia & Clove
            </Text>
            <Text>Embassy Tech Village, </Text>
            <Text>Outer Ring Road,</Text>
            <Text> Devarabeesanahalli Village,</Text>
            <Text>Bengaluru, 560103.</Text>
        </Box>

        <Box display={"grid"} color="white" fontSize={'sm'} marginTop='10px' width={{base:"100%",sm:"100%",md:"15%",lg:"18%"}} >
          <Heading fontSize={"medium"} color="#878787" fontFamily="Roboto">
            Registered Office Address:
          </Heading>
          <Text>
            Shippr Internet Private Limited,</Text>
            <Text>Buildings Alyssa, Begonia & Clove</Text>
            <Text>Embassy Tech Village,</Text> 
            <Text>Outer Ring Road, </Text>
            <Text>Devarabeesanahalli Village,</Text>

            <Text>Bengaluru, 560103, Karnataka,</Text>
            <Text>India CIN : U51109KA2012PTC066107</Text>
            <Text>Telephone: 044-45614700</Text>
             
            
            
          
        </Box>
      </Box>
    </Box>
    <Box display={"flex"} justifyContent="space-around" bg={'#172337'} color='white' borderTop={'1px solid gray'} flexWrap='wrap'>
   <Box> <Link
              style={{fontSize:'medium',color:'white',fontFamily:"Roboto",display:'flex',justifyContent:'space-evenly'}}
              to="/"
              onClick={() => setSellerHeaderB(true)}
            >
             <Image src={becomeSeller}></Image> Become a Seller
            </Link></Box>
  
         
    
        <Text>©2023 Shippr.com</Text>
        <Image src={paymentM}/>
      </Box>
      </>
  );
};

export default Footer;
