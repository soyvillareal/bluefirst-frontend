import { useMemo } from "react";
import { ListItemButton, ListItemText } from "@mui/material";

import { LayoutMenuItemMobileProps } from "./HeaderMobile.types";
import Link from "next/link";

const MenuDropdownItem = ({
  text,
  to,
  forceActive,
  setIsDropdownOpen,
  sx = {},
  ...props
}: LayoutMenuItemMobileProps) => {
  const isActive = false;

  // const isActive = useMemo(() => {
  //   return location.pathname.split('?')[0] === String(to).split('?')[0];
  // }, [location, to]);

  return (
    <Link href={to}>
      <ListItemButton
        sx={{
          ...sx,
          justifyContent: "flex-start",
          py: 12,
        }}
        onClick={() => setIsDropdownOpen(false)}
        {...props}
      >
        <ListItemText
          primaryTypographyProps={{
            variant: "body2",
            textTransform: "uppercase",
            fontWeight: forceActive || isActive ? "bold" : "normal",
            letterSpacing: 1,
          }}
          primary={text}
        />
      </ListItemButton>
    </Link>
  );
};

export default MenuDropdownItem;
