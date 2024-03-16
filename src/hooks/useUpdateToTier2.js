import { useCallback, useEffect } from "react";
import AbiObject from "../../abi";
import { getMerkleProof } from "@/web3/merkle/merkle";
import {
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "ethers";
import { UPDATE_PRICE } from "@/constants";
import { useToast } from "@chakra-ui/react";
import useAllownace from "./useAllowance";

const useUpdateToTier2 = () => {
  const toast = useToast();
  const { address } = useAccount();
  const { data: allowance } = useAllownace();
  const merkleProof = getMerkleProof(address);

  const {
    data: hash,
    isPending,
    writeContract,
    error,
    status,
  } = useWriteContract();

  const onUpdateToTier2 = useCallback((amount, bigInt) => {
    const value = parseEther(UPDATE_PRICE) * BigInt(amount ? amount : 1);
    const DMTValue = 4000 * amount;
    // ETH error
    if (value > bigInt) {
      toast({
        title: "Error",
        description: "You don't have enough funds.",
        position: "top-right",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else if (allowance < DMTValue) {
      // DMT Error
      toast({
        title: "Error",
        description: "You need to approve more DMT for select amount.",
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
      args: [BigInt(amount ? amount : 1), true, merkleProof],
      value: parseEther(UPDATE_PRICE) * BigInt(amount ? amount : 1),
    });
  }, []);

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: error2,
  } = useWaitForTransactionReceipt({
    hash,
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
    onUpdateToTier2,
    isPending: isPending || isConfirming,
    isConfirming,
    isConfirmed,
  };
};

export default useUpdateToTier2;
