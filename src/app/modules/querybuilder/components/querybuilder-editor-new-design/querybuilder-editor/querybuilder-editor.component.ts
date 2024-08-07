import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CriteriaStageComponent } from '../stage/criteria-stage.component';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { DataSelectionTreeAdapter } from 'src/app/shared/models/TreeNode/Adapter/DataSelectionProfileTreeAdapter';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileTreeService } from 'src/app/service/DataSelectionService/CreateDataselectionProfileTree';
import { TreeNode } from 'src/app/shared/models/TreeNode/TreeNodeInterface';

@Component({
  selector: 'num-querybuilder-editor',
  templateUrl: './querybuilder-editor.component.html',
  styleUrls: ['./querybuilder-editor.component.scss'],
})
export class QuerybuilderEditorComponent implements OnInit {
  @ViewChild('stage') stage: CriteriaStageComponent;
  @ViewChild('search') search: SearchComponent;

  query: FeasibilityQuery;

  constructor(public queryService: FeasibilityQueryProviderService) {}

  ngOnInit(): void {
    this.queryService.getFeasibilityQueryByID().subscribe((query) => {
      this.query = query.get('1');
    });
  }

  scroll() {
    if (this.stage) {
      const element = this.stage.elementRef.nativeElement;
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
