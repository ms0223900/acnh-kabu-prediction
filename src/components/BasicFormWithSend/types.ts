import { ChangeFn, Callback, InputNameValue } from 'common-types';

export interface BasicFormProps {
  formName?: string
  sendButtonTitle?: string
  error?: string
  inputNameValue: InputNameValue
  onSend?: Callback
  changeFormFn?: ChangeFn
}

export interface BasicFormContainerProps<FormType extends InputNameValue={}> extends Omit<BasicFormProps, 'inputNameValue'|'onSend'> {
  initInputNameValue: InputNameValue
  sendFn?: (form: FormType) => any
}
