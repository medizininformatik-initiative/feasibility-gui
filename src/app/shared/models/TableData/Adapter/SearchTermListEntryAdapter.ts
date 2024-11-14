import { InterfaceTableDataBody } from '../InterfaceTableDataBody';
import { InterfaceTableDataHeader } from '../InterfaceTableDataHeader';
import { InterfaceTableDataRow } from '../InterfaceTableDataRows';
import { SearchTermListEntry } from 'src/app/shared/models/ListEntries/SearchTermListEntry';
import { TableData } from '../InterfaceTableData';
import { TerminologyCodeTranslator } from 'src/app/service/Translator/Shared/TerminologyCodeTranslator.service';
import { TerminologySystemDictionary } from 'src/app/model/Utilities/TerminologySystemDictionary';

export class SearchTermListEntryAdapter {
  private static headers: InterfaceTableDataHeader = {
    headers: ['Name', 'Availability', 'Terminology', 'Termcode', 'KONTEXT'],
  };

  public static adapt(listEntries: SearchTermListEntry[]): TableData {
    const rows: InterfaceTableDataRow[] = listEntries.map((listEntry) => ({
      id: listEntry.getId(),
      data: [
        listEntry.getName(),
        listEntry.getAvailability().toString(),
        TerminologySystemDictionary.getNameByUrl(listEntry.getTerminology()),
        listEntry.getTermcode(),
        listEntry.getContext(),
      ],
      hasCheckbox: true,
      isCheckboxSelected: false,
      isClickable: true,
      isDisabled: listEntry.getSelectable(),
      checkboxColumnIndex: 0,
      originalEntry: listEntry,
    }));

    const body: InterfaceTableDataBody = { rows };

    return { header: SearchTermListEntryAdapter.headers, body };
  }
}
