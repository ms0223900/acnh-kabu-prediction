import { ChangeEvent, useState, useCallback } from "react";
import { InputNameValue } from "common-types";

function changeForm(e: ChangeEvent<HTMLInputElement>) {
  return function<Form extends InputNameValue>(form: Form) {
    console.log(e.target);
    const { id, value } = e.target;
    const nameValue = form[id];
    const error = nameValue.validateFn && nameValue.validateFn(value);
    const message = nameValue.getMessageFn && nameValue.getMessageFn(value);

    return ({
      ...form,
      [id]: {
        ...nameValue,
        value,
        error,
        message,
      }
    });
  };
}

function useForm<Form extends InputNameValue>(initForm: Form) {
  const [form, setForm] = useState<Form>(initForm);

  const handleChangeForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm(changeForm(e));
  }, []);

  return ({
    form,
    handleChangeForm,
  });
};

export default useForm;