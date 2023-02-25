import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  Modal,
  Radio,
  Stack,
  Heading,
  CardBody,
  Image,
  Card,
  RadioGroup,
} from "@chakra-ui/react";
import { Pagination } from "@material-ui/lab";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Rating from "../Components/Rating";
import { useShipprState } from "../Context/ShipprContext";
import {  getItemSelector, sortByPrice} from "../Store/FilterSlice";



const AllProducts = () => {
  const dispatch = useDispatch();
  const filtersA = useSelector(getItemSelector);
  const { search ,rating,setRating} = useShipprState();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchAllProduct = async () => {
    try {
      const query = searchParams.get("query");
      const { data } = await axios.get(
        `/product/api/getProductBySearch?keyword=${query}`
      );

      setAllProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBySearch = async () => {
    try {
      const { data } = await axios.get(
        `/product/api/getProductBySearch?keyword=${search}`
      );

      setAllProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const transformAllProducts = () => {
    let sortedProducts = allProducts;
  
    if (filtersA.sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        filtersA.sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (rating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.rating === rating
      );
    }

    return sortedProducts;
  };


  useEffect(() => {
    fetchAllProduct();
    // eslint-disable-next-line
  }, [allProducts]);

  useEffect(() => {
    fetchBySearch();
    // eslint-disable-next-line
  }, [search]);

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={{ base: "center", lg: "center" }}
        alignItems={"center"}
        width={"100%"}
        height={"56px"}
      >
        <Box
          display={"flex"}
          justifyContent={{ base: "space-around", lg: "space-evenly" }}
          width={{ base: "95%", lg: "75%" }}
          alignItems="center"
          borderBottom="1px solid gray"
        >
          <Button
            variant={"ghost"}
            leftIcon={<ChevronDownIcon />}
            onClick={onOpen}
          >
            Filters
          </Button>
          <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Filters</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box
                  display={"grid"}
                  alignContent="space-around"
                  height={"190px"}
                >
                  <RadioGroup marginBottom={"1px"} marginTop="3px">
                    <Stack spacing={5} direction="column">
                    <Text fontFamily={'Roboto'}>Sort by Price</Text>
                      <Radio
                        colorScheme="red"
                        value="LowToHigh"
                        onChange={() => dispatch(sortByPrice("lowToHigh"))}
                      >
                        Low To High
                      </Radio>
                      <Radio
                        colorScheme="green"
                        value="HighToLow"
                        onChange={() => dispatch(sortByPrice("highToLow"))}
                      >
                        High To Low
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <Text display='flex' flexDirection={'column'} justifyContent='center' alignContent={'space-around'} >
                  <Text fontFamily={'Roboto'}>Sort by Rating</Text>
                    <Rating
                      rating={rating}
                      set={(i)=> setRating(i+1)}
                      style={{cursor:"pointer"}}
                    />
                  </Text>
                </Box>
                <Button colorScheme={"orange"} 
                onClick={()=>setRating(0)}
                >
                  Clear Rating
                </Button>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent={{ base: "center", lg: "center" }}
        alignItems={"center"}
        width={"100%"}
      >
        <Box
          marginBottom={"25px"}
        >
          {allProducts ? 
            transformAllProducts()
              .slice(page * 8 - 8, page * 8)
              .map((item) => (
                <Box>
                  <Link
                    to={`/singleProduct/${item._id}`}
                    key={item._id}
                    style={{ marginBottom: "10px" }}
                  >
                    <Card
                      direction={{ base: "column", sm: "column", md: "row" }}
                      overflow="hidden"
                      variant="outline"
                      width={{ lg: "1020px" }}
                    >
                      <Image
                        objectFit="cover"
                        maxW={{
                          base: "100%",
                          sm: "400px",
                          md: "300px",
                          lg: "400",
                        }}
                        src={item.pic}
                        alt={item.name}
                      />
                      <Stack>
                        <CardBody>
                          <Heading size="md">{item.name}</Heading>
                          <Text py="2" fontFamily={"Roboto"}>
                            Rating : <Rating rating={item.rating} />
                          </Text>
                          <Text py="2" fontFamily={"Roboto"} fontSize="2xl">
                            ₹{item.price}/-
                          </Text>
                        </CardBody>
                      </Stack>
                    </Card>
                  </Link>
                </Box>
              )
          ) : (
            <Box
              display={"flex"}
              justifyContent={{ base: "center", lg: "center" }}
              alignItems={"center"}
              width={"100%"}
              height={"560px"}
            >
              <Box
                display={"flex"}
                justifyContent={{ base: "space-around", lg: "space-evenly" }}
                width={{ base: "95%", lg: "75%" }}
                alignItems="center"
                borderBottom="1px solid gray"
              >
                <Spinner />
              </Box>
            </Box>
          )}
          <Box
            display="flex"
            justifyContent="center"
            alignItems={"center"}
            width={"100%"}
            height="56px"
          >
            {allProducts ? (
              <Pagination
                count={Math.ceil(allProducts.length / 8)}
                variant="outlined"
                shape="rounded"
                onChange={(_, value) => {
                  setPage(value);
                  window.scroll(0, 450);
                }}
              />
            ) : (
              <Box
                display={"flex"}
                justifyContent={{ base: "center", lg: "center" }}
                alignItems={"center"}
                width={"100%"}
                height={"560px"}
              >
                <Box
                  display={"flex"}
                  justifyContent={{ base: "space-around", lg: "space-evenly" }}
                  width={{ base: "95%", lg: "75%" }}
                  alignItems="center"
                  borderBottom="1px solid gray"
                >
                  <Spinner />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default AllProducts;
