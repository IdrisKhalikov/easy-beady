import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { ApiRoute } from '../../const';
import { Schema } from 'types/schema';
import { SchemaCreate } from 'types/schema-create';
import { fetchSchemasAction } from './schemas-api-actions';
import { SchemaUpdate } from 'types/schema-update';

export const fetchSchemaAction = createAsyncThunk<Schema, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSchema',
  async (schemaId, { extra: api }) => {
    const { data } = await api.get<Schema>(`${ApiRoute.Schemas}/${schemaId}`);
    return data;
  },
);

export const createSchemaAction = createAsyncThunk<string, SchemaCreate, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/createSchema',
  async (schemaCreate, { dispatch, extra: api }) => {
    const { data } = await api.put<string>(`${ApiRoute.Schemas}`, schemaCreate);
    dispatch(fetchSchemasAction());
    return data;
  },
);

export const updateSchemaAction = createAsyncThunk<string, SchemaUpdate & {id: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/updateSchema',
  async (schemaUpdate, { extra: api }) => {
    const {id, ...schema} = schemaUpdate
    const { data } = await api.post<string>(`${ApiRoute.Schemas}/${schemaUpdate.id}`, schema);
    return data;
  },
);

export const deleteSchemaAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/createSchema',
  async (schemaId, { dispatch, extra: api }) => {
    await api.delete(`${ApiRoute.Schemas}/${schemaId}`);
    dispatch(fetchSchemasAction());
  },
);