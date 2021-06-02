export interface IApiState {
  loading: boolean;
  success: boolean;
  error: Error | null;
}

export const defaultApiState: IApiState = {
  loading: false,
  success: false,
  error: null,
};
