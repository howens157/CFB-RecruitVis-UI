'use client';
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import NavBar from "@/components/NavBar";
import { useAppSelector } from "@/lib/hooks";
import { hexToRgb, rgbToString } from "@/utils/colorUtils";

export default function OtherProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const backgroundColor = useAppSelector((state) => state.color.backgroundColor);

  return (
    <body style={{ backgroundColor: rgbToString(hexToRgb(backgroundColor)), margin: "0" }}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <NavBar />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </body>
  );
}
