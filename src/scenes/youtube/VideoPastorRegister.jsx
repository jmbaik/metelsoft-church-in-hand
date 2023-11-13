import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import { useFetchPastor } from '../../api/commonCodeApi';
import { useFetchOriginVid } from '../../api/youtubeVideo';
import { useForm } from 'react-hook-form';
import { useFetchYoutubeSearchByVid } from '../../api/youtubeDataApi';

export const VideoPastorRegister = () => {
  /***
   * id : youtubeId
   * snippet.channelId
   * snippet.channelTitle
   * snippet.title
   * snippet.description
   * snippet.thumbnails.default.url
   * snippet.thumbnails.medium.url
   * snippet.thumbnails.high.url
   */
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery('(min-width:600px');
  const { data: pastorData } = useFetchPastor();
  const { data: channelData } = useFetchOriginVid();
  const [formData, setFormData] = useState({
    youtubeId: '',
    ovid: '',
    pastorCode: '',
  });

  const { register, handleSubmit, setValue, getValues, formState } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      youtubeId: '',
      ovid: '',
      originName: '',
      channelUrl: '',
      channelId: '',
      originTitle: '',
      originComment: '',
    },
  });
  const { errors } = formState;

  const {
    data: youtubeSearchData,
    error: searchError,
    isError: isSearchError,
  } = useFetchYoutubeSearchByVid(formData.youtubeId);

  const search = () => {
    const _youtubeId = getValues('youtubeId');
    console.log('youtubeId', getValues('youtubeId'));
    // https://youtu.be/p6s0bod-nY0

    if (_youtubeId?.length > 0) {
      console.log('dfkasdjflja', 'refresh가 작동');
      setFormData({ ...formData, youtubeId: _youtubeId });
    }
    if (isSearchError) {
      console.log('search error', searchError.message);
    }
  };

  const onSubmit = (data) => {
    const reqData = { ...data, userId: 'admin' };
    console.log('useSaveOriginVid : ', reqData);
  };

  useEffect(() => {
    console.log('searchData', youtubeSearchData);
  }, [youtubeSearchData]);

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ mb: '20px' }}>
          Youtube 영상 등록 (목사님 영상)
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
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Video Id"
            name="youtubeId"
            sx={{ gridColumn: 'span 2' }}
            {...register('youtubeId')}
            error={!!errors?.youtubeId}
            helperText={errors.youtubeId?.message}
          />
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ gridColumn: 'span 2' }}
          >
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '12px',
                fontWeight: 'bold',
                width: '30px',
              }}
              onClick={search}
            >
              조회
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider
        textAlign="left"
        sx={{ mt: '10px', mb: '10px', gridColumn: 'span 4' }}
      >
        조회 결과 / 정보 등록
      </Divider>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            <FormControl sx={{ gridColumn: 'span 2' }}>
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
              sx={{ gridColumn: 'span 2' }}
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
              label="출처 Id"
              name="channelId"
              sx={{ gridColumn: 'span 2' }}
              {...register('channelId', {
                required: '채널 Id를 입력하세요',
              })}
              error={!!errors?.channelId}
              helperText={errors.channelId?.message}
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
    </>
  );
};
