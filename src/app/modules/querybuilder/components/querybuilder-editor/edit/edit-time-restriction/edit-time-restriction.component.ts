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

  optionEver = TimeRestrictionType.EVER
  optionLatest = TimeRestrictionType.LATEST

  constructor() {}

  ngOnInit(): void {}
}
