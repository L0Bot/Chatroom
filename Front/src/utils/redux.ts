import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '../store';

// eslint-disable-next-line import/prefer-default-export
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
}>();
