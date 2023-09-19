import { Criterion } from '../model/api/query/criterion';
import { CritType, Group } from '../model/api/query/group';

export class CritGroupArranger {
  public static splitInnerArray(critGroup: Criterion[][], i: number, j: number): Criterion[][] {
    const critGroupTemp: Criterion[][] = [];

    let index = 0;
    critGroup.forEach((subarray) => {
      if (index === i) {
        critGroupTemp.push(subarray.slice(0, j + 1));
        critGroupTemp.push(subarray.slice(j + 1));
      } else {
        critGroupTemp.push(subarray);
      }
      index++;
    });

    return critGroupTemp;
  }

  public static joinInnerArrays(critGroup: Criterion[][], i: number): Criterion[][] {
    const critGroupTemp: Criterion[][] = [];

    let index = 0;
    let subarrayTemp;
    critGroup.forEach((subarray) => {
      if (index === i) {
        subarrayTemp = subarray;
      } else if (index === i + 1) {
        critGroupTemp.push(subarrayTemp.concat(subarray));
      } else {
        critGroupTemp.push(subarray);
      }
      index++;
    });

    return critGroupTemp;
  }

  public static addCriterion(
    groups: Group[],
    position: CritGroupPosition,
    criterion: Criterion
  ): Group[] {
    const groupsTemp: Group[] = [];

    groups.forEach((group) => {
      if (group.id !== position.groupId) {
        groupsTemp.push(group);
      } else {
        groupsTemp.push(CritGroupArranger.addToGroup(group, position, criterion));
      }
    });

    return groupsTemp;
  }

  public static addCriterionToEndOfGroup(
    groups: Group[],
    position: CritGroupPosition,
    criterion: Criterion
  ): Group[] {
    const groupsTemp: Group[] = [];

    groups.forEach((group) => {
      if (group.id === position.groupId) {
        if (position.critType === 'inclusion') {
          group.inclusionCriteria.push([criterion]);
        } else if (position.critType === 'exclusion') {
          group.exclusionCriteria.push([criterion]);
        }
      }
      groupsTemp.push(group);
    });

    return groupsTemp;
  }

  private static addToGroup(
    group: Group,
    position: CritGroupPosition,
    criterion: Criterion
  ): Group {
    const groupTemp: Group = JSON.parse(JSON.stringify(group));
    if (position.critType === 'inclusion') {
      groupTemp.inclusionCriteria[position.row] = group.inclusionCriteria[position.row].slice(
        0,
        position.column
      );
      groupTemp.inclusionCriteria[position.row].push(criterion);
      groupTemp.inclusionCriteria[position.row].push(
        ...group.inclusionCriteria[position.row].slice(position.column)
      );

      groupTemp.exclusionCriteria = group.exclusionCriteria;
    } else if (position.critType === 'exclusion') {
      groupTemp.exclusionCriteria[position.row] = group.exclusionCriteria[position.row].slice(
        0,
        position.column
      );
      groupTemp.exclusionCriteria[position.row].push(criterion);
      groupTemp.exclusionCriteria[position.row].push(
        ...group.exclusionCriteria[position.row].slice(position.column)
      );

      groupTemp.inclusionCriteria = group.inclusionCriteria;
    }

    return groupTemp;
  }

  public static removeCriterion(groups: Group[], position: CritGroupPosition): Group[] {
    const groupsTemp: Group[] = [];

    groups.forEach((group) => {
      if (group.id !== position.groupId) {
        groupsTemp.push(group);
      } else {
        groupsTemp.push(CritGroupArranger.removeFromGroup(group, position, 'move'));
      }
    });

    return groupsTemp;
  }

