import { Component, Input, OnInit } from '@angular/core';
import { DataSelectionFilterChipsService } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFilterChips.service';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProfileNode } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfileNode';
import { InterfaceFilterChip } from 'src/app/shared/models/FilterChips/InterfaceFilterChip';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'num-data-selection-boxes',
  templateUrl: './data-selection-boxes.component.html',
  styleUrls: ['./data-selection-boxes.component.scss'],
  providers: [DataSelectionFilterChipsService],
})
export class DataSelectionBoxesComponent implements OnInit {
  @Input()
  profile: DataSelectionProfileProfile;

  $filterChips: Observable<InterfaceFilterChip[]> = of([]);

  constructor(private filterChipsService: DataSelectionFilterChipsService) {}

  ngOnInit(): void {
    this.getFilterChips();
  }

  public getFilterChips() {
    const dataSelectionProfileProfileNode: DataSelectionProfileProfileNode[] =
      this.profile.getFields();
    this.filterChipsService
      .generateFilterChipsFromDataSelectionFields(dataSelectionProfileProfileNode)
      .subscribe((test) => console.log(test));
    this.$filterChips = this.filterChipsService.generateFilterChipsFromDataSelectionFields(
      dataSelectionProfileProfileNode
    );
  }
}
