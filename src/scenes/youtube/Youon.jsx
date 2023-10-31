import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import MHeader from '../../components/MHeader';
import YouTube from 'react-youtube';
import MButton from '../../components/MButton';
import MAutoComplete from '../../components/MAutoComplete';
import { useFetchPastor } from '../../api/commonCodeApi';
import { useForm } from 'react-hook-form';
import {
  useFetchOriginVid,
  useSaveYoutubePastor,
} from '../../api/youtubeVideo';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { tokens } from '../../theme';

const Youon = (props) => {
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigator = useNavigate();

  const { data: pastorList } = useFetchPastor();
  const { data: originVidList } = useFetchOriginVid();

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

  const { mutateSaveYoutubePastor, saveYoutubePastorLoading } =
    useSaveYoutubePastor();

  const onSubmit = (data) => {
    const reqData = { ...data, userId: 'admin' };
    console.log(reqData);
    mutateSaveYoutubePastor(reqData, {
      onSuccess: () => {
        navigator('/youtube-pastor');
      },
    });
  };

  useEffect(() => {
    if (props.crud === 'e') {
      const _values = props.params;
      for (const [key, value] of Object.entries(_values)) {
        setValue(key, value);
      }
    }
  }, [props.crud, props.params, setValue]);

  // youtube api 사용
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
  // -- youtube api end

  return (
    <Box m="20px">
      <MHeader title="Youtube 등록" subtitle="[목사님 영상]" />
      <Box display="flex" justifyContent="flex-end" sx={{ mt: '20px' }}>
        <MButton onClick={() => navigator('/youtube-pastor')}>목록으로</MButton>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <MAutoComplete
            control={control}
            optionData={pastorList}
            optionText="name"
            optionValue="pastorCode"
            sxStyle={{ gridColumn: 'span 4' }}
            id="ac-pastor-code"
            label="목사님 선택"
            isRequired={true}
            defaultValue={props.params?.pastorCode ?? ''}
          />
          <Divider textAlign="left" sx={{ mt: '10px', gridColumn: 'span 4' }}>
            출처 선택 및 등록
          </Divider>
          <MAutoComplete
            control={control}
            optionData={originVidList}
            optionText="name"
            optionValue="ovid"
            sxStyle={{ gridColumn: 'span 2' }}
            id="ac-pastor-code"
            label="출처 선택"
            isRequired={true}
            defaultValue={props.params?.pastorCode ?? ''}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{ gridColumn: 'span 2' }}
          >
            <Button
              sx={{
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
              }}
              color="secondary"
              variant="outlined"
              onClick={() => {}}
            >
              출처 등록
            </Button>

            <Button
              size="small"
              sx={{
                fontSize: '14px',
                fontWeight: 'bold',
              }}
              color="secondary"
              variant="filled"
              onClick={() => {}}
            >
              저장
            </Button>
          </Box>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="출처이름"
            name="originName"
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Url"
            name="originName"
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="출처 제목"
            name="originTitle"
            sx={{ gridColumn: 'span 4' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="설명"
            name="originComment"
            multiline
            rows={3}
            sx={{ gridColumn: 'span 4' }}
            {...register('comment')}
          />
          <Divider textAlign="left" sx={{ mt: '10px', gridColumn: 'span 4' }}>
            정보 입력
          </Divider>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="제목"
            name="title"
            sx={{ gridColumn: 'span 4' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Youtube ID"
            name="youtubeId"
            sx={{ gridColumn: 'span 2' }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            저장
          </Button>
        </Box>
      </form>

      <YouTube videoId="SnwgCgYfKlI" opts={opts} onReady={onPlayerReady} />
    </Box>
  );
};

export default Youon;
