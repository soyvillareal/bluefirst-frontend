import { ReactElement } from 'react';

import { AlertSeverity } from './AlertSeverity';

export interface IAlertCardProps {
  id: string;
  show: boolean;
  content: ReactElement | string;
  severity?: AlertSeverity;
  variant?: 'standard' | 'filled' | 'outlined';
  customContainerStyles?: React.CSSProperties;
  showPrefix?: boolean;
}
