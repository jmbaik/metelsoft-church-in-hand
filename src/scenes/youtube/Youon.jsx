import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import MHeader from '../../components/MHeader';
import YouTube from 'react-youtube';

const Youon = (props) => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const onPlayerReady = (e) => {
    e.target.pauseVideo();
  };
  return (
    <Box m="20px">
      <MHeader title="CREATE USER" subtitle="Create a New User Profile" />
      <form>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="First Name"
            name="firstName"
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Last Name"
            name="lastName"
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email"
            name="email"
            sx={{ gridColumn: 'span 4' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Contact Number"
            name="contact"
            sx={{ gridColumn: 'span 4' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address 1"
            name="address1"
            sx={{ gridColumn: 'span 4' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address 2"
            name="address2"
            sx={{ gridColumn: 'span 4' }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New User
          </Button>
        </Box>
      </form>

      <YouTube videoId="SnwgCgYfKlI" opts={opts} onReady={onPlayerReady} />
    </Box>
  );
};

export default Youon;
