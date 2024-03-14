import { Flex, Box, Button } from "@chakra-ui/react";
import Image from "next/image";

const Tier = ({ tier }) => {
  return (
    <Flex
    position="relative"
    zIndex={1}
    key={tier.id}
    flexDir="column"
    paddingBottom={{
      base: 10,
      lg: 0,
    }}>
    <Flex
      position="relative"
      backgroundColor="#00000014"
      flexDir="column"
      border="1px solid rgba(255, 255, 255, 0.24)"
      p={5}>
      <Box
        position="absolute"
        left="16px"
        top="16px"
        backgroundColor="rgba(255, 255, 255, 0.24)"
        padding={2}
        borderRadius={4}
        fontSize={{
          base: 12,
          lg: 14,
        }}
        border="1px solid white">
        {tier.title}
      </Box>

      <Image
        src={tier.img}
        alt={tier.title}
        width={{
          base: 200,
          md: 50,
        }}
      />

      <Flex justify="center" fontWeight="bold" position="absolute" bottom="16px" left="50%" transform={"translateX(-50%)"} fontSize={{
        base: 16,
        lg: 22,
      }}>{tier.eth}</Flex>
    </Flex>

    <Flex
      border="1px solid rgba(255, 255, 255, 0.24)"
      mt="8px"
      backgroundColor="#00000014"
      p={4}
      minH={{
        base: 150,
        lg: 200,
      }}
      flexDir="column"
      align="center"
      justify="space-between">
      <Box
        textAlign="center"
        fontSize={{
          base: 12,
          lg: 16,
        }}>
        {tier.description}
      </Box>

      <Box fontWeight="bold">1500/1500</Box>
    </Flex>

    <Flex
      flexDir="column"
      align="center"
      minH={{
        base: "auto",
        lg: "115px",
      }}>
      <Button
        h="40px"
        mt={4}
        textTransform="uppercase"
        color="white"
        backgroundColor="#CD1A64"
        clipPath={
          "polygon(-10% -10%, 110% -10%, 110% 110%, 10% 110%, -10% 0%);  width: 203px"
        }>
        {`PURCHASE T${tier.id}`}
      </Button>

      {tier.id === 3 && (
        <Button
          h="40px"
          mt={4}
          textTransform="uppercase"
          color="white"
          backgroundColor="#CD1A64"
          clipPath={
            "polygon(-10% -10%, 110% -10%, 110% 110%, 10% 110%, -10% 0%);  width: 203px"
          }>
          UPGRADE TO T2
        </Button>
      )}
    </Flex>
  </Flex>
  );
};

export default Tier;
