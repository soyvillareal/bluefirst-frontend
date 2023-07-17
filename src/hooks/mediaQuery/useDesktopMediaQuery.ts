import { useMediaQuery, useTheme } from '@mui/material';

function useDesktopMediaQuery() {
  // md, medium: 900px
  // Check if endpoint is upper than md
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.up('md'));
}

export default useDesktopMediaQuery;
