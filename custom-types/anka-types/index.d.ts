declare module 'anka-types' {
  type ID = string | number
  type ankaElementTypesString = 'dice' | 'color' | 'floor'
  type ParsedContent = ParsedSingleLineContent[]
  type MesType = 'ankaElement' | 'message'
  export type ParsedMessage_element = {
    mesType: 'ankaElement'
    type: ankaElementTypesString
    number: number
  }
  export type ParsedMessage_message = {
    mesType: 'message'
    message: string
  }
  export type ParsedSingleLineContent = (ParsedMessage_element | ParsedMessage_message)[]

  export type UserInfo = {
    id?: ID
    username: string | undefined | null
  }
  export type BasiceMessageDataPayload = {
    userId: ID
    username: string
    content: string
  }
  export type BasicMessage = {
    id: ID
    userId: ID
    username: string
    created_at: Date | string
  }
  export type SingleMessageData = BasicMessage & {
    content: string
  }
  export type SingleMessage = BasicMessage & {
    content: ParsedSingleLineContent[]
    ankaElements: SingleAnkaElement[]
  }

  export type SingleAnkaElement = {
    type: ankaElementTypesString
    number: number
    [x: string]: any
  }
 
  type SinglePostData = SingleMessageData
  type SinglePost = SingleMessage
}