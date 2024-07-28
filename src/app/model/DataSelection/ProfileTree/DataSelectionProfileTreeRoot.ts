import { DataSelectionProfileTreeNode } from './DataSelectionProfileTreeNode';

export class DataSelectionProfileTreeRoot {
  name = 'Root';
  module = 'no-module';
  url = 'no-url';
  children: DataSelectionProfileTreeNode[] = [];
}
