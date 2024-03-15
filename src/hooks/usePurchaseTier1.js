import { useCallback } from "react";
import AbiObject from "../../abi";
import { getMerkleProof } from "@/web3/merkle/merkle";
import {
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "ethers";
import useGetTier3Supply from "./useGetTier3Supply";
import useGetTier1Supply from "./useGetTier1Supply";
import { TIER_1_PRICE } from '@/constants';

const usePurchaseTier1 = () => {
  const { address } = useAccount();
  const merkleProof = getMerkleProof(address);
  const { refetch } = useGetTier1Supply();

  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const onPurchaseTier1 = useCallback((amount) => {
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT,
      abi: AbiObject.abi,
      functionName: "participateTier1",
      args: [BigInt(amount ? amount : 1), merkleProof],
      value: parseEther(TIER_1_PRICE) * BigInt(amount ? amount : 1),
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
    onPurchaseTier1,
    isPending: isPending || isConfirming,
    isConfirming,
    isConfirmed,
  };
};

export default usePurchaseTier1;
