import {
  Box,
  Tab,
  Tabs,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';
import MHeader from '../../components/MHeader';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AreacodeList from './AreacodeList';
import ChurchCodeList from './ChurchCodeList';

const CommonCode = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      m="20px"
      sx={{
        '& .MuiTab-textColorPrimary': {
          color: '#ffffff',
          fontSize: 14,
        },
        '& .Mui-selected': {
          color: colors.greenAccent[400],
          fontSize: 18,
        },
      }}
    >
      <MHeader title="코드 등록" subtitle="공통 코드 등록" />
      <Box m="20px 0 0 0">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="지역 코드 등록" value="1" />
                <Tab label="교회 코드 등록" value="2" />
                <Tab label="목사님 등록" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <AreacodeList />
            </TabPanel>
            <TabPanel value="2">
              <ChurchCodeList />
            </TabPanel>
            <TabPanel value="3"></TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default CommonCode;
