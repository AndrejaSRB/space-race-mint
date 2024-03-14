import { useAccount } from "wagmi";
import { Flex } from "@chakra-ui/react";
import ConnectWalletButton from "../ConnectButton";
import BackgroundImage from "../../../public/background.png";
import Logo from "../../../public/logo.png";
import Image from "next/image";
const WalletProtection = ({ children }) => {
  const { isConnected } = useAccount();

  if (isConnected) {
    return <>{children}</>;
  }
  return (
    <Flex
      bgImage={BackgroundImage}
      justifyContent="center"
      align="center"
      flexDir="column"
      gap={20}
      backgroundImage={`url(${BackgroundImage.src})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      minHeight="100vh">
      <Flex position="relative" zIndex="1">
        <Image src={Logo} alt="logo" />
      </Flex>

      <ConnectWalletButton />
    </Flex>
  );
};

export default WalletProtection;
