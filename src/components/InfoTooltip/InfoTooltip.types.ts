import { SxProps } from '@mui/material';

export interface IInfoTooltipProps {
  children?: JSX.Element;
  content: string;
  sx?: SxProps;
  placement?: 'bottom' | 'left' | 'right' | 'top';
}
