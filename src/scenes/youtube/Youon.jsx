import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import MHeader from '../../components/MHeader';
import YouTube from 'react-youtube';
import MButton from '../../components/MButton';
import MAutoComplete from '../../components/MAutoComplete';
import { useFetchPastor } from '../../api/commonCodeApi';
import { useForm } from 'react-hook-form';

const Youon = (props) => {
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const { data: pastorList } = useFetchPastor();

  const { register, handleSubmit, setValue, formState, control } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      vid: '',
      pastorCode: '',
      title: '',
      ovid: '',
      youtubeid: '',
    },
  });

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
      <MHeader title="Youtube 등록" subtitle="[목사님 영상]" />
      <Box display="flex" justifyContent="flex-end" sx={{ mt: '20px' }}>
        <MButton>목록으로</MButton>
      </Box>
      <form>
        <Divider textAlign="left" sx={{ mt: '10px' }}>
          목사님 선택
        </Divider>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            mt: '10px',
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}
        >
          {/* <MAutoComplete /> */}
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
