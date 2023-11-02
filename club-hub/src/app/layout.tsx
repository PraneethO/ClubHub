import "./globals.css";
import type { Metadata } from "next";

import Providers from "./Providers";

export const metadata: Metadata = {
  title: "ClubCart",
  description: "An App For Exporting Club Prices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
