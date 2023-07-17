import { useState } from "react";
import { Stack } from "@mui/material";

import ResizeImage from "@components/ResizeImage";
import spaceSizes from "@theme/spaceSizes";
import env from "@helpers/env";
import { logoHeight, logoWidth } from "@helpers/constants";
import useSmallMobileMediaQuery from "@hooks/mediaQuery/useSmallMobileMediaQuery";

import MenuDropdown from "./MenuDropdown";

const HeaderMobile = () => {
  const isSmallMobile = useSmallMobileMediaQuery();
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState<boolean>(false);

  const handleMenuDropdown = (isOpen: boolean) => {
    setIsDropdownMenuOpen(isOpen);
  };

  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent={"space-between"}
      spacing={spaceSizes.sm}
    >
      <MenuDropdown
        isDropdownOpen={isDropdownMenuOpen}
        isLoggedUser={false}
        setIsDropdownOpen={handleMenuDropdown}
      />
      <ResizeImage src={env.LOGO} width={logoWidth} height={logoHeight} />
    </Stack>
  );
};

export default HeaderMobile;