  public static removeFromGroup(group: Group, position: CritGroupPosition, modus: string): Group {
    let groupTemp: Group = JSON.parse(JSON.stringify(group));
    const uids: string[] = [];

    if (position.critType === 'inclusion') {
      if (groupTemp.inclusionCriteria[position.row][position.column].linkedCriteria.length > 0) {
        groupTemp.inclusionCriteria[position.row][position.column].linkedCriteria.forEach(
          (linkedCriterion) => {
            uids.push(linkedCriterion.uniqueID);
          }
        );
      }
      if (groupTemp.inclusionCriteria[position.row].length === 1) {
        groupTemp.inclusionCriteria.splice(position.row, 1);
      } else {
        groupTemp.inclusionCriteria[position.row].splice(position.column, 1);
      }
    } else if (position.critType === 'exclusion') {
      if (groupTemp.exclusionCriteria[position.row][position.column].linkedCriteria.length > 0) {
        groupTemp.exclusionCriteria[position.row][position.column].linkedCriteria.forEach(
          (linkedCriterion) => {
            uids.push(linkedCriterion.uniqueID);
          }
        );
      }
      if (groupTemp.exclusionCriteria[position.row].length === 1) {
        groupTemp.exclusionCriteria.splice(position.row, 1);
      } else {
        groupTemp.exclusionCriteria[position.row].splice(position.column, 1);
      }
    }

    uids.forEach((uid) => {
      if (modus === 'delete' && !this.isCriterionLinked(groupTemp, uid)) {
        groupTemp = this.removeFromGroup(
          groupTemp,
          this.findCriterionByUID(groupTemp, uid).position,
          'delete'
        );
      }
    });
    return groupTemp;
  }

  public static findCriterionByUID(group: Group, uid: string): Criterion {
    const groupTemp: Group = JSON.parse(JSON.stringify(group));
    let tempCrit: Criterion;

    for (const inex of ['inclusion', 'exclusion']) {
      groupTemp[inex + 'Criteria'].forEach((disj) => {
        disj.forEach((conj) => {
          if (conj.uniqueID === uid) {
            tempCrit = conj;
          }
        });
      });
    }
    return tempCrit;
  }

  public static isCriterionLinked(group: Group, uid: string): boolean {
    const groupTemp: Group = JSON.parse(JSON.stringify(group));
    let isLinked = false;

    for (const inex of ['inclusion', 'exclusion']) {
      groupTemp[inex + 'Criteria'].forEach((disj) => {
        disj.forEach((conj) => {
          if (conj.linkedCriteria.length > 0) {
            conj.linkedCriteria.forEach((criterion) => {
              if (criterion.uniqueID === uid) {
                isLinked = true;
              }
            });
          }
        });
      });
    }

    return isLinked;
  }
  public static moveCriterion(
    groups: Group[],
    positionFrom: CritGroupPosition,
    positionTo: CritGroupPosition
  ): Group[] {
    if (JSON.stringify(positionFrom) === JSON.stringify(positionTo)) {
      return groups;
    }

    let groupsResult: Group[] = [];
    let criterion: Criterion;

    groups.forEach((group) => {
      if (group.id === positionFrom.groupId) {
        if (positionFrom.critType === 'inclusion') {
          criterion = group.inclusionCriteria[positionFrom.row][positionFrom.column];
        } else {
          criterion = group.exclusionCriteria[positionFrom.row][positionFrom.column];
        }

        if (
          positionFrom.groupId === positionTo.groupId &&
          positionFrom.critType === positionTo.critType
        ) {
          if (
            (positionTo.critType === 'inclusion' &&
              group.inclusionCriteria[positionFrom.row].length === 1) ||
            (positionTo.critType === 'exclusion' &&
              group.exclusionCriteria[positionFrom.row].length === 1)
          ) {
            if (positionTo.row > positionFrom.row) {
              positionTo.row = positionTo.row - 1;
            }
          }
        }
      }
    });

    if (!criterion) {
      return groups;
    }

    groupsResult = CritGroupArranger.removeCriterion(groups, positionFrom);
    groupsResult = CritGroupArranger.addCriterion(groupsResult, positionTo, criterion);

    return groupsResult;
  }

  public static moveCriterionToEndOfGroup(
    groups: Group[],
    positionFrom: CritGroupPosition,
    positionTo: CritGroupPosition
  ): Group[] {
    let groupsResult: Group[] = [];
    let criterion: Criterion;

    groups.forEach((group) => {
      if (group.id === positionFrom.groupId) {
        if (positionFrom.critType === 'inclusion') {
          criterion = group.inclusionCriteria[positionFrom.row][positionFrom.column];
        } else {
          criterion = group.exclusionCriteria[positionFrom.row][positionFrom.column];
        }
      }
    });

    if (!criterion) {
      return groups;
    }

    groupsResult = CritGroupArranger.removeCriterion(groups, positionFrom);
    groupsResult = CritGroupArranger.addCriterionToEndOfGroup(groupsResult, positionTo, criterion);

    return groupsResult;
  }
}

export class CritGroupPosition {
  groupId: number;
  critType: CritType;
  row: number;
  column: number;
}
