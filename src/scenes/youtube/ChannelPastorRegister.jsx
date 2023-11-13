import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useFetchPastor } from '../../api/commonCodeApi';
import { useFetchOriginVid } from '../../api/youtubeVideo';
import MButton from '../../components/MButton';
import { tokens } from '../../theme';
import axios from 'axios';

const ChannelPastorRegister = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery('(min-width:600px');
  const { data: pastorData } = useFetchPastor();
  const { data: channelData } = useFetchOriginVid();
  const [formData, setFormData] = useState({
    pastorCode: '',
    ovid: '',
    channelId: '',
  });
  const [playlist, setPlaylist] = useState([]);
  const searchChannel = () => {
    const apiKey = 'AIzaSyCU6n82YBGi7Q3cFPScwqUtPI4q3-oxDXc';
    const cid = 'UCBh3Qv-rKu6ZDxEcrio70Hw';
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${cid}&maxResults=50&key=${apiKey}`
      )
      .then((res) => {
        console.log(res);
        setPlaylist(res.data.items);
      })
      .catch(() => {});
    console.log(playlist);
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ mb: '20px' }}>
          채널별 목사님 영상 등록
        </Typography>
      </Box>
      <Box component="section" sx={{ p: 2, border: '1px solid grey' }}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}
        >
          <FormControl sx={{ gridColumn: 'span 1' }}>
            <Autocomplete
              filterSelectedOptions
              disableClearable
              id="combo-box-pastor"
              options={pastorData ?? []}
              getOptionLabel={(option) =>
                `${option.name} [${option.churchName}]` ?? undefined
              }
              renderInput={(params) => (
                <TextField {...params} label="목사님 선택" variant="filled" />
              )}
              onChange={(e, newVal, reason) => {
                newVal &&
                  setFormData({ ...formData, pastorCode: newVal.pastorCode });
              }}
              size="small"
            />
          </FormControl>
          <FormControl sx={{ gridColumn: 'span 2' }}>
            <Autocomplete
              filterSelectedOptions
              disableClearable
              id="combo-box-channel"
              options={channelData ?? []}
              getOptionLabel={(option) => `${option.originName}` ?? undefined}
              renderInput={(params) => (
                <TextField {...params} label="출처 선택" variant="filled" />
              )}
              onChange={(e, newVal, reason) => {
                newVal &&
                  setFormData({
                    ...formData,
                    ovid: newVal.ovid,
                    channelId: newVal.channelId,
                  });
              }}
              size="small"
            />
          </FormControl>
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ gridColumn: 'span 1' }}
          >
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '12px',
                fontWeight: 'bold',
                width: '30px',
              }}
              onClick={() => {}}
            >
              조회
            </Button>
          </Box>

          {/* <FormControl sx={{ gridColumn: 'span 2' }}>
            <Autocomplete
              value={formData.pastorCode ?? ''}
              onChange={(e, newVal) => {
                setFormData(
                  newVal ? { ...formData, pastorCode: newVal.pastorCode } : null
                );
                console.log(formData);
              }}
              id="search-pastor-code"
              options={pastorData ?? []}
              getOptionLabel={(option) => option.name ?? ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="목사님 선택"
                  placeholder="목사님 선택"
                  variant="filled"
                />
              )}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              defaultValue={formData.pastorCode ?? ''}
            />
          </FormControl> */}
        </Box>
      </Box>
    </>
  );
};

export default ChannelPastorRegister;
