import { Box, useTheme } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useFetchPastor } from '../../api/commonCodeApi';
import MButton from '../../components/MButton';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import MGrid from '../../components/MGrid';
import PastorSave from './PastorSave';

const PastorList = () => {
  const columns = [
    {
      field: 'pastorCode',
      headerName: '코드',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'churchCode',
      headerName: '교회코드',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'churchName',
      headerName: '교회명',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'grade',
      headerName: 'grade',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'name',
      headerName: '이름',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'pic',
      headerName: 'Picture',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'updDt',
      headerName: '최종수정',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
  ];

  const [crud, setCrud] = useState('r');
  const [editParams, setEditParams] = useState({});
  function doubleClicked(param) {
    const params = { ...param };
    setEditParams(params);
    setCrud('e');
    console.log(params);
  }

  const { isLoading, data, isError, error } = useFetchPastor();
  console.log(data);
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
          rowId="pastorCode"
          data={data}
          cols={columns}
        />
      )}
      {crud !== 'r' && (
        <PastorSave upperFn={fnSub} params={editParams} crud={crud} />
      )}
    </>
  );
};

export default PastorList;
