import "./globals.css";
import { Ysabeau } from "next/font/google";

const googleFont = Ysabeau({ subsets: ["latin"] });

export const metadata = {
  title: "Desk Mate",
  description: "A productivity app to be your desktop mate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${googleFont.className} absolute top-0 bottom-0 left-0 right-0 flex`}
      >
        {children}
      </body>
    </html>
  );
}
