import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import { useFetchAreaCode, useSaveChurchCode } from '../../api/commonCodeApi';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import MSelect from '../../components/MSelect';

const ChurchCodeSave = (props) => {
  const isNonMobile = useMediaQuery('(min-width:600px');
  const { data: areaCodeList } = useFetchAreaCode();
  const { register, handleSubmit, setValue, formState } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      areaCode: '',
      churchCode: '',
      name: '',
      comment: '',
    },
  });
  const toList = (read) => {
    props.upperFn(read);
  };
  const { mutateSaveChurch, saveChurchLoading } = useSaveChurchCode();

  const { errors } = formState;

  const onSubmit = (data) => {
    const reqData = { ...data, userId: 'admin' };
    console.log(reqData);
    mutateSaveChurch(reqData, {
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

  if (saveChurchLoading) return <h3>save process Loading...</h3>;
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: '20px' }}>
        교회 등록
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
          <MSelect
            optionData={areaCodeList}
            optionValue="aliasCode"
            optionText="name"
            register={register}
            errors={errors}
            name="areaCode"
            label="지역코드"
            errorText="지역코드를 반드시 선택하여야 합니다."
            sxStyle={{ gridColumn: 'span 1' }}
            isRequired={true}
            defaultValue={props.params?.areaCode ?? ''}
          />
          {/* <FormControl>
            <InputLabel id="label-area-code">지역선택</InputLabel>
            <Select
              labelId="label-area-code"
              name="areaCode"
              fullWidth
              variant="filled"
              defaultValue={props.params?.areaCode ?? ''}
              {...register('areaCode', {
                required: '지역코드가 반드시 선택되어야 합니다.',
              })}
              error={!!errors.areaCode}
            >
              <MenuItem value="">-지역선택-</MenuItem>
              {areaCodeList &&
                areaCodeList.map((area) => (
                  <MenuItem key={area.aliasCode} value={area.aliasCode}>
                    {area.name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText sx={{ color: '#db4f4a' }}>
              {errors.areaCode?.message}
            </FormHelperText>
          </FormControl> */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="교회 코드 [읽기 전용]"
            name="churchCode"
            sx={{ gridColumn: 'span 3' }}
            {...register('churchCode')}
            disabled
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="교회명"
            name="name"
            sx={{ gridColumn: 'span 4' }}
            {...register('name', {
              required: '교회명은 반드시 입력되어야 합니다.',
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
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
      </form>
    </Box>
  );
};

export default ChurchCodeSave;
