import {
  Box,
  Button,
  Card,
  CardBody,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShipprState } from "../Context/ShipprContext";
import MainForSeller from "./MainForSeller";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ban1 from "../Banner/MOTOROLA g52 (Charcoal Grey, 128 GB) (6 GB RAM).png";
import ban2 from "../Banner/jjj.png";
import ban3 from "../Banner/Zebronics Zeb-Companion 107 USB Wireless Keyboard and Mouse Set with Nano Receiver.png";
import ban4 from "../Banner/OnePlus 80 cm (32 inches) Y Series HD Ready LED Smart Android TV 32Y1 (Black).png";
import ban5 from "../Banner/RichDad.png";
import ban6 from "../Banner/WoW.png";
import axios from "axios";
import { ChevronDownIcon } from "@chakra-ui/icons";

const MainForUser = () => {
  const { SellerHeaderB } = useShipprState();
  const [electronics, setElectronics] = useState();
  const [mobile,setMobile]=useState();
  const [books,setBooks]=useState()
  const [ComputersAccessories,setComputersAccessories]=useState()
  const [Health,setHealth]=useState()
  const [Sports,setSports]=useState()

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const responsive1 = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 9,
      slidesToSlide: 9,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  const fetchElectronics = async () => {
    const { data } = await axios.post(
      `/product/api/getProductByCategory`,
      {
        category: "Electronics",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setElectronics(data);
  };

  const fetchMobile = async () => {
    const { data } = await axios.post(
      `/product/api/getProductByCategory`,
      {
        category: "Mobiles",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setMobile(data);
  };


  const fetchBooks = async () => {
    const { data } = await axios.post(
      `/product/api/getProductByCategory`,
      {
        category: "Books",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setBooks(data);
  };

  const fetchComputers = async () => {
    const { data } = await axios.post(
      `/product/api/getProductByCategory`,
      {
        category: "Computers & Accessories",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setComputersAccessories(data);
  };


  const fetchHealth = async () => {
    const { data } = await axios.post(
      `/product/api/getProductByCategory`,
      {
        category: "Health",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setHealth(data);
  };

  const fetchSports = async () => {
    const { data } = await axios.post(
      `/product/api/getProductByCategory`,
      {
        category: "Sports",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setSports(data);
  };

  useEffect(() => {
    fetchElectronics()
    fetchMobile()
    fetchBooks()
    fetchComputers()
    fetchHealth()
    fetchSports()
  }, []);
  

  return (
    <>
      {SellerHeaderB ? (
        <MainForSeller />
      ) : (
        <Box>
          <Box
            display={"flex"}
            justifyContent={{ base: "center", lg: "center" }}
            alignItems={"center"}
            width={"100%"}
            height={"56px"}
            padding={{ base: "35px 35px 35px 35px" }}
            border={"1px solid gray"}
          >
            <Box
              display={{ base: "none", sm: "none", md: "flex", lg: "flex" }}
              justifyContent={{ base: "space-around", lg: "space-evenly" }}
              width={{ base: "95%", lg: "75%" }}
              alignItems="center"
              flexWrap={"wrap"}
            >
              <Link to="/allProduct/?query=Health">
                <Button colorScheme={"teal"}>Health</Button>
              </Link>
              <Link to="/allProduct/?query=Books">
                <Button colorScheme={"teal"}>Books</Button>
              </Link>
              <Link to="/allProduct/?query=Computers & Accessories">
                <Button colorScheme={"teal"}>Computers & Accessories</Button>
              </Link>
              <Link to="/allProduct/?query=Mobiles">
                <Button colorScheme={"teal"}>Mobiles</Button>
              </Link>
              <Link to="/allProduct/?query=Sports">
                <Button colorScheme={"teal"}>Sports</Button>
              </Link>
              <Link to="/allProduct/?query=Electronics">
                <Button colorScheme={"teal"}>Electronics</Button>
              </Link>
            </Box>
            <Box
              display={{ base: "flex", sm: "flex", md: "none", lg: "none" }}
              justifyContent={{ base: "space-around", lg: "space-evenly" }}
              width={{ base: "95%", lg: "75%" }}
              alignItems="center"
              flexWrap={"wrap"}
            >
              
              <Menu>
  <MenuButton
as={Button}
colorScheme='blue'
    fontFamily={'Roboto'}
  >
    View Category <ChevronDownIcon />
  </MenuButton>
  <MenuList>
    <MenuItem><Link to={'/allProduct/?query=Health'}>Health</Link></MenuItem>
    <MenuItem><Link to={'/allProduct/?query=Books'}>Books</Link></MenuItem>
    <MenuItem><Link to={'/allProduct/?query=Computers & Accessories'}>Computers & Accessories</Link></MenuItem>
    <MenuItem> <Link to={'/allProduct/?query=Mobiles'}>Mobiles</Link></MenuItem>
    <MenuItem><Link to={'/allProduct/?query=Sports'}>Sports</Link></MenuItem>
    <MenuItem><Link to="/allProduct/?query=Electronics">Electronics</Link></MenuItem>          
  </MenuList>
</Menu>
            </Box>
          </Box>
          <Carousel
            responsive={responsive}
            customTransition="1s"
            transitionDuration={1500}
            autoPlay={true}
            autoPlaySpeed={1000}
            rewind={true}
          >
            <Box>
            <Link to='/singleProduct/63f7727fc87a8365d8f38bdd'><Image src={ban1} alt="sliderImg" /></Link>
              
            </Box>
            <Box>
            <Link to='/singleProduct/63f77990c87a8365d8f38e0c'> <Image src={ban2} alt="sliderImg" /></Link>
             
            </Box>
            <Box>
            <Link to='/singleProduct/63f780e5c87a8365d8f39086'> <Image src={ban3} alt="sliderImg" /></Link>
             
            </Box>
            <Box>
            <Link to='/singleProduct/63f77159c87a8365d8f38ba9'><Image src={ban6} alt="sliderImg" /></Link>
              
            </Box>
            <Box>
            <Link to={`/singleProduct/63f78402c87a8365d8f39192`}><Image src={ban5} alt="sliderImg" /></Link>
              
            </Box>
            <Box>
            <Link to={`/singleProduct/63f76b21c87a8365d8f38976`}><Image src={ban4} alt="sliderImg" /></Link>
              
            </Box>
          </Carousel>
          <Box margin={"50px"}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text fontSize={"2xl"} fontFamily="Roboto">
                Electronics
              </Text>
              <Link to={"/allProduct/?query=Electronics"} style={{ color: "blue", fontFamily: "Roboto" }}>
                View More
              </Link>
            </Box>
           <Carousel
              responsive={responsive1}
              customTransition="1s"
              transitionDuration={1000}
            >
              {electronics ? electronics.map((elec) => (
                <Link to={`/singleProduct/${elec._id}`}>
                  <Card maxW="md">
                    <CardBody>
                      <Image
                        src={elec.pic}
                        alt={elec.name.slice(0, 22) + "..."}
                        borderRadius="lg"
                        height={"180px"}
                        width={"250px"}
                      />
                      <Stack mt="auto" spacing="3">
                        <Text fontSize={"2xm"} fontWeight="bold">
                          {elec.name.slice(0, 22) + "..."}
                        </Text>
                      </Stack>
                    </CardBody>
                  </Card>
                </Link>
              ))
              : (<Spinner/>)
              }
            </Carousel> 
          </Box>

          <Box margin={"50px"}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text fontSize={"2xl"} fontFamily="Roboto">
                Sports
              </Text>
              <Link to={"/allProduct/?query=Sports"} style={{ color: "blue", fontFamily: "Roboto" }}>
                View More
              </Link>
            </Box>

            <Carousel
              responsive={responsive1}
              customTransition="1s"
              transitionDuration={1000}
            >
             {Sports ? Sports.map((sp) => (
              <Link to={`/singleProduct/${sp._id}`}>
                <Card maxW="md">
                  <CardBody>
                    <Image
                      src={sp.pic}
                      alt={sp.name.slice(0, 22) + "..."}
                      borderRadius="lg"
                      height={"140px"}
                    />
                    <Stack mt="auto" spacing="3">
                      <Text fontSize={"2xm"} overflowY="hidden">
                      {sp.name.slice(0, 22) + "..."}
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>
              ))
              : (<Spinner/>)
              }
            </Carousel>
          </Box>

          <Box margin={"50px"}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text fontSize={"2xl"} fontFamily="Roboto">
                Mobiles
              </Text>
              <Link to={"/allProduct/?query=Mobiles"} style={{ color: "blue", fontFamily: "Roboto" }}>
                View More
              </Link>
            </Box>

            <Carousel
              responsive={responsive1}
              customTransition="1s"
              transitionDuration={1000}
            >
            {mobile ? mobile.map((mb) => (
              <Link to={`/singleProduct/${mb._id}`}>
                <Card maxW="md">
                  <CardBody>
                    <Image
                      src={mb.pic}
                      alt={mb.name.slice(0, 22) + "..."}
                      borderRadius="lg"
                      height={"140px"}
                    />
                    <Stack mt="auto" spacing="3">
                      <Text fontSize={"2xm"} overflowY="hidden">
                      {mb.name.slice(0, 22) + "..."}
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>
              ))
              : (<Spinner/>)
              }
            </Carousel>
          </Box>

          <Box margin={"50px"}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text fontSize={"2xl"} fontFamily="Roboto">
                Books
              </Text>
              <Link to={"/allProduct/?query=Books"} style={{ color: "blue", fontFamily: "Roboto" }}>
                View More
              </Link>
            </Box>

            <Carousel
              responsive={responsive1}
              customTransition="1s"
              transitionDuration={1000}
            >
             {books ? books.map((bk) => (
              <Link to={`/singleProduct/${bk._id}`}>
                <Card maxW="md">
                  <CardBody>
                    <Image
                      src={bk.pic}
                      alt={bk.name.slice(0, 22) + "..."}
                      borderRadius="lg"
                      height={"140px"}
                    />
                    <Stack mt="auto" spacing="3">
                      <Text fontSize={"2xm"} overflowY="hidden">
                      {bk.name.slice(0, 22) + "..."}
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>
              ))
              : (<Spinner/>)
              }
            </Carousel>
          </Box>

          <Box margin={"50px"}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text fontSize={"2xl"} fontFamily="Roboto">
                Computers & Accessories
              </Text>
              <Link to={"/allProduct/?query=Computers & Accessories"} style={{ color: "blue", fontFamily: "Roboto" }}>
                View More
              </Link>
            </Box>

            <Carousel
              responsive={responsive1}
              customTransition="1s"
              transitionDuration={1000}
            >
             {ComputersAccessories ? ComputersAccessories.map((com) => (
              <Link to={`/singleProduct/${com._id}`}>
                <Card maxW="md">
                  <CardBody>
                    <Image
                      src={com.pic}
                      alt= {com.name.slice(0, 22) + "..."}
                      borderRadius="lg"
                      height={"140px"}
                    />
                    <Stack mt="auto" spacing="3">
                      <Text fontSize={"2xm"} overflowY="hidden">
                      {com.name.slice(0, 22) + "..."}
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>
              ))
              : (<Spinner/>)
              }
            </Carousel>
          </Box>

          <Box margin={"50px"}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text fontSize={"2xl"} fontFamily="Roboto">
                Health
              </Text>
              <Link to={"/allProduct/?query=Health"} style={{ color: "blue", fontFamily: "Roboto" }}>
                View More
              </Link>
            </Box>

            <Carousel
              responsive={responsive1}
              customTransition="1s"
              transitionDuration={1000}
            >
             {Health ? Health.map((hlt) => (
              <Link to={`/singleProduct/${hlt._id}`}>
                <Card maxW="md">
                  <CardBody>
                    <Image
                      src={hlt.pic}
                      alt={hlt.name.slice(0, 22) + "..."}
                      borderRadius="lg"
                      height={"140px"}
                    />
                    <Stack mt="auto" spacing="3">
                      <Text fontSize={"2xm"} overflowY="hidden">
                      {hlt.name.slice(0, 22) + "..."}
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>
              ))
              : (<Spinner/>)
              }
            </Carousel>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MainForUser;
