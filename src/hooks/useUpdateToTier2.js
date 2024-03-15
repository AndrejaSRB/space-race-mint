import { useCallback } from 'react';
import AbiObject from "../../abi";
import { getMerkleProof } from "@/web3/merkle/merkle";
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'


const useUpdateToTier2= () => {
  const { address } = useAccount();
  const merkleProof = getMerkleProof(address);

  const { data: hash, isPending,writeContract } = useWriteContract();

  const onUpdateToTier2 = useCallback(() => {
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT,
      abi: AbiObject.abi,
      functionName: "participateTier2",
      args: [BigInt(1), true, merkleProof],
      value: parseEther("0.0825")
    })
  },[])

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
  useWaitForTransactionReceipt({
    hash,
  });

return {onUpdateToTier2, isPending, isConfirming, isConfirmed};

};

export default useUpdateToTier2;
