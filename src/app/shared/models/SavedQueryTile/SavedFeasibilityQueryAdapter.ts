import { InterfaceSavedQueryTile } from './InterfaceSavedQueryTile';

export class SavedFeasibilityQueryAdapter {
  public static adapt(savedFeasibilityQuery: any): InterfaceSavedQueryTile {
    return {
      id: savedFeasibilityQuery.id.toString(),
      label: savedFeasibilityQuery.label,
      comment: savedFeasibilityQuery.comment || undefined,
      date: new Date(savedFeasibilityQuery.createdAt).toISOString(),
    };
  }
}
