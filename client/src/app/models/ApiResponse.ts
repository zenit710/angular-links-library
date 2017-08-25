export enum API_STATUS_CODE {
  OK = 0,
  ERROR = 1
}

export interface ApiResponse
{
  statusCode: number,
  errors?: any,
  result?: any
}
