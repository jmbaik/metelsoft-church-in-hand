import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSaveOriginVid } from '../../api/youtubeVideo';

const OriginVidSave = (props) => {
  const isNonMobile = useMediaQuery('(min-width:600px');
  const { register, handleSubmit, setValue, formState } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      channelId: '',
      channelTitle: '',
      channelDescription: '',
    },
  });
  const toList = (read) => {
    props.upperFn(read);
  };
  const { mutateSaveOriginVid, saveOriginVidLoading } = useSaveOriginVid();

  const { errors } = formState;

  const onSubmit = (data) => {
    const reqData = { ...data, ie: props.crud ?? 'i', userId: 'admin' };
    console.log('useSaveOriginVid : ', reqData);
    mutateSaveOriginVid(reqData, {
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

  if (saveOriginVidLoading) return <h3>save process Loading...</h3>;
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: '20px' }}>
        채널 등록
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
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="채널 ID [읽기 전용]"
            name="channelId"
            sx={{ gridColumn: 'span 4' }}
            {...register('channelId')}
            disabled
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="채널 Title"
            name="channelTitle"
            sx={{ gridColumn: 'span 4' }}
            {...register('channelTitle', {
              required: '채널 Title 반드시 입력하세요',
            })}
            error={!!errors?.channelTitle}
            helperText={errors.channelTitle?.message}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="채널 설명"
            name="channelDescription"
            multiline
            rows={3}
            sx={{ gridColumn: 'span 4' }}
            {...register('channelDescription')}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            저장
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default OriginVidSave;
