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
      type: this.setType(savedFeasibilityQuery),
    };
  }

  private static setType(savedQuery: SavedDataQueryListItem) {
    if (savedQuery.getCcdl().exists && !savedQuery.getDataSelection().exists) {
      return 'cohort';
    } else if (savedQuery.getCcdl().exists && savedQuery.getDataSelection().exists) {
      return 'datadefinition';
    }
    return 'dataselection';
  }
}
