import { InterfaceSavedQueryTile } from './InterfaceSavedQueryTile';

export class SavedFeasibilityQueryAdapter {
  public static adapt(savedFeasibilityQuery: any): InterfaceSavedQueryTile {
    return {
      comment: savedFeasibilityQuery.comment || undefined,
      date: new Date(savedFeasibilityQuery.createdAt).toISOString(),
      id: savedFeasibilityQuery.id.toString(),
      label: savedFeasibilityQuery.label,
      totalNumberOfPatients: savedFeasibilityQuery.totalNumberOfPatients,
    };
  }
}
