"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Divider, Popover, Stack, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import useAppDispatch from "@hooks/redux/useAppDispatch";
import useAppSelector from "@hooks/redux/useAppSelector";
import { removeSession } from "@helpers/features/sessions/sessions.slice";
import spaceSizes from "@theme/spaceSizes";
import MenuDropdownItem from "@components/Layout/Header/Mobile/MenuDropdownItem";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import { selectUserSession } from "@helpers/features/sessions/sessions.selector";
import { isNotNilOrEmpty } from "ramda-adjunct";
import { USER_DROPDOWN_EMAIL_MAX_WIDTH } from "./UserDropdown.constants";
import { routes } from "@helpers/routes";

interface IUserDropdownProps {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isDropdownOpen: boolean) => void;
}

const UserDropdown = ({
  isDropdownOpen,
  setIsDropdownOpen,
}: IUserDropdownProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserSession);

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? "menu-popover" : undefined;

  const handleClick = (event: React.MouseEvent<Element>) => {
    setAnchorEl(event.currentTarget);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsDropdownOpen(false);
  };

  const useLogOutHandler = () => {
    setIsDropdownOpen(false);
    dispatch(removeSession());
  };

  return (
    <Stack justifyContent="center">
      <UserAvatar onClick={handleClick} />
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        id={id}
        open={isDropdownOpen}
        onClose={handleClose}
      >
        <Box p={spaceSizes.md}>
          <Stack
            divider={<Divider sx={{ width: "100%" }} />}
            spacing={spaceSizes.md}
          >
            {user && (
              <Stack
                flexDirection="column"
                justifyContent="center"
                spacing={spaceSizes.sm}
              >
                <Stack flexDirection="column" spacing={spaceSizes.xs}>
                  <Typography>
                    {isNotNilOrEmpty(user.first_name)
                      ? user.first_name
                      : user.username}
                  </Typography>
                  <Typography
                    fontSize="small"
                    maxWidth={USER_DROPDOWN_EMAIL_MAX_WIDTH}
                    sx={{ opacity: 0.8 }}
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    noWrap
                  >
                    {isNotNilOrEmpty(user.email) && user.email}
                  </Typography>
                </Stack>
              </Stack>
            )}
            {user && (
              <Stack spacing={spaceSizes.sm}>
                <MenuDropdownItem
                  data-testid="userMenuLogout"
                  icon={<LogoutIcon sx={{ color: "white" }} />}
                  setIsDropdownOpen={useLogOutHandler}
                  text={t("component.logout")}
                  to={routes.login}
                />
              </Stack>
            )}
          </Stack>
        </Box>
      </Popover>
    </Stack>
  );
};

export default UserDropdown;
