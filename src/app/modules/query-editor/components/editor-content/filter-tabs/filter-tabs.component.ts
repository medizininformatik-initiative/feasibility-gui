import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'num-filter-tabs',
  templateUrl: './filter-tabs.component.html',
  styleUrls: ['./filter-tabs.component.scss'],
})
export class FilterTabsComponent {
  @Input()
  content: { template: TemplateRef<any>; name: string }[];

  constructor() {}
}
