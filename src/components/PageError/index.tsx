import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';

import spaceSizes from '@theme/spaceSizes';

import { PageErrorProps } from './PageError.types';
import i18n from '@helpers/i18n';

export const PageError = ({
  errorCode = '',
}: React.PropsWithChildren<PageErrorProps>) => {
  const { t } = useTranslation();
  const router = useRouter();
  const error = i18n.exists(`error.${errorCode}`)
    ? t(`error.${errorCode}`)
    : t(`error.ERROR_DEFAULT`);

  return (
    <Box
      mx={{ xs: spaceSizes.md, sm: spaceSizes.md, md: spaceSizes.mdPlus }}
      my={{ xs: spaceSizes.md, sm: spaceSizes.md, md: spaceSizes.mdPlus }}
    >
      <Stack alignItems="center" spacing={spaceSizes.md}>
        <Stack alignItems="center" direction="row" spacing={spaceSizes.sm}>
          <ErrorOutlineIcon />
          <Typography fontWeight="bold" variant="h5">
            {error}
          </Typography>
        </Stack>
        <Box>
          <Button variant="contained" onClick={() => router.reload()}>
            {t('errors.ERROR_BUTTON')}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
