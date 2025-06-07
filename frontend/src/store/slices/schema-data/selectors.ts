import { Schema } from 'types/schema';
import { NameSpace } from '../../../const';
import { State } from '../../../types/state';

export const getSchema = (state: State): Schema | null => state[NameSpace.Schema].schema;

export const getIsSchemaLoading = (state: State): boolean => state[NameSpace.Schema].isSchemaLoading;

export const getHasFailedToSchema = (state: State): boolean => state[NameSpace.Schema].hasError;
