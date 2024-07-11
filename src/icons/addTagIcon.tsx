import { type ComponentProps } from "react";

export default function AddTagIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g opacity="0.5">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.8399 18.1931C19.8399 21.4891 15.3199 21.8701 11.9209 21.8701L11.6776 21.8699C9.51208 21.8646 3.99988 21.7279 3.99988 18.1731C3.99988 14.9444 8.33823 14.5129 11.7114 14.4966L12.1641 14.4963C14.3295 14.5016 19.8399 14.6383 19.8399 18.1931ZM11.9209 15.9961C7.65988 15.9961 5.49988 16.7281 5.49988 18.1731C5.49988 19.6311 7.65988 20.3701 11.9209 20.3701C16.1809 20.3701 18.3399 19.6381 18.3399 18.1931C18.3399 16.7351 16.1809 15.9961 11.9209 15.9961ZM11.9209 1.99969C14.8489 1.99969 17.2299 4.38169 17.2299 7.30969C17.2299 10.2377 14.8489 12.6187 11.9209 12.6187H11.8889C8.96688 12.6097 6.59988 10.2267 6.60985 7.30669C6.60985 4.3817 8.99188 1.99969 11.9209 1.99969ZM11.9209 3.42769C9.77988 3.42769 8.03786 5.16869 8.03786 7.30969C8.03088 9.4437 9.75988 11.1837 11.8919 11.1917L11.9209 11.9057V11.1917C14.0609 11.1917 15.8019 9.44969 15.8019 7.30969C15.8019 5.16869 14.0609 3.42769 11.9209 3.42769Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
