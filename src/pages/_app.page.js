import "@fontsource/dm-mono";
import { Web3ContextProvider } from "@/context/web3";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/theme";
import WalletProtection from "@/components/WalletProtection/WalletProtection";
import { WagmiProvider } from "wagmi";
import { config } from "@/web3/config";

function SpaceRaces({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Space Races</title>
      </Head>

      <ChakraProvider theme={theme}>
        <Web3ContextProvider>
          <WalletProtection>
              <Component {...pageProps} />
          </WalletProtection>
        </Web3ContextProvider>
      </ChakraProvider>
    </>
  );
}

export default SpaceRaces;
