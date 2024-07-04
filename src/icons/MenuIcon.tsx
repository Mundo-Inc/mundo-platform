import { ComponentProps } from "react";

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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.30054 10.9504H10.3005V2.95044H2.30054V10.9504Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.30054 21.9495H10.3005V13.9495H2.30054V21.9495Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3005 21.9495H21.3005V13.9495H13.3005V21.9495Z"
        fill="currentColor"
      />
      <path
        opacity={active ? "0.4" : "0.8"}
        fillRule="evenodd"
        clipRule="evenodd"
        d={
          active
            ? "M22.1996 4.12154L14.4716 2.05054L12.4016 9.77854L20.1286 11.8485L22.1996 4.12154Z"
            : "M22.1996 10.9504H21.3005V2.9495H13.30054V10.9504Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}
