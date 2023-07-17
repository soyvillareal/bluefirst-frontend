import { useMediaQuery } from '@mui/material';

export default function useSmallLaptopMediaQuery() {
  return useMediaQuery(`(min-width: ${600}px) and (max-width: ${800}px)`);
}
