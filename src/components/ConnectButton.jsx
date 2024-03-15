import { useAccount } from "wagmi";
import { FC, useState } from "react";
import { Button, ButtonProps, useDisclosure } from "@chakra-ui/react";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const ConnectWalletButton = (props) => {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();

  const label = isConnected ? "Discconnect" : "Connect Wallet";

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  function onClick() {
    if (!isConnected) {
      onOpen();
    }
  }

  return (
    <Button
      variant="red"
      h="60px"
      mr={4}
      textTransform="uppercase"
      onClick={onClick}
      isDisabled={loading}
      color="white"
      backgroundColor="#CD1A64">
      {loading ? "Loading..." : label}
    </Button>
  );
};

export default ConnectWalletButton;
