import {
  Autocomplete,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const MAutoComplete = ({
  control,
  optionData,
  optionText,
  optionValue,
  sxStyle,
  id,
  label,
  isRequired,
  defaultValue,
}) => {
  return (
    <Controller
      name={optionValue}
      rules={{
        required: isRequired,
      }}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <FormControl sx={sxStyle}>
            <Autocomplete
              value={
                value
                  ? optionData?.find((option) => {
                      return value === option[optionValue];
                    }) ?? null
                  : null
              }
              onChange={(e, newVal) => {
                onChange(newVal ? newVal[optionValue] : null);
              }}
              id={id}
              options={optionData ?? []}
              getOptionLabel={(option) => option[optionText]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  placeholder={label}
                  variant="filled"
                  inputRef={ref}
                />
              )}
              defaultValue={defaultValue}
            />
            {error ? (
              <FormHelperText sx={{ color: '#db4f4a' }}>
                {`${label} 반드시 하셔야 합니다.`}
              </FormHelperText>
            ) : null}
          </FormControl>
        );
      }}
    />
  );
};

export default MAutoComplete;
