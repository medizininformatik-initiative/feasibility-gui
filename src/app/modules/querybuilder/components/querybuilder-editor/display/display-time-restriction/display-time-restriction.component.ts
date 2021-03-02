import { Component, Input, OnInit } from '@angular/core'
import { TimeRestriction, TimeRestrictionType } from '../../../../model/api/query/timerestriction'
// @ts-ignore
import moment from 'moment'

@Component({
  selector: 'num-display-time-restriction',
  templateUrl: './display-time-restriction.component.html',
  styleUrls: ['./display-time-restriction.component.scss'],
})
export class DisplayTimeRestrictionComponent implements OnInit {
  @Input()
  timeRestriction: TimeRestriction

  readonly typeLatest = TimeRestrictionType.LATEST

  constructor() {}

  ngOnInit(): void {}

  getTranslationKeyInterval(): string {
    if (this.timeRestriction.minDate && this.timeRestriction.maxDate) {
      return 'BOTH'
    }
    if (this.timeRestriction.minDate) {
      return 'FROM'
    }
    if (this.timeRestriction.maxDate) {
      return 'TO'
    }

    return 'NONE'
  }

  getDateFormatted(date: Date): string {
    return date ? moment(date).format('DD.MM.YYYY') : ''
  }
}
