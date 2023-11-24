import React from 'react';
import { useFetchChurchCode } from '../../api/commonCodeApi';
import MGrid from '../../components/MGrid';
import { Box, Button, useTheme } from '@mui/material';
import MButton from '../../components/MButton';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useState } from 'react';
import ChurchCodeSave from './ChurchCodeSave';
import { tokens } from '../../theme';

const ChurchCodeList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: 'churchCode',
      headerName: '교회 코드',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'name',
      headerName: '교회명',
      flex: 1,
    },
    {
      field: 'comment',
      headerName: '설명',
      flex: 1,
    },
    {
      field: 'pic',
      headerName: 'Picture',
      flex: 1,
    },
  ];

  const [crud, setCrud] = useState('r');
  const [editParams, setEditParams] = useState({});

  function doubleClicked(param) {
    const params = { ...param, areaCode: param.churchCode.substring(0, 1) };
    setEditParams(params);
    setCrud('e');
    console.log(params);
  }

  const { isLoading, data, isError, error } = useFetchChurchCode();
  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>{error.message}</h3>;

  const fnSub = (read) => {
    if (read === 'r') setEditParams({});
    setCrud(read);
  };
  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <MButton
          onClick={() => {
            let _crud = crud === 'r' ? 'i' : 'r';
            if (_crud === 'i') setEditParams({});
            setCrud(_crud);
          }}
        >
          {crud === 'r' && <AppRegistrationOutlinedIcon sx={{ mr: '10px' }} />}
          {crud !== 'r' && '목록으로'}
        </MButton>
      </Box>
      {crud === 'r' && (
        <MGrid
          onRowDoubleClick={doubleClicked}
          rowId="churchCode"
          data={data}
          cols={columns}
        />
      )}
      {crud !== 'r' && (
        <ChurchCodeSave upperFn={fnSub} params={editParams} crud={crud} />
      )}
    </>
  );
};

export default ChurchCodeList;
