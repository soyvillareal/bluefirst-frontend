import { Box, Dialog, DialogTitle, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import ResizeImage from '@components/ResizeImage';
import env from '@helpers/env';

import { componentDialogMessageProps } from './DialogMessage.type';

const DialogMessage = ({
  title,
  subtitle,
  open = false,
}: componentDialogMessageProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open}>
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        pb={20}
        px={40}
      >
        <DialogTitle mb={5}>
          <ResizeImage height={25} width={200} src={env.LOGO} />
        </DialogTitle>
        <Stack
          alignItems="center"
          direction="column"
          gap={8}
          justifyContent="space-between"
          textAlign="center"
        >
          <Typography variant="h6">{t(title)}</Typography>
          <Typography variant="h6">{t(subtitle)}</Typography>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default DialogMessage;
