"use client";

import { PropsWithChildren } from "react";
import { AppBar, Stack } from "@mui/material";
import Header from "@components/Header";
import useSession from "@hooks/custom/useSession";

const Layout = ({ children }: PropsWithChildren) => {
  useSession();

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden auto",
        zIndex: 1,
      }}
    >
      <AppBar data-testid="header" position="relative">
        <Header data-testid="header" />
      </AppBar>
      {children}
    </Stack>
  );
};

export default Layout;
