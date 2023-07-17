import { useCallback, useMemo } from "react";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { LayoutMenuItemDesktopProps } from "./HeaderDesktop.types";

const AuthItem = ({
  text,
  to,
  onClickCallback,
  forceActive,
  disabled,
  ...props
}: LayoutMenuItemDesktopProps) => {
  const router = useRouter();

  const isActive = false;

  // const isActive = useMemo(() => {
  //   return location.pathname.split("?")[0] === String(to).split("?")[0];
  // }, [location, to]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (to) {
        router.push(to);
      }
      if (onClickCallback) onClickCallback(event);
    },
    [router, to, onClickCallback]
  );

  return (
    <Button
      component="span"
      disabled={disabled}
      sx={{
        color: forceActive || isActive ? "primary.main" : "secondary.light",
        borderColor: "primary.main",
      }}
      onClick={handleClick}
      {...props}
      variant="outlined"
    >
      <Typography
        fontWeight={forceActive || isActive ? "bold" : "normal"}
        variant="body2"
      >
        {text}
      </Typography>
    </Button>
  );
};

export default AuthItem;
