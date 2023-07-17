import { SxProps } from '@mui/material';

export interface IUserAvatarProps {
  sx?: SxProps;
  height?: number | string;
  width?: number | string;
  onClick?: (event: React.MouseEvent<Element>) => void;
}
