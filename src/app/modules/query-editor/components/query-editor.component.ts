import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from 'src/app/service/Provider/CriterionProvider.service';
import { DataSelectionProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfile';
import { Observable, of } from 'rxjs';
import { ProfileProviderService } from '../../data-selection/services/ProfileProvider.service';

@Component({
  selector: 'num-query-editor',
  templateUrl: './query-editor.component.html',
  styleUrls: ['./query-editor.component.scss'],
})
export class QueryEditorComponent implements OnInit {
  currentUrl = '';

  criterion$: Observable<Criterion>;

  profile$: Observable<DataSelectionProfile>;

  id: string;

  type: string;

  constructor(
    private profileProviderService: ProfileProviderService,
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
    this.profile$ = of(this.profileProviderService.getProfileById(id));
  }
}
