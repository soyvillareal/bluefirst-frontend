import { useCallback } from "react";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { LayoutMenuItemDesktopProps } from "./HeaderDesktop.types";

const MenuItem = ({
  text,
  to,
  onClickCallback,
  endIcon,
  forceActive,
  disabled,
  ...props
}: LayoutMenuItemDesktopProps) => {
  const router = useRouter();

  const isActive = false;

  // const isActive = useMemo(() => {
  //   return location.pathname.split('?')[0] === String(to).split('?')[0];
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
      endIcon={endIcon}
      sx={{
        color: forceActive || isActive ? "primary.main" : "secondary.light",
        borderColor: "primary.main",
        borderRadius: 0,
        borderBottom: forceActive || isActive ? 2 : 0,
      }}
      onClick={handleClick}
      {...props}
    >
      <Typography
        fontWeight={forceActive || isActive ? "bold" : "normal"}
        letterSpacing={1.2}
        variant="body2"
      >
        {text}
      </Typography>
    </Button>
  );
};

export default MenuItem;
