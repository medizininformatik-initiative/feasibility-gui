import { Component, Input, OnInit } from '@angular/core'
import { TimeRestriction, TimeRestrictionType } from '../../../../model/api/query/timerestriction'

@Component({
  selector: 'num-edit-time-restriction',
  templateUrl: './edit-time-restriction.component.html',
  styleUrls: ['./edit-time-restriction.component.scss'],
})
export class EditTimeRestrictionComponent implements OnInit {
  @Input()
  timeRestriction: TimeRestriction

  timeRestrictionOptions = Object.keys(TimeRestrictionType)
  timeRestrictionType: typeof TimeRestrictionType = TimeRestrictionType

  constructor() {}

  ngOnInit(): void {}
}
