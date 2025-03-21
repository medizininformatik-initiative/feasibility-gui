import { InterfaceSavedQueryTile } from './InterfaceSavedQueryTile';
import { SavedDataQueryListItem } from 'src/app/model/SavedDataQuery/SavedDataQueryListItem';

export class SavedFeasibilityQueryAdapter {
  public static adapt(savedFeasibilityQuery: SavedDataQueryListItem): InterfaceSavedQueryTile {
    return {
      comment: savedFeasibilityQuery.getComment() || undefined,
      id: savedFeasibilityQuery.getId().toString(),
      date: savedFeasibilityQuery.getCreatedAt(),
      label: savedFeasibilityQuery.getLabel(),
      totalNumberOfPatients: savedFeasibilityQuery.getTotalNumberOfResults(),
    };
  }
}
