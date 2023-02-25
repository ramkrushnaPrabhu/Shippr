import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShipprState } from "../Context/ShipprContext";

const AddProduct = () => {
  const { seller } = useShipprState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    pic: "",
    price: "",
    totalQTY: "",
    brand: "",
    category: "",
  });

  const onchange = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const postDetail = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "");
      data.append("cloud_name", "");
      fetch("https://api.cloudinary.com/v1_1//image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          productInfo.pic = data.url.toString();
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select Image for Upload!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleAddProduct = async () => {
    setLoading(true);
    const { name, description, pic, price, totalQTY, brand, category } =
      productInfo;

    if (
      !productInfo.name ||
      !productInfo.description ||
      !productInfo.totalQTY ||
      !productInfo.pic ||
      !productInfo.price ||
      !productInfo.brand ||
      !productInfo.category
    ) {
      setLoading(false);
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const { data } = await axios.post(
        "/product/api/addProduct",
        {
          name: name,
          description: description,
          pic: pic,
          price: Number(price),
          totalQTY: Number(totalQTY),
          brand: brand,
          category: category,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: seller.token,
          },
        }
      );

      setLoading(false);
      toast({
        title: "Product added Successful.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setProductInfo({
        name: "",
        description: "",
        pic: "",
        price: "",
        totalQTY: "",
        brand: "",
        category: "",
      });
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
    <>
      {seller ? (
        <Box
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          marginTop={"12px"}
          height={"800px"}
        >
          <Box
            border={{ base: "none", sm: "1px Solid lightgrey" }}
            padding={"50px 55px 55px 55px"}
            borderRadius={"15px"}
          >
            <VStack>
              <Text fontFamily={"Roboto"} fontSize={"3xl"} fontWeight={"bold"}>
                Add Your Product for Sale
              </Text>
              <FormControl isRequired="true">
                <FormLabel>Name of Product</FormLabel>
                <Input
                  type={"text"}
                  placeholder="Enter Name of Product"
                  name="name"
                  onChange={onchange}
                />
              </FormControl>
              <FormControl isRequired="true">
                <FormLabel>Description of Product</FormLabel>
                <Input
                  type={"text"}
                  placeholder="Enter description of Product"
                  name="description"
                  onChange={onchange}
                />
              </FormControl>
              <FormControl isRequired="true">
                <FormLabel>Price of Product</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter Price of Product"
                  name="price"
                  onChange={onchange}
                />
              </FormControl>

              <FormControl isRequired="true">
                <FormLabel>Total quantity of Product</FormLabel>
                <Input
                  type={"number"}
                  placeholder="Enter quantity of Product"
                  name="totalQTY"
                  onChange={onchange}
                />
              </FormControl>

              <FormControl isRequired="true">
                <FormLabel>Brand name</FormLabel>
                <Input
                  type={"text"}
                  placeholder="Enter brand name"
                  name="brand"
                  onChange={onchange}
                />
              </FormControl>

              <FormControl isRequired="true">
                <FormLabel>Select Category</FormLabel>
                <Select
                  placeholder="Select Category"
                  name="category"
                  onChange={onchange}
                >
                  <option value="Health">Health</option>
                  <option value="Books">Books</option>
                  <option value="Computers & Accessories">
                    Computers & Accessories
                  </option>
                  <option value="Mobiles">Mobiles</option>
                  <option value="Sports">Sports</option>
                  <option value="Electronics">Electronics</option>
                </Select>
              </FormControl>
              <FormControl isRequired="true">
                <FormLabel>Upload Image of Product</FormLabel>
                <Input
                  type={"file"}
                  accept="image/*"
                  p={"1.5"}
                  width={"300px"}
                  onChange={(e) => postDetail(e.target.files[0])}
                />
              </FormControl>
              <Button
                colorScheme={"blue"}
                onClick={handleAddProduct}
                isLoading={loading}
              >
                Add Product
              </Button>
            </VStack>
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

export default AddProduct;
