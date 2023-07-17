import { styled } from '@mui/material/styles';

import { LogoProps } from './StyledImage.types';

const StyledImage = styled('img', {
  shouldForwardProp: (prop) => prop !== '$width' && prop !== '$height',
})<LogoProps>(
  ({ $width, $height }) => `
width: ${$width}px;
height: ${$height}px;
cursor: pointer;
`,
);

export default StyledImage;
