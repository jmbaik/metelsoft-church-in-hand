import React from 'react';
import { useFetchAreaCode } from '../../api/commonCodeApi';
import { DataGrid } from '@mui/x-data-grid';

const AreacodeList = (props) => {
  /** data */

  const { isLoading, data, isError, error } = useFetchAreaCode();

  const columns = [
    { field: 'acode', headerName: 'Area Code' },
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
    <DataGrid
      getRowId={(row) => row.acode}
      rows={data ?? []}
      columns={columns}
    />
  );
};

export default AreacodeList;
