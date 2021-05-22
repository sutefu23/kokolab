
export const enum ErrStatus {
  UNPROCESSABLE_ENTITY = 422,// バリデーションエラー
  INTERNAL_SERVER_ERROR = 500// サーバエラー
}

export type Error = {
  readonly status : ErrStatus,
  readonly errorMessage : string
}

export type ErrorResponse = {
  readonly response : Error
}