import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex w-screen h-screen">{children}</main>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
