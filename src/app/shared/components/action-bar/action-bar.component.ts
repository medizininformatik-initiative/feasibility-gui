import { Component, Input } from '@angular/core';
import { ActionItem, ButtonColor } from '../../models/ActionBar/InterfaceActionBar';
import { ActionBarState } from '../../models/ActionBar/InterfaceActionBarState';

@Component({
  selector: 'num-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent {
  @Input() state: ActionBarState = {
    selectedItemsCount: 0,
    actionItems: [
      {
        label: 'Add to stage',
        action: () => this.addToStage(),
        isVisible: true,
        isEnabled: true,
        badgeCount: 0,
        color: ButtonColor.BLUE,
      },
      {
        label: 'View stage',
        action: () => this.viewStage(),
        isVisible: true,
        isEnabled: false,
        badgeCount: 0,
        color: ButtonColor.BLUE,
      },
    ],
  };

  // Example method to handle adding items to a stage
  addToStage() {
    console.log('Adding to stage');
    // Update logic here, such as incrementing the selectedItemsCount
    this.state.selectedItemsCount++;
    this.updateBadgeCounts();
  }

  // Example method to handle viewing a stage
  viewStage() {
    console.log('Viewing stage');
    // View stage logic
  }

  // Method to update the badge counts
  updateBadgeCounts() {
    this.state.actionItems.forEach((item) => {
      if (item.badgeCount !== undefined) {
        item.badgeCount = this.state.selectedItemsCount;
      }
    });
  }
}
