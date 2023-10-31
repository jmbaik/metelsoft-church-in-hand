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
      ovid: '',
      originName: '',
      channelUrl: '',
      originTitle: '',
      originComment: '',
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
        출처 등록
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
            label="출처이름"
            name="originName"
            sx={{ gridColumn: 'span 2' }}
            {...register('originName', {
              required: '출처 이름을 반드시 입력하세요',
            })}
            error={!!errors?.originName}
            helperText={errors.originName?.message}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="출처코드 [읽기 전용]"
            name="ovid"
            sx={{ gridColumn: 'span 2' }}
            {...register('ovid')}
            disabled
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Url"
            name="channelUrl"
            sx={{ gridColumn: 'span 4' }}
            {...register('channelUrl', {
              required: '채널 Url을 전체 복사하여 붙여주세요',
            })}
            error={!!errors?.channelUrl}
            helperText={errors.channelUrl?.message}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="출처 제목"
            name="originTitle"
            sx={{ gridColumn: 'span 4' }}
            {...register('originTitle', {
              required: '출처 제목을 입력하여 주세요',
            })}
            error={!!errors?.originTitle}
            helperText={errors.originTitle?.message}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="출처 설명"
            name="originComment"
            multiline
            rows={3}
            sx={{ gridColumn: 'span 4' }}
            {...register('originComment')}
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
