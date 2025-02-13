export interface AttributeDefinition {
  display: string
  type: string
  selectableConcepts: any[] // Adjust type if needed
  attributeCode: string
  optional: boolean
  allowedUnits: any[] // Adjust type if needed
  precision: number
  referencedCriteriaSet?: string
  referencedValueSet?: string
}
