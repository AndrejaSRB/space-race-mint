/**
 * Switch the first letter of a string in uppercase.
 */
export default function ucfirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
