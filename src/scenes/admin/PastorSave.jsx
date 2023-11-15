import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  MenuItem,
} from '@mui/material';
import React from 'react';
import { useFetchChurchCode, useSavePastor } from '../../api/commonCodeApi';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import MAutoComplete from '../../components/MAutoComplete';
import MSelect from '../../components/MSelect';

const PastorSave = (props) => {
  const isNonMobile = useMediaQuery('(min-width:600px');
  const { data: churchCodeList } = useFetchChurchCode();
  const { register, handleSubmit, setValue, formState, control } = useForm({
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
  const { mutateSavePastor, savePastorLoading } = useSavePastor();

  const { errors } = formState;

  const onSubmit = (data) => {
    const reqData = { ...data, pic: '', userId: 'admin' };
    console.log(reqData);
    mutateSavePastor(reqData, {
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

  const gradeList = [
    { val: '', text: '-선택' },
    { val: 'P', text: '목사' },
    { val: 'E', text: '장로' },
    { val: 'M', text: '선교사' },
  ];

  if (savePastorLoading) return <h3>save process Loading...</h3>;
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
            optionData={churchCodeList}
            optionText="name"
            optionValue="churchCode"
            sxStyle={{ gridColumn: 'span 2' }}
            id="ac-church-code"
            label="교회선택"
            isRequired={true}
            defaultValue={props.params?.churchCode ?? ''}
          />
          {/* <Controller
            name="churchCode"
            rules={{
              required: 'required',
            }}
            control={control}
            render={({ field, fieldState: { error } }) => {
              const { onChange, value, ref } = field;
              return (
                <>
                  <Autocomplete
                    value={
                      value
                        ? churchCodeList.find((option) => {
                            return value === option.churchCode;
                          })
                        : null
                    }
                    onChange={(e, newVal) => {
                      onChange(newVal ? newVal.churchCode : null);
                    }}
                    sx={{ gridColumn: 'span 2' }}
                    id="autocomplete-church-code"
                    options={churchCodeList ?? []}
                    getOptionLabel={(option) =>
                      option.name + ' : ' + option.churchCode
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="교회 선택"
                        placeholder="교회 선택"
                        variant="filled"
                        inputRef={ref}
                      />
                    )}
                  />
                  {error ? (
                    <FormHelperText sx={{ color: '#db4f4a' }}>
                      교회를 반드시 선택하셔야 합니다.
                    </FormHelperText>
                  ) : null}
                </>
              );
            }}
          ></Controller> */}

          {/* <FormControl sx={{ gridColumn: 'span 2' }}>
            <InputLabel id="label-church-code">교회 선택</InputLabel>
            <Select
              labelId="label-church-code"
              name="churchCode"
              fullWidth
              variant="filled"
              defaultValue={props.params?.churchCode ?? ''}
              {...register('churchCode', {
                required: '교회코드가 반드시 선택되어야 합니다.',
              })}
              error={!!errors.churchCode}
            >
              <MenuItem value="">-교회 선택-</MenuItem>
              {churchCodeList &&
                churchCodeList.map((church) => (
                  <MenuItem key={church.churchCode} value={church.churchCode}>
                    {church.name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText sx={{ color: '#db4f4a' }}>
              {errors.churchCode?.message}
            </FormHelperText>
          </FormControl> */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="코드 [읽기 전용]"
            name="pastorCode"
            sx={{ gridColumn: 'span 2' }}
            {...register('pastorCode')}
            disabled
          />
          <MSelect
            optionData={gradeList}
            optionValue="val"
            optionText="text"
            register={register}
            errors={errors}
            name="grade"
            label="Grade"
            errorText="Grade 반드시 선택하여야 합니다."
            sxStyle={{ gridColumn: 'span 1' }}
            isRequired={true}
            defaultValue={props.params?.grade ?? ''}
          />

          {/* <TextField
            select
            fullWidth
            variant="filled"
            sx={{ gridColumn: 'span 1' }}
            label="Grade"
            defaultValue=""
            inputProps={register('grade', {
              required: 'Grade를 선택하여 주세요',
            })}
            error={!!errors.grade}
            helperText={errors.grade?.message}
          >
            <MenuItem key="None" value="">
              선택
            </MenuItem>
            <MenuItem key="P" value="P">
              목사
            </MenuItem>
          </TextField> */}
          {/* <FormControl sx={{ gridColumn: 'span 1' }}>
            <InputLabel id="label-grade-code">Grade</InputLabel>
            <Select
              labelId="label-grade-code"
              name="grade"
              fullWidth
              variant="filled"
              defaultValue=""
              {...register('grade', {
                required: 'grade 반드시 선택하여 주세요',
              })}
              error={!!errors.grade}
            >
              <MenuItem key="None" value="">
                선택
              </MenuItem>
              <MenuItem key="P" value="P">
                목사
              </MenuItem>
            </Select>
            <FormHelperText sx={{ color: '#db4f4a' }} error={!!errors.grade}>
              {errors.grade?.message}
            </FormHelperText>
          </FormControl> */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="이름"
            name="name"
            sx={{ gridColumn: 'span 4' }}
            {...register('name', {
              required: '이름은 반드시 입력되어야 합니다.',
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

export default PastorSave;
