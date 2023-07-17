import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Divider,
  List,
  Stack,
} from "@mui/material";

import LangMenu from "@components/LangMenu";
import ItemContainer from "@components/Layout/ItemContainer";
import spaceSizes from "@theme/spaceSizes";

import MenuDropdownItem from "./MenuDropdownItem";

export interface LayoutMenuDropdownListProps {
  setIsDropdownOpen: (isOpen: boolean) => void;
}

const MenuDropdownList = ({
  setIsDropdownOpen,
}: LayoutMenuDropdownListProps) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const isActiveCallback = false;

  // Dont have time to fix this! :(
    
  // const isActiveCallback = useCallback(
  //   (slug: string) => {
  //     return location.pathname.split('/')[2] === slug;
  //   },
  //   [location],
  // );

  return (
    <Stack spacing={spaceSizes.sm}>
      <ItemContainer
        loading={false}
        isError={false}
      >
        <Stack spacing={spaceSizes.sm}>
          <List
            component="nav"
            sx={{
              width: "100%",
            }}
            aria-labelledby="nested-list-subheader"
          >
            <MenuDropdownItem
              data-testid="homeButtonHeader"
              setIsDropdownOpen={setIsDropdownOpen}
              text={t(`component.users`)}
              to={`/Users`}
              sx={{
                px: spaceSizes.sm,
              }}
            />
            <MenuDropdownItem
              data-testid="homeButtonHeader"
              setIsDropdownOpen={setIsDropdownOpen}
              text={t(`component.home`)}
              to={'/home'}
              sx={{
                px: spaceSizes.sm,
              }}
            />
            <MenuDropdownItem
              data-testid="homeButtonHeader"
              setIsDropdownOpen={setIsDropdownOpen}
              text={t(`component.sessions`)}
              to={'/sessions'}
              sx={{
                px: spaceSizes.sm,
              }}
            />
          </List>
        </Stack>
      </ItemContainer>
      <Divider sx={{ width: "100%" }} />
      <LangMenu />
    </Stack>
  );
};

export default MenuDropdownList;
