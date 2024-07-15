import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

import AuthProvider from "@/contexts/AuthContext";
import ReactQueryProvider from "@/contexts/ReactQueryProvider";
import env from "@env";

export const viewport: Viewport = {
  themeColor: "#1B0227",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://getmundo.ai"),
  title: "Mundo | See Who's Eating Without You!",
  description:
    "Download the latest version of Mundo application to get access to thousands of dining places reviews and check where your friend's most favorite places.",
  itunes: {
    appId: env.NEXT_PUBLIC_APPLE_APP_ID,
  },
  openGraph: {
    title: "Mundo | See Who's Eating Without You!",
    description:
      "Download the latest version of Mundo application to get access to thousands of dining places reviews and check where your friend's most favorite places.",
    images: [
      {
        url: "/images/OG-Image.jpg",
        width: 1200,
        height: 630,
        alt: "Mundo | See Who's Eating Without You!!",
      },
    ],
    type: "website",
    siteName: "Mundo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KZWFLS86"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>
        <Toaster position="top-center" richColors />
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
