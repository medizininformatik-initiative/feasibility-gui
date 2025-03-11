import { InterfaceSavedQueryTile } from './InterfaceSavedQueryTile';
import { SavedDataQueryListItem } from 'src/app/model/SavedDataQuery/SavedDataQueryListItem';

export class SavedFeasibilityQueryAdapter {
  public static adapt(savedFeasibilityQuery: SavedDataQueryListItem): InterfaceSavedQueryTile {
    return {
      comment: savedFeasibilityQuery.getComment() || undefined,
      date: savedFeasibilityQuery.getCreatedAt(),
      id: savedFeasibilityQuery.getId(),
      label: savedFeasibilityQuery.getLabel(),
      totalNumberOfPatients: savedFeasibilityQuery.getTotalNumberOfResults(),
    };
  }
}
