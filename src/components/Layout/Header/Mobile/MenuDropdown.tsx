import { Box, Button, Divider, Drawer, Stack } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import BackButton from '@components/BackButton';
import spaceSizes from '@theme/spaceSizes';

import MenuDropdownList from './MenuDropdownList';
import { LayoutMenuDropdownProps } from './HeaderMobile.types';

const MenuDropdown = ({
  isDropdownOpen,
  setIsDropdownOpen,
}: LayoutMenuDropdownProps) => {
  const [open, setOpen] = useState(false);
  const handleDrawerClick = () => {
    setOpen(false);
    setIsDropdownOpen(false);
  };

  const handleOpen = () => setOpen(true);

  return (
    <>
      <Button
        sx={{
          backgroundColor: 'background.default',
          borderRadius: 8,
        }}
        onClick={handleOpen}
      >
        {isDropdownOpen ? <CloseIcon /> : <MenuIcon />}
      </Button>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box p={spaceSizes.lg}>
          <Stack
            divider={<Divider sx={{ width: '100%', minWidth: 200 }} />}
            spacing={spaceSizes.sm}
          >
            <BackButton onClick={() => setOpen(false)} />
            <MenuDropdownList setIsDropdownOpen={handleDrawerClick} />
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default MenuDropdown;
