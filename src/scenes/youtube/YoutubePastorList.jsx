import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import MButton from '../../components/MButton';
import MGrid from '../../components/MGrid';
import { useFetchYoutubePastor } from '../../api/youtubeVideo';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import YoutubePastorSave from './YoutubePastorSave';
import Image from 'mui-image';
import { VideoPastorRegister } from './VideoPastorRegister';

const YoutubePastorList = () => {
  const columns = [
    {
      field: 'thumbnailDefault',
      headerName: 'Thumbnail',
      flex: 1,
      renderCell: ({ row: { thumbnailDefault } }) => {
        return (
          <Box
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={thumbnailDefault} width={150} />
          </Box>
        );
      },
    },
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
    },
    {
      field: 'title',
      headerName: '제목',
      flex: 3,
    },
    {
      field: 'createYmd',
      headerName: '생성일',
      flex: 1,
    },
    {
      field: 'channelId',
      headerName: 'channel ID',
      flex: 1,
    },
    {
      field: 'channelTitle',
      headerName: '출처',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: '생성자',
      flex: 1,
    },
    {
      field: 'updDt',
      headerName: '최종수정일',
      flex: 1,
    },
    {
      field: 'grade',
      headerName: 'grade',
    },
    {
      field: 'sort',
      headerName: 'sort',
    },
  ];

  const [crud, setCrud] = useState('r');
  const [editParams, setEditParams] = useState({});
  function doubleClicked(param) {
    const params = { ...param };
    setEditParams(params);
    setCrud('e');
    // console.log('pastor list double clicked :: ', params);
  }

  const columnVisibilityModel = {
    pastorCode: false,
    grade: false,
    sort: false,
  };

  const fnSub = (read) => {
    if (read === 'r') setEditParams({});
    setCrud(read);
  };

  const { isLoading, data, isError, error } = useFetchYoutubePastor();
  // console.log(data);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>{error.message}</h3>;
  return (
    <>
      {/* <Box display="flex" justifyContent="flex-end">
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
      </Box> */}
      {crud === 'r' && (
        <>
          <Box display="flex" justifyContent="flex-end">
            <Typography>
              * 찾기 기능은 그리드의 필터링 기능을 이용하세요.{' '}
            </Typography>
          </Box>
          <MGrid
            onRowDoubleClick={doubleClicked}
            rowId="vid"
            data={data}
            cols={columns}
            columnVisibilityModel={columnVisibilityModel}
          />
        </>
      )}
      {crud !== 'r' && (
        <VideoPastorRegister upperFn={fnSub} params={editParams} crud={crud} />
      )}
    </>
  );
};

export default YoutubePastorList;
