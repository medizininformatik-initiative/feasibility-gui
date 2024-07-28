import { DataSelectionProfileProfileFilter } from './DataSelectionProfileProfileFilter';
import { DataSelectionProfileProfileNode } from './DataSelectionProfileProfileNode';

export class DataSelectionProfileProfile {
  url: string;
  display: string;
  fields: DataSelectionProfileProfileNode[] = [];
  filters: DataSelectionProfileProfileFilter[] = [];
}
