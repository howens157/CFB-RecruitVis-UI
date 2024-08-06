import type { Metadata } from "next";
import StoreProvider from "../components/providers/StoreProvider";
import OtherProviders from "../components/providers/InternalLayout";

export const metadata: Metadata = {
  title: "CFB Recruit Vis",
  description: "Visualizing CFB Recruiting Data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <OtherProviders>{children}</OtherProviders>
      </StoreProvider>
    </html>
  );
}
