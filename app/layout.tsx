import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { isOk, isOn } from "./_auth/check";
import { kickOff } from "./_auth/kick";
import { liveTok } from "./_auth/live";
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
  const tok = await liveTok();
  await kickOff(isOn(tok));
  return (
    <html lang="ko" className={noto.className}>
      <body>
        <Frame admin={isOk(tok)} authed={isOn(tok)}>
          {children}
        </Frame>
      </body>
    </html>
  );
}
