import { AfterViewInit, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'num-filter-tabs',
  templateUrl: './filter-tabs.component.html',
  styleUrls: ['./filter-tabs.component.scss'],
})
export class FilterTabsComponent implements AfterViewInit {
  @Input()
  content: TemplateRef<any>[];
  constructor() {}

  ngAfterViewInit() {
    console.log('FilterTabsComponent AfterViewInit with content:', this.content);
  }
}
