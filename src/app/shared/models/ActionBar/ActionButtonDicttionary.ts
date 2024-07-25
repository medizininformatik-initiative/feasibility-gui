import { ActionItem, ButtonColor } from './InterfaceActionBar';

export const BUTTON_CONFIG: { [key: string]: ActionItem } = {
  addToStage: {
    label: 'Add to Stage',
    action: () => {}, // Placeholder for actual action function
    isVisible: true,
    isEnabled: true,
    badgeCount: 0,
    color: ButtonColor.BLUE,
  },
  viewStage: {
    label: 'View Stage',
    action: () => {}, // Placeholder for actual action function
    isVisible: true,
    isEnabled: false,
    badgeCount: undefined,
    color: ButtonColor.GREEN,
  },
  // Add more buttons here
};
