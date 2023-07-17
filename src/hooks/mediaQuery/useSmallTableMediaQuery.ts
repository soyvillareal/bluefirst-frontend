import { useMediaQuery } from '@mui/material';

function useSmallTableMediaQuery() {
  // Check if endpoint is a small mobile
  return useMediaQuery(`(max-width: ${768}px)`);
}

export default useSmallTableMediaQuery;
