import { useMediaQuery } from '@mui/material';

export const useMediumDesktopQuery = () => {
  return useMediaQuery(`(min-width: ${1380}px) and (max-width: ${1800}px)`);
};
