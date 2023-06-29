import React from "react";
import { ethers } from "ethers";

import Nft from "./Nft";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  GridItem,
  SimpleGrid,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { getApiOptions } from "../utils";
const Nfts = () => {
  const perPage = 12;
  const [nfts, setNfts] = useState([]);
  const [showCount, setShowCount] = useState(perPage);
  const [address, setAddress] = useState(
    "0xe785E82358879F061BC3dcAC6f0444462D4b5330"
  );
  const [errorMessageText, setErrorMessageText] = useState("");
  const [startToken, setStartToken] = useState("");

  useEffect(() => {
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/yr1niw94mq2e44-Jjpcrv-RBCiJ1VG0I/getNFTsForCollection`;
    const withMetadata = true;
    if (!ethers.isAddress(address) && address !== "") {
      setErrorMessageText("Invalid address");
      setNfts(null);
    } else {
      if ((nfts === null || nfts.length < showCount) && address !== "") {
        const optionsNft = getApiOptions(
          `${baseURL}?contractAddress=${address}&withMetadata=${withMetadata}&startToken=${startToken}`,
          {},
          {}
        );
        axios(optionsNft)
          .then((response) => {
            setErrorMessageText("");
            setNfts([...nfts, ...response.data.nfts]);
            setStartToken(
              response.data.nfts[response.data.nfts.length - 1].id.tokenId
            );
          })
          .catch((error) => setErrorMessageText(error.message));
      }
    }
  }, [showCount, address]);

  return (
    <>
      <Container maxWidth={1290}>
        <Text fontSize="4xl" fontWeight="bold" marginTop="2" textAlign="center">
          Nft Gallery
        </Text>
        <FormControl marginBottom={4}>
          <FormLabel fontWeight={700} htmlFor="email">
            Contract-address
          </FormLabel>
          <Input
            id="email"
            type="email"
            value={address}
            onChange={(val) => {
              setAddress(val.target.value);
            }}
          />
        </FormControl>
        {errorMessageText && (
          <Alert show={errorMessageText} status="error">
            <AlertIcon />
            {errorMessageText}
          </Alert>
        )}
        <SimpleGrid columns={[2, null, 4]} gap={6}>
          {nfts.length > 0 &&
            nfts.slice(0, showCount).map((nft, id) => (
              <GridItem key={id}>
                <Nft
                  title={nft.title}
                  address={nft.contract.address}
                  id={parseInt(nft.id.tokenId, 16)}
                  image={nft.media[0].gateway}
                />
              </GridItem>
            ))}
        </SimpleGrid>
      </Container>
      <Container marginTop="4" centerContent>
        {nfts.length > 0 ? (
          <Button
            align="center"
            onClick={() => {
              setShowCount(showCount + perPage);
            }}
          >
            Load more
          </Button>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Nfts;
