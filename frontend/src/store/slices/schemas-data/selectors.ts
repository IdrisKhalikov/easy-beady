import { SchemaPreview } from 'types/schema-preview';
import { NameSpace } from '../../../const';
import { State } from '../../../types/state';

export const getSchemas = (state: State): SchemaPreview[] => state[NameSpace.Schemas].schemas;

export const getIsSchemasLoading = (state: State): boolean => state[NameSpace.Schemas].isSchemasLoading;
