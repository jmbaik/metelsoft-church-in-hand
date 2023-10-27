import { MenuItem, TextField } from '@mui/material';
import React from 'react';

const MSelect = ({
  optionData,
  optionValue,
  optionText,
  register,
  errors,
  name,
  label,
  errorText,
  sxStyle,
  isRequired,
  defaultValue,
}) => {
  return (
    <TextField
      select
      fullWidth
      variant="filled"
      sx={sxStyle}
      label={label}
      defaultValue={defaultValue}
      inputProps={register(name, {
        required: isRequired ? errorText : false,
      })}
      error={!!errors[name]}
      helperText={errors[name]?.message}
    >
      {optionData &&
        optionData.map((option) => (
          <MenuItem key={option[optionValue]} value={option[optionValue]}>
            {option[optionText]}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default MSelect;
