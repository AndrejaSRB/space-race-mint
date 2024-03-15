import {
  Flex,
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import BackgroundImage from "../../public/background.png";
import WalletProtection from "@/components/WalletProtection/WalletProtection";
import Image from "next/image";
import Logo from "../../public/logo.png";
import Ship1 from "../../public/Tier_1_notail.png";
import Ship2 from "../../public/Tier_2_notail.png";
import Ship3 from "../../public/Tier_3_notail.png";
import Tier from "@/pages/components/Tier";
import { env } from "process";
import { useReadContract, useAccount } from "wagmi";
import AbiObject from "../../abi";
import formatBN from "@/utils/formatBN";
import useIsWhitelisted from "@/hooks/useIsWhitelisted";
import useGetTier2Supply from "@/hooks/useGetTier2Supply";
import { formatEther } from "ethers";
import useIsWrongNetwork from "@/hooks/useIsWrongNetwork";
import WrongNetwork from "./components/WrongNetwork";

const tiers = [
  {
    id: 3,
    title: "TIER 3",
    eth: "0.066",
    description:
      "Valid for one Ascension season into Stage 2, perfect for newcomers to the OogaVerse.",
    img: Ship3,
    totalSupply: 1500,
  },
  {
    id: 2,
    title: "TIER 2",
    eth: "0.14",
    description:
      "Provides access for three Ascension seasons, balancing cost with meaningful long-term utility.",
    img: Ship2,
    totalSupply: 1000,
  },
  {
    id: 1,
    title: "TIER 1",
    eth: "0.288",
    description:
      "These premium SpaceShips offer unlimited MekaApes Ascension season validity, ensuring continuous engagement across all aspects of Stage 2 and beyond.",
    img: Ship1,
    totalSupply: 500,
  },
];

const Home = () => {
  const { address } = useAccount();
  const isWrongNetwork = useIsWrongNetwork();
  const isWhitelisted = useIsWhitelisted();

  console.log("isWrongNetwork", isWrongNetwork);

  return (
    <Flex
      position="relative"
      backgroundImage={`url(${BackgroundImage.src})`}
      backgroundPosition="center"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      zIndex={1}
      justify="center"
      align="center"
      paddingBottom="40px"
      paddingTop="40px"
      backgroundColor="#191C22"
      minH="100vh"
      color="white">
      {isWrongNetwork && <WrongNetwork />}

      <Flex
        flexDir="column"
        w="100%"
        maxW={{
          base: "100%",
          md: "700px",
          lg: 1000,
          "2xl": 1200,
        }}>
        <Flex
          justify="center"
          align="center"
          m="0 auto"
          position="relative"
          zIndex={1}
          maxWidth={{
            base: 200,
            md: 300,
          }}>
          <Image src={Logo} alt="logo" />
        </Flex>

        <Flex
          flexDir={{
            base: "column",
            lg: "row",
          }}
          maxWidth={{
            base: 300,
            lg: "100%",
          }}
          justify="center"
          m="0 auto"
          align="center"
          gap={4}
          marginTop={10}>
          {tiers.map((tier) => (
            <Tier tier={tier} key={tier.id} isWhitelisted={isWhitelisted} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
