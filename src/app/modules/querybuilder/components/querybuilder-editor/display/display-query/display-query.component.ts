import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { Query } from '../../../../model/api/query/query'
import { CritGroupArranger } from '../../../../controller/CritGroupArranger'
import { Group } from '../../../../model/api/query/group'
import { GroupFactory } from '../../../../controller/GroupFactory'
import { FeatureService } from '../../../../../../service/feature.service'
import { ObjectHelper } from '../../../../controller/ObjectHelper'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'
import { Subscription } from 'rxjs'

@Component({
  selector: 'num-display-query',
  templateUrl: './display-query.component.html',
  styleUrls: ['./display-query.component.scss'],
})
export class DisplayQueryComponent implements OnInit, OnDestroy {
  @Input()
  query: Query

  constructor(
    public featureService: FeatureService,
    private snackBar: MatSnackBar,
    private translation: TranslateService
  ) {}

  @Output()
  storeQuery = new EventEmitter<Query>()

  subscriptionTranslation: Subscription

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  doDrop($event: any): void {
    if ($event.addMode === 'position') {
      this.query.groups = CritGroupArranger.moveCriterion(this.query.groups, $event.from, $event.to)
    } else if ($event.addMode === 'end') {
      this.query.groups = CritGroupArranger.moveCriterionToEndOfGroup(
        this.query.groups,
        $event.from,
        $event.to
      )
    }

    this.doStoreQuery(this.query)
  }

  doStoreQuery(query: Query): void {
    this.storeQuery.emit(query)
  }

  doSaveGroup(group: Group): void {
    const index = this.query.groups.findIndex((groupTemp) => groupTemp.id === group.id)

    if (index >= 0) {
      this.query.groups[index] = group
      this.storeQuery.emit(this.query)
    }
  }

  addGroup(): void {
    this.query.groups.push(GroupFactory.createGroup(this.query))

    this.storeQuery.emit(this.query)
  }

  doMoveDown(i: number): void {
    const groupsTemp = ObjectHelper.clone(this.query.groups)
    const a = this.findIndexOfNextGroupWithoutConnectedParent(i)
    if (a >= groupsTemp.length) {
      this.showHintNotMoved()
      return
    }

    const b = this.findIndexOfNextGroupWithoutConnectedParent(a)
    if (b > groupsTemp.length) {
      this.showHintNotMoved()
      return
    }

    const groupsToBeMoved = groupsTemp.splice(i, a - i)
    groupsTemp.splice(i + (b - a), 0, ...groupsToBeMoved)

    this.query.groups = groupsTemp
  }

  doMoveUp(i: number): void {
    if (i <= 0) {
      this.showHintNotMoved()
      return
    }

    const groupsTemp = ObjectHelper.clone(this.query.groups)
    const a = this.findIndexOfPreviousGroupWithoutConnectedParent(i)
    const b = this.findIndexOfNextGroupWithoutConnectedParent(i)

    const groupsToBeMoved = groupsTemp.splice(i, b - i)
    groupsTemp.splice(a, 0, ...groupsToBeMoved)

    this.query.groups = groupsTemp
  }

  private showHintNotMoved(): void {
    this.subscriptionTranslation?.unsubscribe()
    this.subscriptionTranslation = this.translation
      .get('QUERYBUILDER.DISPLAY.GROUPS.HINT_NOT_MOVED')
      .subscribe((text) => {
        this.snackBar.open(text, '', { duration: 2000 })
      })
  }

  findIndexOfNextGroupWithoutConnectedParent(a: number): number {
    let b = a
    while (b <= this.query.groups.length) {
      b++
      if (!this.hasConnectedParent(b)) {
        return b
      }
    }

    return this.query.groups.length
  }

  findIndexOfPreviousGroupWithoutConnectedParent(b: number): number {
    let a = b
    while (a > 0) {
      a--
      if (!this.hasConnectedParent(a)) {
        return a
      }
    }

    return 0
  }

  hasConnectedParent(b: number): boolean {
    if (b >= this.query.groups.length || b < 0) {
      return true
    }
    return this.query.groups[b].dependencyInfo && this.query.groups[b].dependencyInfo.linked
  }

  getParentGroup(i: number): Group | null {
    if (this.query.groups[i].dependencyInfo?.linked && i > 0) {
      return this.query.groups[i - 1]
    } else {
      return null
    }
  }

  getGroups(): Group[] {
    if (!this.featureService.useFeatureMultipleGroups() && this.query.groups.length > 0) {
      return [this.query.groups[0]]
    }
    return this.query.groups
  }
}
