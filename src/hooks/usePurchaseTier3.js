import { useCallback } from "react";
import AbiObject from "../../abi";
import { getMerkleProof } from "@/web3/merkle/merkle";
import {
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
  usePrepareContractWrite,
} from "wagmi";
import { parseEther } from "ethers";
import useGetTier3Supply from "./useGetTier3Supply";
import { TIER_3_PRICE } from '@/constants';

const usePurchaseTier3 = () => {
  const { address } = useAccount();
  const merkleProof = getMerkleProof(address);
  const { refetch } = useGetTier3Supply();

  const { data: hash, isPending, writeContract, error } = useWriteContract();

  const onPurchaseTier3 = useCallback((amount) => {
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT,
      abi: AbiObject.abi,
      functionName: "participateTier3",
      args: [BigInt(amount ? amount : 1), merkleProof],
      value: parseEther(TIER_3_PRICE) * BigInt(amount ? amount : 1),
    });
  }, []);

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: error2,
  } = useWaitForTransactionReceipt({
    hash,
    onSuccess: async () => {
      await refetch();
    },
  });

  return {
    onPurchaseTier3,
    isPending: isPending || isConfirming,
    isConfirming,
    isConfirmed,
  };
};

export default usePurchaseTier3;
