import { Box, Container, Stack, Typography } from '@mui/material';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import Spinner from '@components/Spinner';
import spaceSizes from '@theme/spaceSizes';

import { PageContainerProps } from './ItemContainer.types';

const ItemContainer = ({
  children,
  loading = false,
  isError = false,
  maxWidth = 'xl',
  skeletonElement,
  sx = {},
}: React.PropsWithChildren<PageContainerProps>) => {
  const { t } = useTranslation();

  return (
    <Box height="100%" sx={sx}>
      <Container
        maxWidth={maxWidth}
        sx={{
          height: '100%',
        }}
      >
        <Stack spacing={spaceSizes.md} height="100%">
          {isError ? (
            skeletonElement ? (
              <Stack position="relative">
                {skeletonElement}
                <Stack
                  sx={{
                    justifyContent: 'center',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'red',
                  }}
                >
                  <Typography color="error.main" textAlign="center">
                    {t(`errors.UNKNOWN_ERROR`)}
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <Typography color="error.main" textAlign="center">
                {t(`errors.UNKNOWN_ERROR`)}
              </Typography>
            )
          ) : loading ? (
            isNotNilOrEmpty(skeletonElement) ? (
              skeletonElement
            ) : (
              <Stack justifyContent="center" alignItems="center">
                <Spinner dark={false} />
              </Stack>
            )
          ) : (
            children
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default ItemContainer;
