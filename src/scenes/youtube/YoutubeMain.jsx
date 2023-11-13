import { Box, Tab } from '@mui/material';
import React from 'react';
import MHeader from '../../components/MHeader';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ChurchCodeList from '../admin/ChurchCodeList';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import OriginVidList from './OriginVidList';
import YoutubePastorList from './YoutubePastorList';
import ChannelPastorRegister from './ChannelPastorRegister';
import { VideoPastorRegister } from './VideoPastorRegister';

const YoutubeMain = () => {
  // const isNonMobile = useMediaQuery('(min-width:600px)');
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box m="20px">
      <MHeader title="Youtube 영상 [목사님 영상]" />
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
                <Tab label="출처 등록" value="1" />
                <Tab label="영상 등록" value="2" />
                <Tab label="목사님 영상 목록" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <OriginVidList />
            </TabPanel>
            <TabPanel value="2">
              <VideoPastorRegister />
            </TabPanel>
            <TabPanel value="3">
              <YoutubePastorList />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default YoutubeMain;
