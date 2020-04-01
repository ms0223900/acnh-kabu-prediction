import React, { useCallback, ChangeEvent } from 'react';
import { Box, TextField } from '@material-ui/core';
import { InputItemContainerProps } from '../types';

const InputItemContainer = (props: InputItemContainerProps) => {
  const {
    id,
    value,
    onChange
  } = props;

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if(onChange) {
      const {
        value
      } =  e.target;
      onChange(props, value);
    }
  }, [onChange, props]);

  return (
    <TextField
      {...props}
      type={'number'}
      variant={'standard'}
      onChange={handleChange}
      value={value} />
  );
};

export default InputItemContainer;