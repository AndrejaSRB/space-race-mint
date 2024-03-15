import { useReadContract, useAccount } from 'wagmi'
import { getMerkleProof } from "@/web3/merkle/merkle";
import AbiObject from "../../abi";

const useGetTier1Supply = () => {

  const { data, refetch } = useReadContract({
    abi: AbiObject.abi,
    address: process.env.NEXT_PUBLIC_CONTRACT,
    functionName: "tier1Supply",
  });

  return {data, refetch};

}

export default useGetTier1Supply;
