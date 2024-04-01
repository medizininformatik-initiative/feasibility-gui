import { Query } from 'src/app/model/FeasibilityQuery/Query';
import {
  Group,
  GroupDependencyInfo,
  InstanceRestrictionType,
  PeriodUnit,
  TimeRelation,
} from 'src/app/model/FeasibilityQuery/Group';

export class GroupFactory {
  public static createGroup(query: Query): Group {
    const group = new Group();

    const ids = query.groups.map((groupTemp) => groupTemp.id);
    let newId = 1;
    while (ids.findIndex((id) => id === newId) >= 0) {
      newId++;
    }

    group.id = newId;
    group.display = 'Ausgewählte Merkmale';

    return group;
  }

  static createGroupDependencyInfo(): GroupDependencyInfo {
    return {
      linked: false,
      restrictionType: InstanceRestrictionType.EVERY,
      dependentGroupRestrictionType: InstanceRestrictionType.EVERY,

      atMostEarlierThanRelatedGroup: 0,
      atMostLaterThanRelatedGroup: 0,

      atMostEarlierThanRelatedGroupTimeRelation: TimeRelation.BEFORE,
      atMostLaterThanRelatedGroupTimeRelation: TimeRelation.AFTER,

      atMostLaterThanRelatedGroupUnit: PeriodUnit.DAY,
      atMostEarlierThanRelatedGroupUnit: PeriodUnit.DAY,
    };
  }
}
