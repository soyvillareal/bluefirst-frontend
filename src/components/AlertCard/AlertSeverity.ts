import palette from '@theme/palette';

// eslint-disable-next-line no-shadow
export enum AlertSeverity {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}

export const AlertSeverityColor = {
  [AlertSeverity.ERROR]: palette.error.main,
  [AlertSeverity.WARNING]: palette.warning.main,
  [AlertSeverity.INFO]: palette.info.main,
  [AlertSeverity.SUCCESS]: palette.success.main,
};

export const SEVERITY_ORDER = [
  AlertSeverity.ERROR,
  AlertSeverity.WARNING,
  AlertSeverity.INFO,
  AlertSeverity.SUCCESS,
];
