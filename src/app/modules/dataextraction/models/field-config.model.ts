export interface FilterFieldBase {
  field: string
  type: string
  label: string
  path: string
}

export interface FhirPathField {
  path: string
  mandatory: boolean
  preselected: boolean
  label: string
  type: string
  info: string
  hidden?: boolean
}

interface DateFilterField extends FilterFieldBase {
  type: 'date'
}

interface CodingFilterFiled extends FilterFieldBase {
  type: 'coding'
  valueSetUrls: [url: string]
}

interface TextFilterField extends FilterFieldBase {
  type: 'text'
}

type FilterField = DateFilterField | CodingFilterFiled | TextFilterField;

export interface ProfileFormConfigs {
  [profile: string]: { filter: FilterField[]; paths: FhirPathField[] }
}
