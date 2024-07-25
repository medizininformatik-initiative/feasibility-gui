export interface ActionItem {
  /**
   * The function to execute when the button is clicked
   *
   * @returns
   */
  action: () => void

  /**
   * The number displayed in the badge (optional)
   */
  badgeCount?: number

  /**
   * Represents the color of the button
   */
  color: ButtonColor

  /**
   * Whether the action is currently enabled
   */
  isEnabled: boolean

  /**
   * Whether the action is currently visible
   */
  isVisible: boolean

  /**
   * The text to display on the button
   */
  label: string
}

// color.enum.ts
export enum ButtonColor {
  BLUE = 'blue',
  GREEN = 'green',
}
