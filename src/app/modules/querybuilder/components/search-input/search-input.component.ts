import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay'
import { CritType } from '../../model/api/query/group'
import { MatFormField } from '@angular/material/form-field'

@Component({
  selector: 'num-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  @Input()
  critType: CritType = 'inclusion'

  value = ''
  isTreeViewOpen = false

  positions: ConnectedPosition[] = []

  @ViewChild(MatFormField, { read: ElementRef, static: true })
  private inputEl: ElementRef

  @ViewChild(CdkConnectedOverlay, { static: true })
  public connectedOverlay: CdkConnectedOverlay

  constructor() {}

  ngOnInit(): void {
    let positionVertical
    if (this.critType === 'exclusion') {
      positionVertical = 'end'
    } else {
      positionVertical = 'start'
    }

    this.positions = [
      {
        originX: positionVertical,
        originY: 'bottom',
        overlayX: positionVertical,
        overlayY: 'top',
      },
    ]
  }

  getHeaderLabelKey(): string {
    return this.critType.toUpperCase()
  }

  openTreeView($event: MouseEvent): void {
    this.isTreeViewOpen = true
  }

  closeOverlay(): void {
    this.isTreeViewOpen = false
  }
}
