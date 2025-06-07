import { createSlice } from '@reduxjs/toolkit';
import { SchemaData } from '../../../types/state';
import { NameSpace } from '../../../const';
import { fetchSchemaAction} from '../../api-actions/schema-api-actions';
import { logoutAction } from '../../api-actions/user-api-actions';

const initialState: SchemaData = {
  schema: null,
  isSchemaLoading: false,
  hasError: false
};

export const offerData = createSlice({
  name: NameSpace.Schema,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSchemaAction.pending, (state) => {
      state.isSchemaLoading = true;
    });
    builder.addCase(fetchSchemaAction.fulfilled, (state, action) => {
      state.schema = action.payload;
      state.hasError = false;
      state.isSchemaLoading = false;
    });
    builder.addCase(fetchSchemaAction.rejected, (state) => {
      state.isSchemaLoading = false;
      state.hasError = true;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.schema = null;
    });
  }
});
