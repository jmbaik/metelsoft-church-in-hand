import { Box, Button, Checkbox, Typography } from '@mui/material';
import React from 'react';
import MHeader from '../../components/MHeader';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import YouTube from 'react-youtube';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // youtube api 사용
  const opts = {
    height: '160',
    width: '340',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  const onPlayerReady = (e) => {
    e.target.pauseVideo();
  };
  // -- youtube api end
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <MHeader title="Dashboard" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: '10px' }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="200px"
        gap="20px"
        sx={{ mt: '20px' }}
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Checkbox color="secondary" />
          <Box>
            <YouTube
              videoId="SnwgCgYfKlI"
              opts={opts}
              onReady={onPlayerReady}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Checkbox color="secondary" />
          <Box>
            <YouTube
              videoId="SnwgCgYfKlI"
              opts={opts}
              onReady={onPlayerReady}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Checkbox color="secondary" />
          <Box>
            <YouTube
              videoId="SnwgCgYfKlI"
              opts={opts}
              onReady={onPlayerReady}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Checkbox color="secondary" />
          <Box>
            <YouTube
              videoId="SnwgCgYfKlI"
              opts={opts}
              onReady={onPlayerReady}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
