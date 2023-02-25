import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useShipprState } from "../Context/ShipprContext";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Review = ({ productId, orderId }) => {
  const { user} = useShipprState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [fetchRev,setFetchRev]=useState(false);
  const [revEx, setRevEx] = useState("");

  const findReview = async () => {
    const { data } = await axios.post(
      "/review/api/reviewEx",
      {
        productId: productId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: user.token,
        },
      }
    );
    setRevEx(data);
  };

  const createReview = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "/review/api/createReview",
        {
          rating: rating,
          comment: comment,
          productId: productId,
          OrderId: orderId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: user.token,
          },
        }
      );
      setLoading(false);
      onClose();
      setFetchRev(!fetchRev)
      toast({
        title: "Review submited",
        status: "success",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });

    } catch {
      toast({
        title: "Error occured !",
        status: "error",
        isClosable: true,
        position: "bottom",
        duration: 5000,
      });
      setLoading(false);
      onClose();
    }
  };

  useEffect(() => {
    findReview();
    // eslint-disable-next-line
  }, [fetchRev]);

  return (
    <Box marginLeft={"8px"}>
      {revEx ? (
        <></>
      ) : (
        <Button colorScheme={"yellow"} onClick={onOpen}>
          Write Review
        </Button>
      )}
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Write Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"}>
              <Text fontFamily="Roboto">Rating :</Text>
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  onClick={() => setRating(i + 1)}
                  style={{ cursor: "pointer" }}
                >
                  {rating > i ? (
                    <AiFillStar fontSize="15px" size={"28px"} color="yellow" />
                  ) : (
                    <AiOutlineStar fontSize="15px" size={"28px"} />
                  )}
                </span>
              ))}
            </Box>

            <FormControl>
              <FormLabel>Comment</FormLabel>
              <Input
                placeholder="write comment"
                onChange={(e) => setComment(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={createReview}
              isLoading={loading}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Review;
