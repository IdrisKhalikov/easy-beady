import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { SchemasData } from '../../../types/state';
import { fetchSchemasAction } from '../../api-actions/schemas-api-actions';
import { createSchemaAction, fetchSchemaAction } from '../../api-actions/schema-api-actions';

const initialState: SchemasData = {
  schemas: [],
  isSchemasLoading: false
};

export const schemasData = createSlice({
  name: NameSpace.Schemas,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSchemasAction.pending, (state) => {
      state.isSchemasLoading = true;
    });
    builder.addCase(fetchSchemasAction.fulfilled, (state, action) => {
      state.schemas = action.payload;
      state.isSchemasLoading = false;
    });
    builder.addCase(fetchSchemasAction.rejected, (state) => {
      state.isSchemasLoading = false;
    });
    builder.addCase(fetchSchemaAction.fulfilled, (state, action) => {
      const updatedOffer = action.payload;
      const index = state.schemas.findIndex((schema) => schema.schemaId === updatedOffer.info.schemaId);
      if (index !== -1) {
        state.schemas[index] = updatedOffer.info;
      }
    });
  }
});
