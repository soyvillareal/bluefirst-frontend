import { useMediaQuery } from '@mui/material';

function useLaptopMediaQuery() {
  // Check if endpoint is a laptop
  return useMediaQuery(
    `(min-width: ${800}px) and (max-width: ${1500}px) and (min-height: ${600}px)`,
  );
}

export default useLaptopMediaQuery;
