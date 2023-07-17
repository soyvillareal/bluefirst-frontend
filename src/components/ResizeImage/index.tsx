import { Stack } from '@mui/material';

import Link from '@components/Link';
import StyledImage from '@components/StyledImage';
import env from '@helpers/env';

import { ComponentResizeImageProps } from './ResizeImage.types';

const ResizeImage = ({
  height,
  width,
  src,
  alt,
  to = '',
}: ComponentResizeImageProps) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%', height: '100%' }}
    >
      <Link
        sx={{ display: 'flex' }}
        href={to}
      >
        <StyledImage
          $height={height}
          $width={width}
          src={`${
            !src.includes('http') ? `${env.BASE_CND_URL}/` : ''
          }${src}`}
          alt={alt}
        />
      </Link>
    </Stack>
  );
};

export default ResizeImage;
