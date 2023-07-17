import { ValidateResult } from 'react-hook-form';

export interface InputProps {
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  id: string;
  type?: string;
  required?: boolean;
  labelAlign?: 'left' | 'right';
  disabled?: boolean;
  validate?: (value: string) => Promise<ValidateResult> | ValidateResult;
  minRows?: number;
}
