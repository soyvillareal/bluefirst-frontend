import { Breakpoint, SxProps } from '@mui/material/styles';
import { ReactElement } from 'react';

export interface PageContainerProps {
  id: string;
  title?: string;
  loading?: boolean;
  errorCode?: string;
  backButton?: boolean;
  onBackButtonClick?: () => void | undefined;
  maxWidth?: Breakpoint;
  skeletonElement?: ReactElement;
  sx?: SxProps;
  rightChild?: ReactElement;
}
