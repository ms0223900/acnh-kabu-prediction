import React from 'react';
import { Box, makeStyles, Paper, Typography, TextField, Button } from '@material-ui/core';
import { BasicFormProps } from './types';

const defaultFormName = 'Basic Form';
const defaultSendButtonTitle = 'Send';

const BasicForm = (props: BasicFormProps) => {
  const {
    formName=defaultFormName,
    sendButtonTitle=defaultSendButtonTitle,
    inputNameValue,
    error,
    changeFormFn,
    onSend
  } = props;
  const ids = Object.keys(inputNameValue);

  return (
    <Box>
      <Box>
        <Typography variant={'h6'}>
          {formName}
        </Typography>
      </Box>
      <Box>
        <form>
          {ids.map((id, i) => (
            <Box paddingBottom={1}>
              <TextField 
                key={i}
                id={id}
                type={inputNameValue[id].type}
                label={inputNameValue[id].label}
                variant={'outlined'}
                value={inputNameValue[id].value}
                onChange={changeFormFn} />
              <Box>
                <Typography variant={'body1'}>
                  {inputNameValue[id].message}
                </Typography>
                <Typography color={'error'} variant={'body1'}>
                  {inputNameValue[id].error}
                </Typography>
              </Box>
            </Box>
          ))}
        </form>
      </Box>
      <Button color={'primary'} variant={'contained'} onClick={ onSend }>
        {sendButtonTitle}
      </Button>
      <Typography color={ 'error' }>{ error }</Typography>
    </Box>
  );
};

export default BasicForm;