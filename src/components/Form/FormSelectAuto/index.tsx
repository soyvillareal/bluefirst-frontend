import React, { HTMLAttributes, SyntheticEvent } from "react";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { isNotNilOrEmpty } from "ramda-adjunct";
import spaceSizes from "@theme/spaceSizes";

interface IOptionAutoComplete {
  name: string;
  value: string;
}

interface IFromSelectAutoProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  labelAlign?: "left" | "right" | "center";
  placeholder?: string;
  onChange?: (event: SyntheticEvent<Element, Event>, data: any) => void;
  options: IOptionAutoComplete[];
  getOptionLabel: (option: any) => string;
  renderOption?: (props: HTMLAttributes<HTMLLIElement>) => React.ReactNode;
  noOptionsText?: string;
  errorMessage?: string;
  defaultValue?: object;
  loading?: boolean;
}

export const FormSelectAuto = ({
  id,
  label,
  disabled,
  required = true,
  labelAlign = "left",
  placeholder,
  onChange,
  options,
  getOptionLabel,
  renderOption,
  noOptionsText,
  errorMessage,
  defaultValue,
  loading = false,
}: IFromSelectAutoProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const hasError = errors[id];

  return (
    <Stack
      alignItems="flex-start"
      spacing={spaceSizes.xs}
      sx={{ width: "100%" }}
    >
      <Typography textAlign={labelAlign}>{label}</Typography>
      <Controller
        control={control}
        name={id}
        render={({ field: { ref } }) => (
          <Autocomplete
            disabled={disabled}
            getOptionLabel={getOptionLabel}
            id={id}
            loading={loading}
            loadingText="..."
            noOptionsText={noOptionsText}
            options={options}
            renderInput={(props) => (
              <TextField
                ref={ref}
                id={props.id}
                disabled={props.disabled}
                InputProps={props.InputProps}
                fullWidth={props.fullWidth}
                size={props.size}
                autoComplete="off"
                error={isNotNilOrEmpty(hasError)}
                helperText={hasError ? errorMessage : ""}
                inputProps={{
                  ...props.inputProps,
                  "data-testid": id,
                }}
                placeholder={placeholder}
                variant="outlined"
              />
            )}
            renderOption={renderOption}
            sx={{ width: "100%" }}
            value={defaultValue}
            disableClearable
            onChange={onChange}
          />
        )}
        rules={{ required }}
      />
    </Stack>
  );
};
