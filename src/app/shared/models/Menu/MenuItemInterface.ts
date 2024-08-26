export interface MenuItemInterface {
  disabled: boolean
  icon: string
  label: string
  action: (id: string, ...args: any[]) => void
}
