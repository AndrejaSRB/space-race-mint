import { useCallback } from 'react';
import AbiObject from "../../abi2";
import { getMerkleProof } from "@/web3/merkle/merkle";
import { useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from "ethers";


const useApprove= () => {
  const { address } = useAccount();
  const merkleProof = getMerkleProof(address);

  const { data: hash, isPending,writeContract } = useWriteContract();
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT;

  const onApproval = useCallback(() => {
    writeContract({
      address: process.env.NEXT_PUBLIC_ERC20_ADDRESS,
      abi: AbiObject.abi,
      functionName: "approve",
      args: [contractAddress, "1000000000000000000"],
    })
  },[contractAddress])

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
  useWaitForTransactionReceipt({
    hash,
  });


return {onApproval, isPending: isPending || isConfirming, isConfirming, isConfirmed};

};

export default useApprove;
