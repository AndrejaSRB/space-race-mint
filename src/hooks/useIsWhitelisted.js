import { useReadContract, useAccount } from 'wagmi'
import { getMerkleProof } from "@/web3/merkle/merkle";
import AbiObject from "../../abi";

const useIsWhitelisted = () => {
  const { address } = useAccount();

  const merkleProof = getMerkleProof(address);



  const {data: isWhitelisted} = useReadContract({
    abi: AbiObject.abi,
    address: process.env.NEXT_PUBLIC_CONTRACT,
    functionName: "isWhitelisted",
    args: [merkleProof, address]
  })


  return isWhitelisted;

}

export default useIsWhitelisted;
