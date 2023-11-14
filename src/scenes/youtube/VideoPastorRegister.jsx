import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { tokens } from '../../theme';
import { useFetchPastor } from '../../api/commonCodeApi';
import { useForm } from 'react-hook-form';
import {
  useFetchYoutubeSearchByVid,
  useSaveYoutubeSearchByVid,
} from '../../api/youtubeDataApi';
import { MFormBox } from '../../components/MFormBox';
import YouTube from 'react-youtube';

export const VideoPastorRegister = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: pastorData } = useFetchPastor();
  console.log('pastorData', pastorData);
  const [formData, setFormData] = useState({
    youtubeId: '',
    channelId: '',
    pastorCode: '',
    grade: '',
  });

  const { register, handleSubmit, setValue, getValues, formState, reset } =
    useForm({
      mode: 'onSubmit',
      defaultValues: {
        youtubeId: '',
        vid: '',
        pastorCode: '',
        channelId: '',
        title: '',
        channelTitle: '',
        thumbnailDefault: '',
        thumbnailMedium: '',
        thumbnailHigh: '',
        grade: '',
        sort: '',
        createYmd: '',
        description: '',
        userId: 'admin',
        updDt: '',
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

  const { mutateSaveYoutubeSearch, isLoadingYoutubeSearch } =
    useSaveYoutubeSearchByVid();

  const onSubmit = (data) => {
    const _pastorCode = formData?.pastorCode;
    if (!_pastorCode.length) {
      alert('목사님을 선택하지 않았습니다.');
      return;
    }
    const reqData = {
      ...data,
      pastorCode: formData.pastorCode,
      userId: 'admin',
    };
    console.log('useSaveYoutubeSearchByVid : ', reqData);
    mutateSaveYoutubeSearch(reqData, {
      onSuccess: () => {
        alert('저장작업을 성공하였습니다.');
        reset();
        setFormData({
          youtubeId: '',
          channelId: '',
          pastorCode: '',
          grade: '',
        });
        setPastorSelected(initialPastorData);
      },
    });
  };

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

  const initialPastorData = {
    pastorCode: '',
    churchCode: '',
    churchName: '',
    grade: '',
    name: '',
    comment: '',
    pic: '',
    userId: '',
    regId: '',
    regDt: '',
    updId: '',
    updDt: '',
  };
  const [pastorSelected, setPastorSelected] = useState(initialPastorData);

  useEffect(() => {
    /***
     * id : youtubeId
     * snippet.channelId
     * snippet.channelTitle
     * snippet.title
     * snippet.description
     * snippet.thumbnails.default.url
     * snippet.thumbnails.medium.url
     * snippet.thumbnails.high.url
     * 
     * vid: '',
      pastorCode: '',
      channelId: '',
      title: '',
      channelTitle: '',
      thumbnailDefault: '',
      thumbnailMedium: '',
      thumbnailHigh: '',
      grade: '',
      sort: '',
      createYmd: '',
      description: '',
      userId: 'admin',
      updDt: '',
     */
    console.log('searchData', youtubeSearchData);
    if (youtubeSearchData?.length > 0) {
      const data = youtubeSearchData[0];
      setValue('vid', data.id);
      setValue('channelId', data.snippet.channelId);
      setValue('title', data.snippet.title);
      setValue('channelTitle', data.snippet.channelTitle);
      setValue('thumbnailDefault', data.snippet.thumbnails.default.url);
      setValue('thumbnailMedium', data.snippet.thumbnails.medium.url);
      setValue('thumbnailHigh', data.snippet.thumbnails.high.url);
      setValue('description', data.snippet.description);
    }
  }, [youtubeSearchData, setValue]);

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ mb: '20px' }}>
          Youtube 영상 등록 (목사님 영상)
        </Typography>
      </Box>
      <Box component="section" sx={{ p: 2, border: '1px solid grey' }}>
        <MFormBox>
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
        </MFormBox>
      </Box>
      <Divider
        textAlign="left"
        sx={{ mt: '10px', mb: '10px', gridColumn: 'span 4' }}
      >
        조회 결과 / 정보 등록
      </Divider>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <MFormBox>
            <FormControl sx={{ gridColumn: 'span 4' }}>
              <Autocomplete
                filterSelectedOptions
                disableClearable
                id="combo-box-pastor"
                options={pastorData ?? []}
                getOptionLabel={(option) =>
                  option.name
                    ? `${option.name} [${option.churchName}]` ?? ''
                    : ''
                }
                renderInput={(params) => (
                  <TextField {...params} label="목사님 선택" variant="filled" />
                )}
                onChange={(e, newVal, reason) => {
                  newVal &&
                    setFormData({ ...formData, pastorCode: newVal.pastorCode });
                  setPastorSelected(newVal);
                }}
                size="small"
                value={pastorSelected}
                isOptionEqualToValue={(option, value) => {
                  return option.pastorCode === value.pastorCode;
                }}
              />
            </FormControl>
            <TextField
              select
              fullWidth
              variant="filled"
              sx={{ gridColumn: 'span 2' }}
              label="grade"
              defaultValue=""
              inputProps={register('grade', {
                required: 'Grade를 반드시 선택하여 주세요',
              })}
              error={!!errors?.grade}
              helperText={errors.grade?.message}
              value={formData.grade}
              onChange={(e) => {
                setFormData({ ...formData, grade: e.target.value });
              }}
            >
              <MenuItem key="" value="">
                -선택-
              </MenuItem>
              <MenuItem key="S" value="S">
                최우선
              </MenuItem>
              <MenuItem key="H" value="H">
                높음
              </MenuItem>
              <MenuItem key="M" value="M">
                중간
              </MenuItem>
              <MenuItem key="L" value="L">
                낮음
              </MenuItem>
            </TextField>
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="정렬 순위"
              name="sort"
              sx={{ gridColumn: 'span 2' }}
              inputProps={{ inputMode: 'numeric' }}
              {...register('sort', {
                required: '정렬 순위를 반드시 입력하세요',
              })}
              error={!!errors?.sort}
              helperText={errors.sort?.message}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="vid"
              name="vid"
              sx={{ gridColumn: 'span 2' }}
              {...register('vid', { required: 'vid 필수 항목' })}
              error={!!errors?.vid}
              helperText={errors.vid?.message}
              disabled
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="channel Id"
              name="channelId"
              sx={{ gridColumn: 'span 2' }}
              {...register('channelId', { required: 'channelId 필수 항목' })}
              error={!!errors?.channelId}
              helperText={errors.channelId?.message}
              disabled
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Channel 제목"
              name="channelTitle"
              sx={{ gridColumn: 'span 4' }}
              {...register('channelTitle', {
                required: 'channelTitle 필수 항목',
              })}
              error={!!errors?.channelTitle}
              helperText={errors.channelTitle?.message}
              disabled
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Title"
              name="title"
              sx={{ gridColumn: 'span 4' }}
              {...register('title', { required: 'title 필수 항목' })}
              error={!!errors?.title}
              helperText={errors.title?.message}
              disabled
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Thumbnail Default"
              name="thumbnailDefault"
              sx={{ gridColumn: 'span 4' }}
              {...register('thumbnailDefault', {
                required: 'thumbnailDefault 필수 항목',
              })}
              error={!!errors?.thumbnailDefault}
              helperText={errors.thumbnailDefault?.message}
              disabled
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Thumbnail Medium"
              name="thumbnailMedium"
              sx={{ gridColumn: 'span 4' }}
              {...register('thumbnailMedium', {
                required: 'thumbnailMedium 필수 항목',
              })}
              error={!!errors?.thumbnailMedium}
              helperText={errors.thumbnailMedium?.message}
              disabled
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Thumbnail High"
              name="thumbnailHigh"
              sx={{ gridColumn: 'span 4' }}
              {...register('thumbnailHigh', {
                required: 'thumbnailHigh 필수 항목',
              })}
              error={!!errors?.thumbnailHigh}
              helperText={errors.thumbnailHigh?.message}
              disabled
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="설명"
              name="description"
              multiline
              rows={3}
              sx={{ gridColumn: 'span 4' }}
              {...register('description')}
            />
          </MFormBox>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              저장
            </Button>
          </Box>
        </form>
        {youtubeSearchData?.length > 0 ? (
          <Box>
            <YouTube
              videoId={youtubeSearchData[0].id}
              opts={opts}
              onReady={onPlayerReady}
            />
          </Box>
        ) : null}
      </Box>
    </>
  );
};
