import { useMediaQuery, useTheme } from '@mui/material';

function useBigDesktopMediaQuery() {
  // lg large: 1200px
  // Check if endpoint is upper small desktop
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.up('lg'));
}

export default useBigDesktopMediaQuery;
