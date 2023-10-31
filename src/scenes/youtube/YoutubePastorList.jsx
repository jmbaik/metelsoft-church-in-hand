import { Box } from '@mui/material';
import React, { useState } from 'react';
import MButton from '../../components/MButton';
import MGrid from '../../components/MGrid';
import { useFetchYoutubePastor } from '../../api/youtubeVideo';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import YoutubePastorSave from './YoutubePastorSave';

const YoutubePastorList = () => {
  const columns = [
    {
      field: 'vid',
      headerName: 'VID',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'pastorCode',
      headerName: '목사코드',
    },
    {
      field: 'pastorName',
      headerName: '목사',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'title',
      headerName: '제목',
      flex: 2,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'createYmd',
      headerName: '생성일',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'ovid',
      headerName: 'ovid',
    },
    {
      field: 'originName',
      headerName: '출처',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'youtubeId',
      headerName: 'Youbube id',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'userId',
      headerName: '생성자',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'updDt',
      headerName: '최종수정일',
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

  const columnVisibilityModel = {
    pastorCode: false,
    ovid: false,
  };

  const fnSub = (read) => {
    if (read === 'r') setEditParams({});
    setCrud(read);
  };

  const { isLoading, data, isError, error } = useFetchYoutubePastor();
  console.log(data);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>{error.message}</h3>;
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
          rowId="vid"
          data={data}
          cols={columns}
          columnVisibilityModel={columnVisibilityModel}
        />
      )}
      {crud !== 'r' && (
        <YoutubePastorSave upperFn={fnSub} params={editParams} crud={crud} />
      )}
    </>
  );
};

export default YoutubePastorList;
