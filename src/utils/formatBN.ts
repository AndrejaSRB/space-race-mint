import { formatUnits } from 'viem';

export default function formatBN(value: bigint | undefined | null, e = 18, decimals = 3): string | undefined {
  if (value === undefined || value === null) return;

  return formatUnits(value, e)
    .replace(new RegExp(`^(-?\\d+\\.\\d{0,${decimals}}).*`), '$1')
    .replace(/(\.\d*[\.1-9])0+$/, '$1') // remove trailing zeros
    .replace(/\.$/, ''); // remove the trailing dot if there are no decimals (eg. "2544.")
}
