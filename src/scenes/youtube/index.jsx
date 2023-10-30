import { Box, Button, useTheme } from '@mui/material';
import React from 'react';
import { tokens } from '../../theme';
import MHeader from '../../components/MHeader';
import { DataGrid } from '@mui/x-data-grid';
import { mockDataTeam } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import MGrid from '../../components/MGrid';
import { useFetchYoutubePastor } from '../../api/youtubeVideo';

const PastorYoutubeList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const columns = [
    {
      field: 'vid',
      headerName: 'vId',
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
      flex: 1,
    },
    {
      field: 'createYmd',
      headerName: '생성일',
      flex: 1,
    },
    {
      field: 'ovid',
      headerName: 'ovid',
    },
    {
      field: 'originName',
      headerName: '출처',
      flex: 1,
    },
    {
      field: 'youtubeId',
      headerName: 'Youbube id',
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
      headerName: '수정',
      flex: 1,
      renderCell: ({ row: { vid } }) => {
        return (
          <>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.greenAccent[700],
                color: colors.blueAccent[200],
              }}
              onClick={() => {
                navigate(`/you-on/${vid}`);
              }}
            >
              수정
            </Button>
          </>
        );
      },
    },
  ];

  const initialState = {
    columns: {
      columnVisibilityMode: {
        ovid: false,
        pastorCode: false,
      },
    },
  };
  const { isLoading, data, isError, error } = useFetchYoutubePastor({
    pastorCode: '',
    ovid: '',
  });
  console.log(data);
  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>{error.message}</h3>;

  return (
    <>
      <Box m="20px">
        <MHeader title="Youtube 영상" subtitle="목사님 영상" />
        <MGrid
          rowId="vid"
          data={data}
          cols={columns}
          initialState={initialState}
        />
      </Box>
    </>
  );
};

export default PastorYoutubeList;
