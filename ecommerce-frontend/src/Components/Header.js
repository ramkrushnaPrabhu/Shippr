import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListIcon,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Effect } from "react-notification-badge";
import NotificationBadge from "react-notification-badge/lib/components/NotificationBadge";
import cartPic from "../Icons/icons8-shopping-cart-50.png";
import { Link, useNavigate } from "react-router-dom";
import { ArrowForwardIcon, HamburgerIcon, Search2Icon } from "@chakra-ui/icons";
import { useShipprState } from "../Context/ShipprContext";
import { useState } from "react";

const Header = () => {
 
  const {SellerHeaderB, setSellerHeaderB,user,setUser,}=useShipprState()
  const {search,setSearch,cart,setCart}=useShipprState()
  

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const {seller,setSeller}=useShipprState();
  const toast=useToast();
  const navigate=useNavigate();

  const sellerLogoutHandler = () => {
    localStorage.removeItem("sellerInfo");
    setSeller()
    navigate("/");
    toast({
      title: "Logout Successful!",
      status: "success",
      duration: 3500,
      isClosable: true,
      position: "bottom",
    });
  };
  const userLogoutHandler = async() => {
    localStorage.removeItem("userInfo");
    setUser()
    navigate("/");
    setCart([]);
    toast({
      title: "Logout Successful!",
      status: "success",
      duration: 3500,
      isClosable: true,
      position: "bottom",
    });
  };


  return (
    <>
      {SellerHeaderB ? (
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
          >
            <Link className="Header_Logo--seller" to="/">
              ShipprSeller
            </Link>

            <Link className="Header_option--seller" to="/addProducts">
              Add Your Product
            </Link>
            <Link className="Header_option--seller" to="/myProducts">
              My Products
            </Link>
            <Link className="Header_option--seller" to="/sellerProfile">
              My Profile
            </Link>

            <Menu
              display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            >
              <MenuButton
                as={Button}
                bg={"blue.600"}
                color="white"
                display={{ base: "none", sm: "none", md: "block", lg: "block" }}
              >
                {seller? "Logout":"Login"}
              </MenuButton>
              <MenuList color={"#2874f0"}>
                {seller ? <MenuItem fontWeight={"bold"}>
                  <Box  onClick={sellerLogoutHandler} cursor='pointer'>Logout</Box>
                </MenuItem>
                :<MenuItem fontWeight={"bold"}>
                  <Link to="/loginSeller">Login</Link>
                </MenuItem>}
                {seller ? <></>:<MenuItem fontWeight={"bold"}>
                  <Link to="/signupSeller">Signup</Link>
                </MenuItem>}
              </MenuList>
            </Menu>
            <Box>
              <IconButton
                icon={<HamburgerIcon />}
                color="blue"
                ref={btnRef}
                onClick={onOpen}
                display={{ base: "block", sm: "block", md: "none", lg: "none" }}
              />
            </Box>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>

                <DrawerBody>
                  <List spacing={3} color={"blue.500"}>
                    {seller? 
                      <ListItem>
                      <ListIcon as={ArrowForwardIcon} color="green.500" />
                      <Button onClick={sellerLogoutHandler} variant='unstyled'>Logout</Button>
                    </ListItem>
                    :<ListItem>
                      <ListIcon as={ArrowForwardIcon} color="green.500" />
                      <Link to="/loginSeller">Login</Link>
                    </ListItem>}

                    {seller ?<></>:<ListItem>
                      <ListIcon as={ArrowForwardIcon} color="green.500" />
                      <Link to="/signupSeller">Signup</Link>
                    </ListItem>}

                    <ListItem>
                      <ListIcon as={ArrowForwardIcon} color="green.500" />
                      <Link to="/addProducts">Add Your Product</Link>
                    </ListItem>

                    <ListItem>
                      <ListIcon as={ArrowForwardIcon} color="green.500" />
                      <Link to="/myProducts">My Products</Link>
                    </ListItem>

                    <ListItem>
                      <ListIcon as={ArrowForwardIcon} color="green.500" />
                      <Link to="/sellerProfile">My Profile</Link>
                    </ListItem>
                  </List>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        </Box>
      ) : (
        <Box
          display={"flex"}
          justifyContent={{ base: "center", lg: "center" }}
          alignItems={"center"}
          bg="#2874f0"
          width={"100%"}
          height={"56px"}
          color="white"
          
        >
          <Box
            display={"flex"}
            justifyContent={{ base: "space-around", lg: "space-evenly" }}
            width={{ base: "95%", lg: "75%" }}
            alignItems="center"
          >
            <Link className="Header_Logo" to="/">
              Shippr
            </Link>
            <Box>
              {" "}
              <FormControl>
                <InputGroup>
                  {" "}
                  <Input
                    width={{
                      base: "210px",
                      sm: "210px",
                      md: "280px",
                      lg: "400px",
                    }}
                    bg="white"
                    placeholder="Search for products, brands and more"
                    color={"black"}
                    type="text"
                    onChange={(e)=>setSearch(e.target.value)}
                  />
                  <InputRightElement>
                    <Link to={`/allProduct/?query=${search}`}><Search2Icon color={"blue"} cursor="pointer"/></Link>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Box>
            <Menu
              display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            >
              <MenuButton
                as={Button}
                color="#2874f0"
                display={{ base: "none", sm: "none", md: "block", lg: "block" }}
              >
                {user ? "Account":"Login"}
              </MenuButton>
              <MenuList color={"#2874f0"}>
              {user ? <MenuItem fontWeight={"bold"}>
                  <Link to="/" onClick={userLogoutHandler}>Logout</Link>
                </MenuItem> 
                :
                <MenuItem fontWeight={"bold"}>
                  <Link to="/login">Login</Link>
                </MenuItem>
                }
                {user ?<></>:<MenuItem fontWeight={"bold"}>
                  <Link to="/signup">Signup</Link>
                </MenuItem>}
                <MenuItem fontWeight={"bold"}>
                  <Link to="/orderH">Orders</Link>{" "}
                </MenuItem>
                <MenuItem fontWeight={"bold"}>
                  <Link to="/UserProfile">Profile</Link>{" "}
                </MenuItem>
                <MenuItem fontWeight={"bold"}>
                  <Link to="/cart">Cart</Link>{" "}
                </MenuItem>
              </MenuList>
            </Menu>
            {user? <></>:<Link
              className="becomeSellerHeader"
              to="/"
              onClick={() => setSellerHeaderB(true)}
            >
              Become a Seller
            </Link>}
            <Link to="/cart" className="cartLogo">
              <NotificationBadge count={user ? cart.length  : null  } effect={Effect.SCALE} />
              <Image src={cartPic} height={35} width={35} />
            </Link>
            <Box> 
              <IconButton
                icon={<HamburgerIcon />}
                color="blue"
                ref={btnRef}
                onClick={onOpen}
                display={{ base: "block", sm: "block", md: "none", lg: "none" }}
              />
            </Box>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>

                <DrawerBody>
                  <List spacing={3} color={"blue.500"}>
                  {
                    user ?<ListItem>
                      <ListIcon as={ArrowForwardIcon} color="green.500" />
                      <Link to="/" onClick={userLogoutHandler}>Logout</Link>
                    </ListItem>
                     :<ListItem>
                      <ListIcon as={ArrowForwardIcon} color="green.500" />
                      <Link to="/login">Login</Link>
                    </ListItem>
                  }
                    

                    {user ? <></>:
                      <ListItem>
                      <ListIcon as={ArrowForwardIcon} color="green.500" />
                      <Link to="/signup">Signup</Link>
                    </ListItem>}

                    <ListItem>
                      <ListIcon as={ArrowForwardIcon} color="green.500" />
                      <Link to={'/cart'}>Cart</Link>
                    </ListItem>

                    <ListItem>
                      <ListIcon as={ArrowForwardIcon} color="green.500" />
                      <Link to={'/orderH'}>Order History</Link>
                    </ListItem>

                    <ListItem>
                      <ListIcon as={ArrowForwardIcon} color="green.500" />
                      <Link to="/UserProfile">Profile</Link>
                    </ListItem>
                    {user? <></>:<ListItem>
                      <ListIcon as={ArrowForwardIcon} color="green.500" />
                      <Link to="/" onClick={() => setSellerHeaderB(true)}>Become a Seller</Link>
                    </ListItem>}
                  </List>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Header;
