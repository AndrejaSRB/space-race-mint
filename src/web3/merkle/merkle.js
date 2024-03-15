import { MerkleTree } from 'merkletreejs';
import { keccak256 } from 'ethers';

const addresses = [
  '0xb2a8e5e52933cfaf58ebfdc20532ea6c51299b25',
  '0x9e18fc55ea4712ca190824a7e0cdccf2db53365a',
  '0x81d469e5752beea171145f82b4461cb604d98d73',
  '0xf749201673db6e55e892c909633badf7a6f52500',
  '0xc2c82bd7b8d9f8fd34727c594c0ff055410c5ed8',
  '0xaf0e00dc663448f4b869c6dfc4177bb75c2db030',
  '0xf122f6971a0ce6e9190bc1186a111cf9d11aa182',
  '0x77caaebaddcfe4325c986a758630f6a8f4ec92e0',
  '0xd4f09079ba06c6fb474247a0dd24bf31f7359684',
  '0x7845497a6b0c3407ed8398fe9b09a88854764e82',
  '0x066c5595a93d4ef732c9c3af3acb9d2383182130',
  '0xefa4c6a05f6b149ca1e8aa0d3842be33dd1e7d70',
  '0x40125061cd8e8c349e069f69d1336540d9fb6f8d',
  '0xf51c8ef33c1aef793a13a1df809b1df3e7fc5258',
  '0x2be62628059836b51a193a3f68aa5a03065b2c69',
  '0x7002f6c1d9eccb50f3e9b5235b4493bd2ee8c27c',
  '0x5823fcfaf6104b02981ae4da01ada5d921a3c57c',
  '0x3de1aa6fe823a4625351ec45d71301c8895434ac',
  '0x58B3a28C3dF26407Fd45f833b101072FC492f23c',
  '0x4B7C560a9B3FB2F4A4f3F0F857af7524fc8Bc78a',
];

const tree = new MerkleTree(
  addresses.map(keccak256),
  keccak256,
  { sortPairs: true },
);

export function getMerkleRoot() {
  return tree.getRoot().toString('hex');
}

export function getMerkleProof(address) {
  const hashedAddress = keccak256(address);
  return tree.getHexProof(hashedAddress);
}
