import { useReadContract, useAccount } from "wagmi";
import { getMerkleProof } from "@/web3/merkle/merkle";
import AbiObject from "../../abi2";

const useAllownace = () => {
  const { address } = useAccount();

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT;

  console.log('test', {
    abi: AbiObject.abi,
    address: process.env.NEXT_PUBLIC_ERC20_ADDRESS,
    functionName: "allownace",
    args: [address, contractAddress],
  })


  const { data, refetch, loading } = useReadContract({
    abi: AbiObject.abi,
    address: process.env.NEXT_PUBLIC_ERC20_ADDRESS,
    functionName: "allownace",
    args: [address, contractAddress],
  });

  console.log('data', data);

  return { data, refetch, loading };
};

export default useAllownace;
