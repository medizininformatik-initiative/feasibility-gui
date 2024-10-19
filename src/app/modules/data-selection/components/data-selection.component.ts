import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewChild } from '@angular/core';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';
import {DisplaySearchtreeComponent} from "./display-searchtree/display-searchtree.component";
import {DisplayProfilesComponent} from "./display-profiles/display-profiles.component";

@Component({
  selector: 'num-data-selection',
  templateUrl: './data-selection.component.html',
  styleUrls: ['./data-selection.component.scss'],
})
export class DataSelectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ds_tree') ds_tree: DisplaySearchtreeComponent;
  @ViewChild('profiles') profiles: DisplayProfilesComponent;

  showActionBar = true;

  /**
   * @todo     private test1: TerminologySystemProvider, --> TerminologySystemProvider needs to be initial called in the app.moudle.ts
   */
  constructor(
    private test1: TerminologySystemProvider
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {

  }

  ngAfterViewInit() {}


  scroll(event: boolean) {
    this.showActionBar = event;
    if (event) {
      if (this.ds_tree) {
        const element = this.ds_tree.elementRef.nativeElement;
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (this.profiles) {
        const element = this.profiles.elementRef.nativeElement;
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
