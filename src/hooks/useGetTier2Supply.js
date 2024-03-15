import { useReadContract, useAccount } from "wagmi";
import { getMerkleProof } from "@/web3/merkle/merkle";
import AbiObject from "../../abi";

const useGetTier2Supply = () => {
  const { data, refetch } = useReadContract({
    abi: AbiObject.abi,
    address: process.env.NEXT_PUBLIC_CONTRACT,
    functionName: "tier2Supply",
  });

  return { data, refetch };
};

export default useGetTier2Supply;
