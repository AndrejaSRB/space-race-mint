export default function ellipsis(hex: unknown, length = 4) {
  if (typeof hex !== "string") return;

  return hex.replace(
    new RegExp(`^(0x.{${length}}).*(.{${length}})`),
    "$1...$2"
  );
}
