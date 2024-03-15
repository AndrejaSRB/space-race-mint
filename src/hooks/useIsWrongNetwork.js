import { chain as expectChain } from "@/web3/chain";
import { useAccount, useChainId } from "wagmi";
const useIsWrongNetwork = () => {
  const { chainId } = useAccount();
  const isWrongNetwork = chainId !== expectChain.id;

  return Boolean(isWrongNetwork);
};

export default useIsWrongNetwork;
