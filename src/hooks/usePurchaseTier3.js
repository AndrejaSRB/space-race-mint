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
import { TIER_3_PRICE } from "@/constants";
import { useToast } from "@chakra-ui/react";

const usePurchaseTier3 = () => {
  const toast = useToast();
  const { address } = useAccount();
  const merkleProof = getMerkleProof(address);
  const { refetch } = useGetTier3Supply();

  const { data: hash, isPending, writeContract, error } = useWriteContract({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Tier 1 purchased successfully",
        position: "top-right",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onPurchaseTier3 = useCallback((amount, bigInt) => {
    const value = parseEther(TIER_3_PRICE) * BigInt(amount ? amount : 1);

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
      functionName: "participateTier3",
      args: [BigInt(amount ? amount : 1), merkleProof],
      value: value,
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
