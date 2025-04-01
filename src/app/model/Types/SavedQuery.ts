import { InterfaceSavedQueryTile } from 'src/app/shared/models/SavedQueryTile/InterfaceSavedQueryTile';
import { SavedQueryCategories } from './SavedQueryCategories';

export type SavedQueryType = {
  title: SavedQueryCategories
  length: number
  data: InterfaceSavedQueryTile[]
};
