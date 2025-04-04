import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProviderService } from '../../data-selection/services/DataSelectionProfileProvider.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'num-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss'],
})
export class QueryEditorComponent implements OnInit {
  currentUrl = '';

  criterion$: Observable<Criterion>;

  profile$: Observable<DataSelectionProfileProfile>;

  id: string;

  type: string;

  constructor(
    private dataSelectionProfileProviderService: DataSelectionProfileProviderService,
    private criterionProviderService: CriterionProviderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const url = this.route.snapshot.url;
      this.type = url[0].path;
      this.id = url[1].path;
    });
  }

  private getProfileFromProviderById(id: string): void {
    this.profile$ = of(this.dataSelectionProfileProviderService.getDataSelectionProfileByUrl(id));
  }
}
