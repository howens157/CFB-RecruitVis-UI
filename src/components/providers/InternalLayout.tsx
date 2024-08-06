"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import NavBar from "@/components/NavBar";
import { useAppSelector } from "@/lib/hooks";
import About from "@/components/About";

export default function InternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const backgroundColor = useAppSelector(
    (state) => state.color.backgroundColor
  );

  return (
    <body
      style={{
        backgroundColor: backgroundColor,
        margin: "0",
      }}
    >
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <NavBar />
          {children}
          <About/>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </body>
  );
}
