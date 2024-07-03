import Link from "next/link";

import env from "@env";
import HeaderLogo from "./HeaderLogo";

export default function Header() {
  return (
    <header className="wrapper sticky top-0 z-50 flex h-20 items-center justify-between">
      <HeaderLogo />

      <nav>
        <ul className="flex items-center gap-x-10 text-white">
          <HeaderItem href="#ForBusiness">For Business</HeaderItem>
          <HeaderItem href="/careers">Careers</HeaderItem>
          <HeaderItem href="/blog">Blog</HeaderItem>
          <HeaderItem href="/contact">Contact Us</HeaderItem>
          <HeaderItem href="/about">About</HeaderItem>

          <li>
            <a
              href={env.NEXT_PUBLIC_APPSTORE_LINK}
              className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-black"
            >
              Download App
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function HeaderItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="opacity-40 transition-opacity hover:opacity-100"
      >
        {children}
      </Link>
    </li>
  );
}
