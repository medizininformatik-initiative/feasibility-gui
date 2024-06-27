import { InterfaceTableDataHeader } from 'src/app/model/TableData/InterfaceTableDataHeader';
import { CodeableConceptResultListEntry } from '../CodeableConceptResultListEntry';
import { InterfaceTableDataBody } from 'src/app/model/TableData/InterfaceTableDataBody';
import { TableData } from 'src/app/model/TableData/InterfaceTableData';

export class CodeableConceptLinsEntryAdapter {
  private static headers: InterfaceTableDataHeader = {
    headers: ['ID', 'Terminology Code', 'Display'],
  };

  public static adapt(listEntries: CodeableConceptResultListEntry[]): TableData {
    const body: InterfaceTableDataBody = {
      rows: listEntries.map((entry) => [
        entry.getId(),
        entry.getTerminologyCode().getCode(),
        entry.getTerminologyCode().getDisplay(),
      ]),
    };

    return { header: CodeableConceptLinsEntryAdapter.headers, body };
  }
}
