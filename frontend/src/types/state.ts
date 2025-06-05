import { store } from '../store/index.js';
import { SchemaPreview } from './schema-preview.js';
import { Schema } from './schema.js';
import { User, AuthorizationStatus} from './user.js';

export type UserData = {
  user: User | null;
  authorizationStatus: AuthorizationStatus;
  isAuthBeingChecked: boolean;
}

export type SchemasData = {
  schemas: SchemaPreview[];
  isSchemasLoading: boolean;
}

export type SchemaData = {
  schema: Schema | null;
  isSchemaLoading: boolean;
  hasError: boolean;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;