import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../../const';
import { SchemaPreview } from 'types/schema-preview';

export const fetchSchemasAction = createAsyncThunk<SchemaPreview[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSchemas',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<SchemaPreview[]>(ApiRoute.Schemas);
    return data;
  },
);
