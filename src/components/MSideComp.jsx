import { Typography, useTheme } from '@mui/material';
import React from 'react';
import { tokens } from '../theme';

export const MSideSubTitle = ({ title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Typography
      variant="h6"
      color={colors.grey[300]}
      sx={{ m: '15px 0 5px 20px' }}
    >
      {title}
    </Typography>
  );
};
