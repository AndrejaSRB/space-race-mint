import { useCallback, useEffect } from "react";
import AbiObject from "../../abi";
import { getMerkleProof } from "@/web3/merkle/merkle";
import {
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "ethers";
import useGetTier2Supply from "./useGetTier2Supply";
import { TIER_2_PRICE } from "@/constants";
import { useToast } from "@chakra-ui/react";

const usePurchaseTier2 = () => {
  const toast = useToast();
  const { address } = useAccount();
  const merkleProof = getMerkleProof(address);
  const { refetch } = useGetTier2Supply();

  const {
    data: hash,
    isPending,
    writeContract,
    status
  } = useWriteContract();

  const onPurchaseTier2 = useCallback((amount, bigInt) => {
    const value = parseEther(TIER_2_PRICE) * BigInt(amount ? amount : 1);
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
      functionName: "participateTier2",
      args: [BigInt(amount ? amount : 1), false, merkleProof],
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
    onPurchaseTier2,
    isPending: isPending || isConfirming,
    isConfirming,
    isConfirmed,
  };
};

export default usePurchaseTier2;
