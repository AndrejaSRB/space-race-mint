import { useCallback, useEffect } from "react";
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
import { TIER_1_PRICE } from "@/constants";
import { useToast } from "@chakra-ui/react";

const usePurchaseTier1 = () => {
  const toast = useToast();
  const { address } = useAccount();
  const merkleProof = getMerkleProof(address);
  const { refetch } = useGetTier1Supply();

  const {
    data: hash,
    isPending,
    writeContract,
    error,
    status,
  } = useWriteContract();

  const onPurchaseTier1 = useCallback((amount, bigInt) => {
    const value = parseEther(TIER_1_PRICE) * BigInt(amount ? amount : 1);
    if (value > bigInt) {
      toast({
        title: "Error",
        description: "You don't have enough funds.",
        position: "top-right",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT,
      abi: AbiObject.abi,
      functionName: "participateTier1",
      args: [BigInt(amount ? amount : 1), merkleProof],
      value: value,
    });
  }, []);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      onSuccess: async () => {
        await refetch();
      },
    });

  useEffect(() => {
    if (status === "success") {
      toast({
        title: "Success",
        description: "Tier 1 purchased successfully",
        position: "top-right",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [status]);

  return {
    onPurchaseTier1,
    isPending: isPending || isConfirming,
    isConfirming,
    isConfirmed,
  };
};

export default usePurchaseTier1;
