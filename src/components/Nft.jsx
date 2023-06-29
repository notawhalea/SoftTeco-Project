import React from "react";
import { Box, Image, Link } from "@chakra-ui/react";

const Nft = (props) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mt="1"
      fontWeight="semibold"
      as="h4"
      lineHeight="tight"
      noOfLines={1}
      alignItems="baseline"
    >
      <Image src={props.image} alt="wow-image" style={{ width: "100%" }} />
      <Link
        href={
          "https://opensea.io/assets/ethereum/" + props.address + "/" + props.id
        }
        target="_blank"
        style={{ marginLeft: "6rem" }}
      >
        {/*to access info about this pretty woman we need turn on vpn(*/}
        {props.title ? props.title : "#" + props.id}
      </Link>
      {props.description}
    </Box>
  );
};

export default Nft;
