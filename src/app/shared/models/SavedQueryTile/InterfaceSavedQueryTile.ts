import { SavedQueryCategories } from 'src/app/model/Types/SavedQueryCategories';

export interface InterfaceSavedQueryTile {
  id: string
  label: string
  totalNumberOfPatients?: number
  comment?: string
  date: string
  type: SavedQueryCategories
}
