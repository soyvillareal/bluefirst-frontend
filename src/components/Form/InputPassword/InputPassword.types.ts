export interface InputPasswordProps {
  label?: string;
  placeholder?: string;
  id: string;
  required?: boolean;
  labelAlign?: 'left' | 'right';
  disabled?: boolean;
  validate?: boolean;
  match?: string;
  tooltip?: string;
}
