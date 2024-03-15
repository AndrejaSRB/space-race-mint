import {
  Flex,
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
const WrongNetwork = () => {
  return (
    <Alert
      status="warning"
      position="fixed"
      left="0"
      top="0"
      w="100%"
      zIndex={9999}
      backgroundColor="#eabe10"
      color="black"
      fontWeight="bold"
      justifyContent="center">
      <AlertIcon />
      You are using a wrong network! Switch to the {process.env.NEXT_PUBLIC_CHAIN}.
    </Alert>
  );
};

export default WrongNetwork;
