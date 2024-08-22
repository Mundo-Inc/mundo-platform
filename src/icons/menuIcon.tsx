import { type ComponentProps } from "react";

export default function MenuIcon({
  active,
  ...props
}: ComponentProps<"svg"> & {
  active: boolean;
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {active && (
        <>
          <rect width="16" height="3" x="4" y="10.5" fill="coral" rx={2} />
          <rect width="3" height="16" x="10.5" y="4" fill="coral" rx={2} />
        </>
      )}
      <rect width={8} height={8} x={2.5} y={2.5} fill="currentColor" rx={1.5} />
      <rect
        width={8}
        height={8}
        x={2.5}
        y={13.5}
        fill="currentColor"
        rx={1.5}
      />
      <rect
        width={8}
        height={8}
        x={13.5}
        y={2.5}
        fill="currentColor"
        rx={1.5}
      />
      <rect
        width={8}
        height={8}
        x={13.5}
        y={13.5}
        fill="currentColor"
        rx={1.5}
      />

      {/* <rect
        width={8}
        height={8}
        x={13.5}
        y={13.5}
        fill="currentColor"
        opacity={active ? "1" : "0.8"}
      /> */}
      {/* <path
        opacity={active ? "1" : "0.8"}
        fillRule="evenodd"
        clipRule="evenodd"
        d={
          false
            ? "M22.1996 4.12154L14.4716 2.05054L12.4016 9.77854L20.1286 11.8485L22.1996 4.12154Z"
            : "M22.1996 10.9504H21.3005V2.9495H13.30054V10.9504Z"
        }
        fill="currentColor"
      /> */}
    </svg>
  );
}
