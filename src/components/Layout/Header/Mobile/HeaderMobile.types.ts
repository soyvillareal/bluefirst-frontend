import { ReactNode } from 'react';
import { SxProps } from '@mui/material/styles';

export interface LayoutMenuItemMobileProps {
  text: string | ReactNode;
  to: string;
  forceActive?: boolean;
  icon?: ReactNode;
  setIsDropdownOpen: (isOpen: boolean) => void;
  sx?: SxProps;
}

export interface LayoutMenuDropdownProps {
  isLoggedUser: boolean;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
}
