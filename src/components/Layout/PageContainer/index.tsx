"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import { isNotNilOrEmpty } from "ramda-adjunct";

import BackButton from "@components/BackButton";
import Spinner from "@components/Spinner";
import { PageError } from "@components/PageError";
import spaceSizes from "@theme/spaceSizes";

import { PageContainerProps } from "./PageContainer.types";

const PageContainer = ({
  id,
  title,
  children,
  loading = false,
  errorCode = "",
  backButton = false,
  onBackButtonClick,
  maxWidth = "xl",
  skeletonElement,
  sx = {},
  rightChild,
}: React.PropsWithChildren<PageContainerProps>) => {

  return (
    <Box
      sx={{
        mx: { xs: spaceSizes.md, sm: spaceSizes.md, md: spaceSizes.lg },
        my: { xs: spaceSizes.md, sm: spaceSizes.md, md: spaceSizes.md },
        ...sx,
      }}
    >
      <Container maxWidth={maxWidth}>
        <Stack spacing={spaceSizes.mdPlus}>
          <Stack data-testid={id}>
            {backButton && (
              <Stack direction="row">
                <BackButton onClick={onBackButtonClick} />
              </Stack>
            )}
            {!loading && isNotNilOrEmpty(title) && (
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
              >
                <Typography fontWeight="bold" variant="h5">
                  {title}
                </Typography>
                {rightChild}
              </Stack>
            )}
          </Stack>
          <Stack alignItems="center">
            {isNotNilOrEmpty(errorCode) ? (
              <PageError errorCode={errorCode} />
            ) : loading ? (
              isNotNilOrEmpty(skeletonElement) ? (
                skeletonElement
              ) : (
                <Spinner dark={false} />
              )
            ) : (
              children
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default PageContainer;
