import { Component, OnInit } from '@angular/core';
import { TabTitleService } from './service/TabTitle.service';
import { TerminologySystemProvider } from './service/Provider/TerminologySystemProvider.service';

@Component({
  selector: 'num-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'num-portal-webapp';
  constructor(
    private tabTitleService: TabTitleService,
    private terminologyService: TerminologySystemProvider
  ) {}

  ngOnInit() {
    //this.tabTitleService.initializeTitleListener();
  }
}
