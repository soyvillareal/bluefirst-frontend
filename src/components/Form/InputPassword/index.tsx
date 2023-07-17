import { useEffect, useMemo, useState } from 'react';
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { isNonEmptyString, isNotNilOrEmpty } from 'ramda-adjunct';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import InfoTooltip from '@components/InfoTooltip';
import spaceSizes from '@theme/spaceSizes';

import { InputPasswordProps } from './InputPassword.types';
import {
  DIGIT_REGEX,
  LOWER_REGEX,
  UPPER_REGEX,
} from './InputPassword.constants';

// This input was thinked to be used with React Hook forms
// Must be used with Form Provider or our Form Component
const InputPassword = ({
  label = '',
  placeholder,
  id,
  required = true,
  labelAlign = 'left',
  disabled = false,
  validate = true,
  match = '',
  tooltip,
}: InputPasswordProps) => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    trigger,
    watch,
  } = useFormContext();

  const hasError = errors[id];

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Trick for only runs useEffect on validation case
  const inputValue = validate ? watch(id) : '';
  const matchToValidate = useMemo(() => {
    return validate && isNonEmptyString(inputValue) && isNonEmptyString(match);
  }, [validate, inputValue, match]);

  useEffect(() => {
    if (matchToValidate) {
      trigger(id);
    }
  }, [trigger, id, matchToValidate, match, inputValue]);

  return (
    <Stack spacing={spaceSizes.xs} width="100%">
      <Typography textAlign={labelAlign}>{label}</Typography>
      <TextField
        {...register(id, {
          required: {
            value: required,
            message: t('error.password_required'),
          },
          ...(validate && {
            minLength: {
              value: matchToValidate ? 1 : 8,
              message: t('error.password_min_length'),
            },
            maxLength: {
              value: 16,
              message: t('error.password_max_length'),
            },
            validate: matchToValidate
              ? {
                  match: (value) =>
                    (matchToValidate ? match === value : true) ||
                    t('error.password_must_match'),
                }
              : {
                  digit: (value) =>
                    DIGIT_REGEX.test(value) || t('error.password_number'),
                  upper: (value) =>
                    UPPER_REGEX.test(value) || t('error.password_upper'),
                  lower: (value) =>
                    LOWER_REGEX.test(value) || t('error.password_lower'),
                  match: (value) =>
                    (matchToValidate ? match === value : true) ||
                    t('error.password_must_match'),
                },
          }),
        })}
        disabled={disabled}
        error={isNotNilOrEmpty(hasError)}
        helperText={hasError ? (hasError.message as string) : ''}
        InputProps={{
          inputProps: {
            'data-testid': id,
          },
          endAdornment: (
            <InputAdornment position="end">
              {tooltip && <InfoTooltip content={tooltip} />}
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
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
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        {...(isNonEmptyString(inputValue) && { onBlur: () => trigger(id) })}
      />
    </Stack>
  );
};

export default InputPassword;
