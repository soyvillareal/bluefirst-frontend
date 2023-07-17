import { Alert, Box, Stack } from '@mui/material';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTranslation } from 'react-i18next';

import { IAlertCardProps } from './AlertCard.types';
import { AlertSeverity, AlertSeverityColor } from './AlertSeverity';

const AlertCard = ({
  id,
  show,
  content,
  severity = AlertSeverity.ERROR,
  variant = 'standard',
  customContainerStyles = {},
  showPrefix,
}: IAlertCardProps) => {
  const color = AlertSeverityColor[severity];
  const { t } = useTranslation();

  const iconStyling = {
    width: '40px',
    paddingRight: '1rem',
    borderRight: `1px solid ${color}`,
    ...customContainerStyles,
  };

  const iconMapping = {
    [AlertSeverity.ERROR]: <NotificationImportantIcon sx={iconStyling} />,
    [AlertSeverity.WARNING]: <NotificationImportantIcon sx={iconStyling} />,
    [AlertSeverity.INFO]: <NotificationsIcon sx={iconStyling} />,
    [AlertSeverity.SUCCESS]: <NotificationsIcon sx={iconStyling} />,
  };

  return (
    <Stack data-testid={id}>
      {show && (
        <Box>
          <Alert
            icon={<NotificationsIcon sx={iconStyling} />}
            iconMapping={iconMapping}
            severity={severity}
            sx={{ backgroundColor: 'transparent' }}
            variant={variant}
          >
            {showPrefix && t('pages.product.productSection.charityPrefix')}
            {content}
          </Alert>
        </Box>
      )}
    </Stack>
  );
};

export default AlertCard;
