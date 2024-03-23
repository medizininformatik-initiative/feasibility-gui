export interface ColumnBackBoneElement {
  name: string
  path: string
}

export interface SelectBackBoneElement {
  column: ColumnBackBoneElement[]
}

export interface WhereBackBoneElement {
  path: string
}

export interface ViewDefinition {
  resourceType: string
  resource: string
  status: string
  date: string
  fhirVersion: string
  select: SelectBackBoneElement[]
  where?: WhereBackBoneElement[]
  name?: string
}
