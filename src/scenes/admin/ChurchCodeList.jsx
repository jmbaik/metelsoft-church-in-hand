import React from 'react';
import { useFetchChurchCode } from '../../api/commonCodeApi';
import { DataGrid } from '@mui/x-data-grid';
import MGrid from '../../components/MGrid';

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

  return <MGrid rowId="churchCode" data={data} cols={columns} />;
};

export default ChurchCodeList;
