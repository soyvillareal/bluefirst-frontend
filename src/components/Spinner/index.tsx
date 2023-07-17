import { CircularProgress } from '@mui/material';

import { SpinnerProps } from './Spinner.types';

const Spinner = ({ dark = false, ...props }: SpinnerProps) => (
  <CircularProgress {...props} color={dark ? 'secondary' : 'primary'} />
);

export default Spinner;
