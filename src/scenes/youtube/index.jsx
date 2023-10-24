import { Box, Button, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { tokens } from '../../theme';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import MHeader from '../../components/MHeader';
import { DataGrid } from '@mui/x-data-grid';
import { mockDataTeam } from '../../data/mockData';
import Youon from './Youon';
import { useNavigate } from 'react-router-dom';

const PastorYoutubeList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const columns = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'accessLevel',
      headerName: 'Access Level',
      flex: 1,
      renderCell: ({ row: { id, access } }) => {
        return (
          <>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.greenAccent[700],
                color: colors.blueAccent[200],
              }}
              onClick={() => {
                navigate('/you-on');
              }}
            >
              {access}
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box m="20px">
        <MHeader title="Youtube 영상" subtitle="목사님 영상" />
        <Box
          m="40px 0 0 0"
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
          }}
        >
          <DataGrid
            checkboxSelection
            rows={mockDataTeam}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Box>
      </Box>
    </>
  );
};

export default PastorYoutubeList;
