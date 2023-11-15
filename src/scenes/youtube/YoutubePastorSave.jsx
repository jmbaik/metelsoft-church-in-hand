import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  useFetchOriginVid,
  useSaveYoutubePastor,
} from '../../api/youtubeVideo';
import { useEffect } from 'react';
import MAutoComplete from '../../components/MAutoComplete';
import { useFetchPastor } from '../../api/commonCodeApi';
import YouTube from 'react-youtube';

const YoutubePastorSave = (props) => {
  const isNonMobile = useMediaQuery('(min-width:600px');
  const { register, handleSubmit, setValue, formState, control, getValues } =
    useForm({
      mode: 'onSubmit',
      defaultValues: {
        pastorCode: '',
        churchCode: '',
        grade: '',
        name: '',
        comment: '',
        pic: '',
      },
    });
  const toList = (read) => {
    props.upperFn(read);
  };
  const { data: pastorList } = useFetchPastor();
  const { data: originVidList } = useFetchOriginVid();

  const { mutateSaveYoutubePastor, saveYoutubePastorLoading } =
    useSaveYoutubePastor();

  const { errors } = formState;

  const onSubmit = (data) => {
    const reqData = { ...data, ie: props.crud ?? 'i', userId: 'admin' };
    // console.log(reqData);
    mutateSaveYoutubePastor(reqData, {
      onSuccess: () => {
        toList('r');
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
  if (saveYoutubePastorLoading) return <h3>save process Loading...</h3>;
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: '20px' }}>
        목사님 등록
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
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
            optionText="originName"
            optionValue="ovid"
            sxStyle={{ gridColumn: 'span 4' }}
            id="ac-pastor-code"
            label="출처 선택"
            isRequired={true}
            defaultValue={props.params?.pastorCode ?? ''}
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
            {...register('title', {
              required: '제목은 반드시 입력되어야 합니다.',
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Youtube ID"
            name="youtubeId"
            sx={{ gridColumn: 'span 2' }}
            {...register('youtubeId', {
              required: 'Youtube 영상 아이디는 반드시 필요합니다.',
            })}
            error={!!errors.youtubeId}
            helperText={errors.youtubeId?.message}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="설명"
            name="comment"
            multiline
            rows={3}
            sx={{ gridColumn: 'span 4' }}
            {...register('comment')}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            저장
          </Button>
        </Box>
        {props.params['youtubeId'] && (
          <YouTube
            key={props.params['youtubeId']}
            videoId={props.params['youtubeId']}
            opts={opts}
            onReady={onPlayerReady}
          />
        )}
      </form>
    </Box>
  );
};

export default YoutubePastorSave;
