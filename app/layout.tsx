import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { isAdmin } from "./_auth/role";
import { Frame } from "./_shell/frame";
import "./globals.css";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ONT-GW",
  description: "Kuehne+Nagel 그룹웨어",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const admin = await isAdmin();
  return (
    <html lang="ko" className={noto.className}>
      <body>
        <Frame admin={admin}>{children}</Frame>
      </body>
    </html>
  );
}
