import { useMediaQuery, useTheme } from '@mui/material';

function useTabletMediaQuery() {
  // md, medium: 900px
  // Check if endpoint is less than md
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down('md'));
}

export default useTabletMediaQuery;
