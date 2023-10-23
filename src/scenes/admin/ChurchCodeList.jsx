import React from 'react';
import { useFetchChurchCode } from '../../api/commonCodeApi';
import MGrid from '../../components/MGrid';
import { Box } from '@mui/material';
import MButton from '../../components/MButton';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { useState } from 'react';
import ChurchCodeSave from './ChurchCodeSave';

const ChurchCodeList = () => {
  const { isLoading, data, isError, error } = useFetchChurchCode();

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
      cellClassName: 'name-column--cell',
    },
    {
      field: 'comment',
      headerName: '설명',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'pic',
      headerName: 'Picture',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
  ];

  const [editable, setEditable] = useState(false);
  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <MButton
          onClick={() => {
            setEditable(!editable);
          }}
        >
          {!editable && <AppRegistrationOutlinedIcon sx={{ mr: '10px' }} />}
          {editable && <SaveOutlinedIcon sx={{ mr: '10px' }} />}
        </MButton>
      </Box>
      {!editable && <MGrid rowId="churchCode" data={data} cols={columns} />}
      {editable && <ChurchCodeSave />}
    </>
  );
};

export default ChurchCodeList;
