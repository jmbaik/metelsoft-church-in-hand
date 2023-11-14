import { Box } from '@mui/material';
import React, { useState } from 'react';
import MButton from '../../components/MButton';
import MGrid from '../../components/MGrid';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import { useFetchOriginVid } from './../../api/youtubeVideo';
import OriginVidSave from './OriginVidSave';

const OriginVidList = () => {
  const columns = [
    {
      field: 'channelId',
      headerName: '채널 ID',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'channelTitle',
      headerName: '제목',
      flex: 2,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'description',
      headerName: '설명',
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

  const { isLoading, data, isError, error } = useFetchOriginVid({
    channelTitle: '',
    channelDescription: '',
  });

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
          rowId="channelId"
          data={data}
          cols={columns}
        />
      )}
      {crud !== 'r' && (
        <OriginVidSave upperFn={fnSub} params={editParams} crud={crud} />
      )}
    </>
  );
};

export default OriginVidList;
