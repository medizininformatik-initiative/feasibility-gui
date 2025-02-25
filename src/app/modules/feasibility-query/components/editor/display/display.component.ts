/* eslint-disable */
import { Component, Input, OnInit } from '@angular/core'
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion'
import { HtmlToImageService } from 'src/app/service/HtmlToImage.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'num-display-feasibility-query',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayFeasibilityQueryComponent implements OnInit {
  droppedItems: Criterion[] = []
  groupType: 'Inclusion' | 'Exclusion'
  querySubscription: Subscription

  @Input() isEditable: boolean

  constructor(private htmlToImageService: HtmlToImageService) {}

  ngOnInit() {}

  render(): void {
    const node = document.getElementById('renderCriteria')
    this.htmlToImageService.toBlob(node)
  }
}
