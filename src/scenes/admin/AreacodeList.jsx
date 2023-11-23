import React from 'react';
import { useFetchAreaCode } from '../../api/commonCodeApi';
import { DataGrid } from '@mui/x-data-grid';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const AreacodeList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  /** data */
  const { isLoading, data, isError, error } = useFetchAreaCode();

  const columns = [
    { field: 'areaCode', headerName: 'Area Code' },
    {
      field: 'name',
      headerName: '지역명',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'aliasCode',
      headerName: 'Alias',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
  ];

  return (
    <Box
      m="10px 0 0 0"
      height="75vh"
      sx={{
        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-cell': {
          borderBottom: 'none',
        },
        '& .name-column--cell': {
          color: colors.greenAccent[300],
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: colors.blueAccent[700],
          borderBottom: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: colors.primary[400],
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
          backgroundColor: colors.blueAccent[700],
        },
        '& .MuiCheckbox-root': {
          color: `${colors.greenAccent[200]} !important`,
        },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
          color: `${colors.grey[100]} !important`,
        },
      }}
    >
      <DataGrid
        getRowId={(row) => row.areaCode}
        rows={data ?? []}
        columns={columns}
      />
    </Box>
  );
};

export default AreacodeList;
