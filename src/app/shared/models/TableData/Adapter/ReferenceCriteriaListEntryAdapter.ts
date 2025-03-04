import { InterfaceTableDataBody } from '../InterfaceTableDataBody';
import { InterfaceTableDataHeader } from '../InterfaceTableDataHeader';
import { InterfaceTableDataRow } from '../InterfaceTableDataRows';
import { ReferenceCriteriaListEntry } from '../../ListEntries/ReferenceCriteriaListEntry';
import { TableData } from '../InterfaceTableData';
import { TerminologySystemDictionary } from 'src/app/model/Utilities/TerminologySystemDictionary';

export class ReferenceCriteriaListEntryAdapter {
  private static headers: InterfaceTableDataHeader = {
    headers: ['Name', 'Terminology'],
  };

  public static adapt(listEntries: ReferenceCriteriaListEntry[]): TableData {
    const rows: InterfaceTableDataRow[] = listEntries.map((listEntry) => ({
      id: listEntry.getId(),
      data: [
        listEntry.getDisplay(),
        listEntry.getTerminologyCode().getDisplay(),
        TerminologySystemDictionary.getNameByUrl(listEntry.getTerminologyCode().getSystem()),
      ],
      hasCheckbox: true,
      isCheckboxSelected: false,
      isClickable: false,
      isDisabled: true,
      checkboxColumnIndex: 0,
      originalEntry: listEntry,
    }));

    const body: InterfaceTableDataBody = { rows };

    return { header: ReferenceCriteriaListEntryAdapter.headers, body };
  }
}
