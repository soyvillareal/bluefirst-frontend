export interface BaseSliceState {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error?: string;
}
export interface IErrorCode {
  data?: {
    message: string[] | string;
    error: string;
    statusCode: number;
  };
}
