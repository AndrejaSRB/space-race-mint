import { useCallback } from "react";
import AbiObject from "../../abi";
import { getMerkleProof } from "@/web3/merkle/merkle";
import {
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "ethers";
import useGetTier2Supply from "./useGetTier2Supply";
import { TIER_2_PRICE } from '@/constants';


const usePurchaseTier2 = () => {
  const { address } = useAccount();
  const merkleProof = getMerkleProof(address);
  const { refetch } = useGetTier2Supply();

  const { data: hash, isPending, writeContract } = useWriteContract();

  const onPurchaseTier2 = useCallback((amount) => {
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT,
      abi: AbiObject.abi,
      functionName: "participateTier2",
      args: [BigInt(amount ? amount : 1), false, merkleProof],
      value: parseEther(TIER_2_PRICE) * BigInt(amount ? amount : 1),
    });
  }, []);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      onSuccess: async () => {
        await refetch();
      },
    });

  return {
    onPurchaseTier2,
    isPending: isPending || isConfirming,
    isConfirming,
    isConfirmed,
  };
};

export default usePurchaseTier2;
