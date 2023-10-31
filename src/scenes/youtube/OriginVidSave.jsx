import { Box, Button, TextField, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSaveOriginVid } from '../../api/youtubeVideo';
import { tokens } from '../../theme';

const OriginVidSave = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [upperOpen, setUpperOpen] = useState(false);
  const { register, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      originName: '',
      channelUrl: '',
      originTitle: '',
      originComment: '',
    },
  });
  const { errors } = formState;
  const { mutateSaveOriginVid, saveOriginVidLoading } = useSaveOriginVid();
  const onSubmit = (data) => {
    const reqData = { ...data, userId: 'admin' };
    console.log('useSaveOriginVid : ', reqData);
    mutateSaveOriginVid(reqData, {
      onSuccess: () => {
        setUpperOpen(false);
      },
    });
  };

  if (saveOriginVidLoading) return <h3>save process Loading...</h3>;
  return (
    <>
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
          onClick={() => setUpperOpen(true)}
        >
          출처 등록
        </Button>

        <Button
          type="submit"
          size="small"
          sx={{
            fontSize: '14px',
            fontWeight: 'bold',
          }}
          color="secondary"
          variant="filled"
        >
          저장
        </Button>
      </Box>
      {upperOpen && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            label="Url"
            name="channelUrl"
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
            label="출처 설명"
            name="originComment"
            multiline
            rows={3}
            sx={{ gridColumn: 'span 4' }}
            {...register('comment')}
          />
        </form>
      )}
    </>
  );
};

export default OriginVidSave;
