import { Component, Input, OnInit } from '@angular/core';
import { DataSelectionFilterChipsService } from 'src/app/shared/service/FilterChips/DataSelection/DataSelectionFilterChips.service';
import { DataSelectionProfileProfile } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfile';
import { DataSelectionProfileProfileNode } from 'src/app/model/DataSelection/Profile/DataSelectionProfileProfileNode';
import { InterfaceFilterChip } from 'src/app/shared/models/FilterChips/InterfaceFilterChip';
import { MenuItemInterface } from 'src/app/shared/models/Menu/MenuItemInterface';
import { MenuServiceDataSelection } from 'src/app/shared/service/Menu/DataSelection/MenuServiceDataSelection.service';
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

  menuItems: MenuItemInterface[] = [];

  $filterChips: Observable<InterfaceFilterChip[]> = of([]);

  constructor(
    private filterChipsService: DataSelectionFilterChipsService,
    private menuService: MenuServiceDataSelection
  ) {}

  ngOnInit(): void {
    this.getFilterChips();
    this.getMenuItems();
  }

  public getFilterChips(): void {
    const profileNodes = this.getProfileNodes();
    this.generateAndStoreFilterChips(profileNodes);
  }

  private getProfileNodes(): DataSelectionProfileProfileNode[] {
    return this.profile.getFields();
  }

  private generateAndStoreFilterChips(profileNodes: DataSelectionProfileProfileNode[]): void {
    this.$filterChips =
      this.filterChipsService.generateFilterChipsFromDataSelectionFields(profileNodes);
  }

  private getMenuItems() {
    this.menuItems = this.menuService.getMenuItemsForDataSelection();
  }
}
