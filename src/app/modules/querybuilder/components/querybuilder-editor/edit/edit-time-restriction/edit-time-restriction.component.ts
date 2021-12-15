import { Component, Input, OnInit } from '@angular/core'
import { TimeRestriction, TimeRestrictionType } from '../../../../model/api/query/timerestriction'
import { MAT_DATE_FORMATS } from '@angular/material/core'

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  selector: 'num-edit-time-restriction',
  templateUrl: './edit-time-restriction.component.html',
  styleUrls: ['./edit-time-restriction.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class EditTimeRestrictionComponent implements OnInit {
  @Input()
  timeRestriction: TimeRestriction

  timeRestrictionOptions = Object.keys(TimeRestrictionType)
  timeRestrictionType: typeof TimeRestrictionType = TimeRestrictionType

  constructor() {}

  ngOnInit(): void {}
}
