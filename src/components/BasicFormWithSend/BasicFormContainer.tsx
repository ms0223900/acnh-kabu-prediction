import React, { useCallback } from 'react';
import BasicForm from './BasicForm';
import { BasicFormContainerProps } from './types';
import useForm from '../../lib/customHooks/useForm';

const BasicFormContainer = (props: BasicFormContainerProps) => {
  const {
    sendFn,
    initInputNameValue
  } = props;

  const {
    form,
    handleChangeForm,
  } = useForm(initInputNameValue);

  const handleSend = useCallback(() => {
    sendFn && sendFn(form);
  }, [form, sendFn]);

  return (
    <BasicForm
      {...props}
      inputNameValue={form}
      changeFormFn={handleChangeForm}
      onSend={handleSend} />
  );
};

export default BasicFormContainer;