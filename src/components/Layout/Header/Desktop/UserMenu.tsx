import { useState } from 'react';
import { Stack } from '@mui/material';

import UserDropdown from '@components/Layout/UserDropdown/UserDropdown';
import spaceSizes from '@theme/spaceSizes';
import { useMediumDesktopQuery } from '@hooks/mediaQuery/useMediumDesktopQuery';

const UserMenu = () => {
  const [isDropdownUserOpen, setIsDropdownUserOpen] = useState(false);
  const handleUserDropdown = (isOpen: boolean) => {
    setIsDropdownUserOpen(isOpen);
  };
  const isMediumDesktop = useMediumDesktopQuery();

  return (
    <Stack
      data-testid="userMenuHeader"
      direction="row"
      justifyContent="center"
      spacing={isMediumDesktop ? spaceSizes.xs : spaceSizes.md}
    >
      <UserDropdown
        isDropdownOpen={isDropdownUserOpen}
        setIsDropdownOpen={handleUserDropdown}
      />
    </Stack>
  );
};

export default UserMenu;
