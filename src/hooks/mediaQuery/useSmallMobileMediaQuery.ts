import { useMediaQuery } from '@mui/material';

function useSmallMobileMediaQuery() {
  // Check if endpoint is a small mobile
  return useMediaQuery(`(max-width: ${420}px)`);
}

export default useSmallMobileMediaQuery;
