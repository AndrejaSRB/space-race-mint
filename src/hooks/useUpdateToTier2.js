import { useCallback } from 'react';
import AbiObject from "../../abi";
import { getMerkleProof } from "@/web3/merkle/merkle";
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from "ethers";

const useUpdateToTier2 = () => {
  const { address } = useAccount();
  const merkleProof = getMerkleProof(address);

  const { data: hash, isPending,writeContract, error } = useWriteContract();

  const onUpdateToTier2 = useCallback(() => {
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT,
      abi: AbiObject.abi,
      functionName: "participateTier2",
      args: [BigInt(1), true, merkleProof],
      value: parseEther("0.0825")
    })
  },[]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
  useWaitForTransactionReceipt({
    hash,
  });

return {onUpdateToTier2, isPending: isPending || isConfirming, isConfirming, isConfirmed};

};

export default useUpdateToTier2;
