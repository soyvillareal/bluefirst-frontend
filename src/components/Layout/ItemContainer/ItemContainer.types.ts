import { Breakpoint, SxProps } from '@mui/material/styles';
import { ReactElement } from 'react';

export interface PageContainerProps {
  children?: ReactElement;
  loading?: boolean;
  isError?: boolean;
  maxWidth?: Breakpoint;
  skeletonElement?: ReactElement;
  sx?: SxProps;
}
