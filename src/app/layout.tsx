import "./globals.css";

export const metadata = {
  title: "desk mate",
  description: "a good virtual mate to help you organize your to-do items",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <main className="flex w-screen h-screen">{children}</main>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
