import { Component } from '@angular/core';
import { SearchMode } from 'src/app/modules/querybuilder/components/querybuilder-editor/search/search-input/search-input.component';
import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'num-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  searchMode: SearchMode = 'text';

  positions: ConnectedPosition[] = [];

  search = '';

  isOverlayOpen = false;

  switchSearchMode(): void {
    this.searchMode = this.searchMode === 'tree' ? 'text' : 'tree';
    if (this.searchMode === 'tree') {
      this.isOverlayOpen = true;
    } else {
      this.isOverlayOpen = !!this.search;
    }
  }
}
