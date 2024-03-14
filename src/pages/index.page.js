import { Flex, Box, Button } from "@chakra-ui/react";
import BackgroundImage from "../../public/background.png";
import WalletProtection from "@/components/WalletProtection/WalletProtection";
import Image from "next/image";
import Logo from "../../public/logo.png";
import Ship1 from "../../public/Tier_1_notail.png";
import Ship2 from "../../public/Tier_2_notail.png";
import Ship3 from "../../public/Tier_3_notail.png";
import Tier from '@/pages/components/Tier';

const tiers = [
  {
    id: 3,
    title: "TIER 3",
    eth: "0.09 ETH",
    description:
      "Valid for one Ascension season into Stage 2, perfect for newcomers to the OogaVerse.",
    img: Ship3,
  },
  {
    id: 2,
    title: "TIER 2",
    eth: "0.19 ETH",
    description:
      "Provides access for three Ascension seasons, balancing cost with meaningful long-term utility.",
    img: Ship2,
  },
  {
    id: 1,
    title: "TIER 1",
    eth: "0.39 ETH",
    description:
      "These premium SpaceShips offer unlimited MekaApes Ascension season validity, ensuring continuous engagement across all aspects of Stage 2 and beyond.",
    img: Ship1,
  },
];


export default function Home() {
  return (
    <Flex
      position="relative"
      backgroundImage={`url(${BackgroundImage.src})`}
      backgroundPosition='center'
      backgroundSize= 'cover'
      backgroundRepeat= 'no-repeat'
      zIndex={1}
      justify="center"
      align="center"
      paddingBottom="40px"
      paddingTop="40px"
      backgroundColor="#191C22"
      minH="100vh"
      color="white">

      <WalletProtection>
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
              <Tier tier={tier} key={tier.id}/>
            ))}
          </Flex>
        </Flex>
      </WalletProtection>
    </Flex>
  );
}
