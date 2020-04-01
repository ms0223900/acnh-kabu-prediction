declare module 'common-types' {
  import { ChangeEvent } from "react";
  
  export type HOC<InjectProps> = <Props>(Component: React.ComponentType<Props & InjectProps>) => React.ComponentType<Props & InjectProps>
  
  type ID = string | number

  type Callback = (...args: any[]) => any
  type ChangeFn = (e: ChangeEvent<HTMLInputElement>) => any

  export type Action = {
    type: string
    payload: any
  }

  export type SingleMeal = {
    id: ID
    name: string
    imgSrc: string
    price: number
    [x: string]: any
  }

  export type UserInfo = {
    id?: ID
    username: string | undefined | null
  }

  interface InputNameValue {
    [id: string]: {
      label: string
      type?: string
      value: string
      error?: string
      message?: string
      getMessageFn?: (val: string) => string | undefined
      validateFn?: (val: string) => any
    }
  }

  type GridRatio = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}