export const menuItems = {
  löschen: 'Löschen',
  filterAnwenden: 'Filter anwenden',  
  duplizieren: 'Duplizieren',
  bearbeiten: 'Bearbeiten',
  
}
export type MenuItemKey = keyof typeof menuItems

export type MenuItemValue = (typeof menuItems)[MenuItemKey]
