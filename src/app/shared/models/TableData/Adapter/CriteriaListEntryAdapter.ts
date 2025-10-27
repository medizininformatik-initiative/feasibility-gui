import { CriteriaListEntry } from '../../../../model/Search/ListEntries/CriteriaListListEntry';
import { InterfaceTableDataBody } from '../InterfaceTableDataBody';
import { InterfaceTableDataHeader } from '../InterfaceTableDataHeader';
import { InterfaceTableDataRow } from '../InterfaceTableDataRows';
import { TableData } from '../InterfaceTableData';
import { TerminologySystemDictionary } from 'src/app/model/Utilities/TerminologySystemDictionary';

export class CriteriaListEntryAdapter {
  private static headers: InterfaceTableDataHeader = {
    headers: ['NAME', 'AVAILABILITY', 'TERMINOLOGY_CODE', 'TERMCODE', 'CONTEXT'],
  };

  public static adapt(listEntries: CriteriaListEntry[]): TableData {
    const rows: InterfaceTableDataRow[] = listEntries.map((listEntry: CriteriaListEntry) => ({
      id: listEntry.getId(),
      data: [
        listEntry.getDisplay(),
        CriteriaListEntryAdapter.changeAvailabilityDisplay(listEntry.getAvailability()),
        TerminologySystemDictionary.getNameByUrl(listEntry.getTerminology()),
        listEntry.getTermcode(),
        listEntry.getContext(),
      ],
      hasCheckbox: true,
      treeIcon: 'sitemap',
      treeIconColumnIndex: 0,
      isCheckboxSelected: false,
      isClickable: true,
      isDisabled: listEntry.getSelectable(),
      checkboxColumnIndex: 0,
      originalEntry: listEntry,
    }));

    const body: InterfaceTableDataBody = { rows };

    return { header: CriteriaListEntryAdapter.headers, body };
  }

  /**
   * Transforms the availability value for display purposes.
   * @param availability The availability value to transform.
   * @returns The transformed availability value as a string.
   */
  private static changeAvailabilityDisplay(availability: number): string {
    if (availability === 0) {
      return '?';
    }

    return availability.toString();
  }
}
