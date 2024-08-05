import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Box, ThemeProvider, css } from "@mui/material";
import theme from "@/theme";
import NavBar from "@/components/NavBar";
import StoreProvider from "./StoreProvider";
import OtherProviders from "./OtherProviders";

export const metadata: Metadata = {
  title: "CFB RecruitVis",
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
        <OtherProviders>
          {children}
        </OtherProviders>
      </StoreProvider>
    </html>
  );
}
