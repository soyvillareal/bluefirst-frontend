import { useMediaQuery, useTheme } from '@mui/material';

function useMobileMediaQuery() {
  // sm, small: 600px
  // Check if endpoint is less than md
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down('sm'));
}

export default useMobileMediaQuery;
