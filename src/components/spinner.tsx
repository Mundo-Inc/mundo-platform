export default function Spinner({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <span
      className="animate-spin rounded-full"
      style={{
        width: size || 32,
        height: size || 32,
        borderColor: color || "#ffffff",
        borderTopColor: "transparent",
        borderWidth: size ? size / 8 : 2,
      }}
    />
  );
}
