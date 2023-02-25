import { useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";


const Shipper = createContext();

const ShipprContext = ({ children }) => {
  const [SellerHeaderB, setSellerHeaderB] = useState(false);
  const [seller, setSeller] = useState();
  const [sellerMyProducts, setSellerMyProducts] = useState();
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  const [rating,setRating]=useState(0)
 

  const [cart, setCart] = useState([]);
  const toast = useToast();


  const AddToCart = async (id, name, QTY, pic, price) => {
    try {
      const data = await axios.post(
        "/cart/api/addToCart",
        {
          productId: id,
          name: name,
          pic: pic,
          price: price,
          qty: QTY,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: user.token,
          },
        }
      );
      toast({
        title: "Successfully added to cart",
        status: "success",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
    } catch (error) {
   
      toast({
        title: "Error Occured!",
        status: "error",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
    }
  };

  

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(
        "/cart/api/displayCart",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: user.token,
          },
        }
      );

      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, [user,AddToCart]);

 


  return (
    <Shipper.Provider
      value={{
        SellerHeaderB,
        setSellerHeaderB,
        setSeller,
        seller,
        sellerMyProducts,
        setSellerMyProducts,
        user,
        setUser,
        cart,
        setCart,
        search,
        setSearch,
        AddToCart,
        fetchCart,
        rating,setRating
     
      }}
    >
      {children}
    </Shipper.Provider>
  );
};



export default ShipprContext;

export const useShipprState = () => {
  return useContext(Shipper);
};
