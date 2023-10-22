import { Button, useTheme } from '@mui/material';
import React from 'react';
import { tokens } from '../theme';

const MButton = ({ children, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Button
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: '12px',
        fontWeight: 'bold',
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default MButton;
