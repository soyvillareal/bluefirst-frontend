import { Stack, TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { isNotNilOrEmpty } from 'ramda-adjunct';

import spaceSizes from '@theme/spaceSizes';

import { InputProps } from './Input.types';

// This input was thinked to be used with React Hook forms
// Must be used with Form Provider or our Form Component
const Input = ({
  label = '',
  placeholder,
  errorMessage,
  id,
  type = 'text',
  required = true,
  labelAlign = 'left',
  disabled = false,
  validate,
  minRows = 1,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = errors[id];

  return (
    <Stack spacing={spaceSizes.xs} width="100%">
      <Typography textAlign={labelAlign}>{label}</Typography>
      <TextField
        {...register(id, {
          required,
          validate,
        })}
        disabled={disabled}
        error={isNotNilOrEmpty(hasError)}
        helperText={hasError ? errorMessage : ''}
        inputProps={{ 'data-testid': id }}
        minRows={minRows}
        multiline={minRows > 1}
        placeholder={placeholder}
        sx={{
          'input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 60px #266798 inset',
            backgroundColor: '#266798',
            backgroundClip: 'content-box',
          },
          'input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active':
            {
              WebkitBoxShadow: '0 0 0 100px #266798 inset',
              backgroundColor: '#266798',
              backgroundClip: 'content-box',
            },
          'textarea:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px #266798 inset',
          },
          ':-moz-autofill': {
            boxShadow: '0 0 0 100px #266798 inset',
          },
        }}
        type={type}
        variant="outlined"
      />
    </Stack>
  );
};

export default Input;
