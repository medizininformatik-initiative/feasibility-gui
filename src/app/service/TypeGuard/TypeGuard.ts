import { AnnotatedCRTDLData } from '../../model/Interface/AnnotatedCRTDLData';
import { AttributeCode } from '../../model/Interface/AttributeCode';
import { AttributeDefinitionData } from '../../model/Interface/AttributeDefinitionData';
import { AttributeFilterBaseData } from '../../model/Interface/AttributeFilterBaseData';
import { AttributeFilterData } from '../../model/Interface/AttributeFilterData';
import { AttributeGroupsData } from '../../model/Interface/AttributeGroupsData';
import { AttributesData } from '../../model/Interface/AttributesData';
import { CodeableConceptResult } from '../../model/Interface/CodeableConceptResult';
import { ComparatorTypeData } from '../../model/Interface/ComparatorTypeData';
import { ContextData } from '../../model/Interface/ContextData';
import { CriteriaProfileData } from '../../model/Interface/CriteriaProfileData';
import { CRTDLData } from '../../model/Interface/CRTDLData';
import { DataExtractionData } from '../../model/Interface/DataExtractionData';
import { DisplayData } from '../../model/Interface/DisplayData';
import { FilterData } from '../../model/Interface/FilterData';
import { IssueData } from '../../model/Interface/IssueData';
import { QuantityUnitData } from '../../model/Interface/Unit';
import { QueryResultData } from '../../model/Interface/QueryResultData';
import { QueryResultLineData } from '../../model/Interface/QueryResultLineData';
import { Relations } from '../../model/Interface/Relations';
import { Relatives } from '../../model/Interface/Relatives';
import { SavedDataQueryData } from '../../model/Interface/SavedDataQueryData';
import { SavedDataQueryListItemData } from '../../model/Interface/SavedDataQueryListItemData';
import { SearchResponse } from '../../model/Interface/SearchResponse';
import { SearchResult } from '../../model/Interface/SearchResult';
import { StructuredQueryCriterionData } from '../../model/Interface/StructuredQueryCriterionData';
import { StructuredQueryData } from '../../model/Interface/StructuredQueryData';
import { TerminologyCodeBaseData } from '../../model/Interface/TerminologyBaseData';
import { TerminologyCodeData } from '../../model/Interface/TerminologyCodeData';
import { TimeRestrictionData } from '../../model/Interface/TimeRestrictionData';
import { TranslationData } from '../../model/Interface/TranslationData';
import { UiProfileData } from '../../model/Interface/UiProfileData';
import { ValueDefinitionData } from '../../model/Interface/ValueDefinition';
import { ValueFilterData } from '../../model/Interface/ValueFilterData';

/**
 * Utility class for type guards to ensure objects conform to their respective interfaces.
 */
export class TypeGuard {
  /**
   * Checks if the given object is a string.
   * @param obj
   * @returns boolean
   */
  public static isString(obj: unknown): obj is string {
    return typeof obj === 'string';
  }

  /**
   * Checks if the given object is a number.
   * @param obj
   * @returns boolean
   */
  public static isNumber(obj: unknown): obj is number {
    return typeof obj === 'number';
  }

  /**
   * Checks if the given object is a boolean.
   * @param obj
   * @returns boolean
   */
  public static isBoolean(obj: unknown): obj is boolean {
    return typeof obj === 'boolean';
  }

  /**
   * Checks if the object is an object.
   * @param obj
   * @returns boolean
   */
  public static isObject(obj: unknown): obj is object {
    return typeof obj === 'object' && obj !== null;
  }

  public static isOptionalString(val: unknown): boolean {
    return TypeGuard.isString(val) || val === undefined;
  }

  public static isOptionalNumber(val: unknown): boolean {
    return TypeGuard.isNumber(val) || val === undefined;
  }

  public static isOptionalBoolean(val: unknown): boolean {
    return TypeGuard.isBoolean(val) || val === undefined;
  }

  public static isOptionalObject(val: unknown): boolean {
    return TypeGuard.isObject(val) || val === undefined;
  }

  /**
   * Checks if a value is an array.
   * Optionally, validates each element using a provided type-checking function.
   *
   * @param val - The value to check.
   * @param checkFn - (Optional) A function to validate each element.
   * @returns boolean
   */
  public static isArray<T>(val: unknown, checkFn?: (item: unknown) => boolean): val is T[] {
    if (!Array.isArray(val)) {
      return false;
    }
    return checkFn ? val.every(checkFn) : true;
  }

  /**
   * Checks if a value is an optional array.
   * Optionally, validates each element using a provided type-checking function.
   *
   * @param val - The value to check.
   * @param checkFn - (Optional) A function to validate each element.
   * @returns boolean
   */
  public static isOptionalArray<T>(val: unknown, checkFn?: (item: unknown) => boolean): boolean {
    return val === undefined || this.isArray<T>(val, checkFn);
  }

  private static isOptionalAttributeFilterData(obj: unknown): obj is AttributeFilterData {
    return obj === undefined || TypeGuard.isArray(obj, TypeGuard.isAttributeFilterData);
  }

  /**
   * Checks if the object is an instance of AttributeFilterData.
   * @param obj
   * @returns boolean
   */
  public static isAttributeFilterData(obj: unknown): obj is AttributeFilterData {
    const attributeFilterData = obj as AttributeFilterData;
    return (
      TypeGuard.isObject(obj) &&
      TypeGuard.isOptionalArray(
        attributeFilterData.criteria,
        TypeGuard.isStructuredQueryCriterionData
      ) &&
      TypeGuard.isOptionalSelectedConcepts(attributeFilterData.selectedConcepts) &&
      TypeGuard.isAttributeCode(attributeFilterData.attributeCode) &&
      TypeGuard.isString(attributeFilterData.type) &&
      TypeGuard.isAttributeFilterBaseData(obj)
    );
  }

  private static isSelectedConcepts(obj: unknown): obj is TerminologyCodeData[] {
    return TypeGuard.isArray<TerminologyCodeData>(obj, TypeGuard.isTerminologyCodeData);
  }

  private static isOptionalSelectedConcepts(obj: unknown): obj is TerminologyCodeData[] {
    return obj === undefined || TypeGuard.isArray(obj, TypeGuard.isTerminologyCodeBaseData);
  }

  /**
   * Checks if the object is an instance of AttributeFilterBaseData.
   * @param obj
   * @returns boolean
   */
  public static isAttributeFilterBaseData(obj: unknown): obj is AttributeFilterBaseData {
    const attributeFilterBaseData = obj as AttributeFilterBaseData;
    return (
      TypeGuard.isObject(attributeFilterBaseData) &&
      TypeGuard.isOptionalString(attributeFilterBaseData.comparator) &&
      TypeGuard.isOptionalNumber(attributeFilterBaseData.minValue) &&
      TypeGuard.isOptionalNumber(attributeFilterBaseData.maxValue) &&
      TypeGuard.isOptionalObject(attributeFilterBaseData.unit) &&
      TypeGuard.isOptionalNumber(attributeFilterBaseData.value)
    );
  }

  /**
   * Checks if the object is a valid ComparatorTypeData.
   * @param obj
   * @returns boolean
   */
  public static isComparatorTypeData(obj: unknown): obj is ComparatorTypeData {
    return TypeGuard.isString(obj);
  }

  /**
   * Checks if the object is an instance of ContextData.
   * @param obj
   * @returns boolean
   */
  public static isContextData(obj: unknown): obj is ContextData {
    const contextData = obj as ContextData;
    return (
      TypeGuard.isObject(contextData) &&
      TypeGuard.isString(contextData.code) &&
      TypeGuard.isString(contextData.system) &&
      TypeGuard.isString(contextData.display) &&
      TypeGuard.isString(contextData.version)
    );
  }

  /**
   * Checks if the object is an instance of CriteriaProfileData.
   * @param obj
   * @returns boolean
   */
  public static isCriteriaProfileData(obj: unknown): obj is CriteriaProfileData {
    const criteriaProfileData = obj as CriteriaProfileData;
    return (
      TypeGuard.isObject(criteriaProfileData) &&
      TypeGuard.isString(criteriaProfileData.id) &&
      TypeGuard.isDisplayData(criteriaProfileData.display) &&
      TypeGuard.isUiProfileData(criteriaProfileData.uiProfile) &&
      TypeGuard.isTerminologyCodeData(criteriaProfileData.context) &&
      Array.isArray(criteriaProfileData.termCodes) &&
      criteriaProfileData.termCodes.every(TypeGuard.isTerminologyCodeData)
    );
  }

  /**
   * Checks if the object is an instance of CRTDLData.
   * @param obj
   * @returns boolean
   */
  public static isCRTDLData(obj: unknown): obj is CRTDLData {
    const crtdlData = obj as CRTDLData;
    return (
      TypeGuard.isObject(crtdlData) &&
      TypeGuard.isOptionalCohortDefinition(crtdlData.cohortDefinition) &&
      TypeGuard.isOptionalDataExtraction(crtdlData.dataExtraction) &&
      TypeGuard.isOptionalString(crtdlData.display) &&
      TypeGuard.isOptionalString(crtdlData.version)
    );
  }

  /**
   * Checks if the object is an instance of DataExtractionData or undefined.
   * @param obj
   * @returns
   */
  private static isOptionalDataExtraction(obj: unknown): obj is DataExtractionData {
    return obj === undefined || TypeGuard.isDataExtractionData(obj);
  }

  /**
   * Checks if the object is an instance of DataExtractionData.
   * @param obj
   * @returns boolean
   */
  public static isDataExtractionData(obj: unknown): obj is DataExtractionData {
    const dataExtractionData = obj as DataExtractionData;
    return (
      TypeGuard.isObject(dataExtractionData) &&
      TypeGuard.isArray<AttributeGroupsData>(
        dataExtractionData.attributeGroups,
        TypeGuard.isAttributeGroupsData
      )
    );
  }

  /**
   * Checks if the object is an instance of DisplayData.
   * @param obj
   * @returns boolean
   */
  public static isDisplayData(obj: unknown): obj is DisplayData {
    const displayData = obj as DisplayData;
    return (
      TypeGuard.isObject(displayData) &&
      TypeGuard.isString(displayData.original) &&
      Array.isArray(displayData.translations) &&
      displayData.translations.every(TypeGuard.isTranslationData)
    );
  }

  public static isOptionalFilterData(obj: unknown): obj is FilterData {
    return obj !== undefined ? TypeGuard.isFilterData(obj) : undefined;
  }

  /**
   * Checks if the object is an instance of FilterData.
   * @param obj
   * @returns boolean
   */
  public static isFilterData(obj: unknown): obj is FilterData {
    const filterData = obj as FilterData;
    return (
      TypeGuard.isOptionalObject(filterData) &&
      TypeGuard.isString(filterData?.type) &&
      TypeGuard.isString(filterData?.name) &&
      TypeGuard.isOptionalArray(filterData?.codes, TypeGuard.isTerminologyCodeBaseData) &&
      TypeGuard.isOptionalString(filterData?.start) &&
      TypeGuard.isOptionalString(filterData?.end)
    );
  }

  /**
   * Checks if the object is an instance of IssueData.
   * @param obj
   * @returns boolean
   */
  public static isIssueData(obj: unknown): obj is IssueData {
    const issueData = obj as IssueData;
    return (
      TypeGuard.isObject(issueData) &&
      TypeGuard.isString(issueData.message) &&
      TypeGuard.isString(issueData.type) &&
      TypeGuard.isString(issueData.code) &&
      TypeGuard.isString(issueData.severity)
    );
  }

  /**
   * Checks if the object is an instance of QueryResultData.
   * @param obj
   * @returns boolean
   */
  public static isQueryResultData(obj: unknown): obj is QueryResultData {
    const queryResultData = obj as QueryResultData;
    return (
      TypeGuard.isObject(queryResultData) &&
      TypeGuard.isBoolean(queryResultData.detailsReceived) &&
      TypeGuard.isString(queryResultData.queryId) &&
      TypeGuard.isString(queryResultData.id) &&
      Array.isArray(queryResultData.issues) &&
      queryResultData.issues.every(TypeGuard.isIssueData) &&
      Array.isArray(queryResultData.resultLines) &&
      queryResultData.resultLines.every(TypeGuard.isQueryResultLineData) &&
      TypeGuard.isNumber(queryResultData.totalNumberOfPatients)
    );
  }

  /**
   * Checks if the object is an instance of QueryResultLineData.
   * @param obj
   * @returns boolean
   */
  public static isQueryResultLineData(obj: unknown): obj is QueryResultLineData {
    const queryResultLineData = obj as QueryResultLineData;
    return (
      TypeGuard.isObject(queryResultLineData) &&
      TypeGuard.isNumber(queryResultLineData.numberOfPatients) &&
      TypeGuard.isString(queryResultLineData.siteName)
    );
  }

  /**
   * Checks if the object is an instance of Relations.
   * @param obj
   * @returns boolean
   */
  public static isRelations(obj: unknown): obj is Relations {
    const relations = obj as Relations;
    return (
      TypeGuard.isObject(relations) &&
      TypeGuard.isDisplayData(relations.display) &&
      Array.isArray(relations.parents) &&
      relations.parents.every(TypeGuard.isRelatives) &&
      Array.isArray(relations.children) &&
      relations.children.every(TypeGuard.isRelatives) &&
      Array.isArray(relations.relatedTerms) &&
      relations.relatedTerms.every(TypeGuard.isRelatives)
    );
  }

  /**
   * Checks if the object is an instance of Relatives.
   * @param obj
   * @returns boolean
   */
  public static isRelatives(obj: unknown): obj is Relatives {
    const relatives = obj as Relatives;
    return (
      TypeGuard.isObject(relatives) &&
      TypeGuard.isString(relatives.name) &&
      TypeGuard.isString(relatives.contextualizedTermcodeHash)
    );
  }

  /**
   * Checks if the object is an instance of SavedDataQueryData.
   * @param obj
   * @returns boolean
   */
  public static isSavedDataQueryData(obj: unknown): obj is SavedDataQueryData {
    const savedDataQueryData = obj as SavedDataQueryData;
    return (
      TypeGuard.isObject(savedDataQueryData) &&
      TypeGuard.isNumber(savedDataQueryData.id) &&
      TypeGuard.isCRTDLData(savedDataQueryData.content) &&
      TypeGuard.isOptionalString(savedDataQueryData.comment) &&
      TypeGuard.isString(savedDataQueryData.label) &&
      TypeGuard.isNumber(savedDataQueryData.resultSize) &&
      TypeGuard.isString(savedDataQueryData.lastModified) &&
      TypeGuard.isString(savedDataQueryData.createdBy) &&
      TypeGuard.isObject(savedDataQueryData.ccdl) &&
      TypeGuard.isBoolean(savedDataQueryData.ccdl.exists) &&
      TypeGuard.isBoolean(savedDataQueryData.ccdl.isValid) &&
      TypeGuard.isOptionalObject(savedDataQueryData.dataExtraction) &&
      TypeGuard.isBoolean(savedDataQueryData.dataExtraction.exists) &&
      TypeGuard.isBoolean(savedDataQueryData.dataExtraction.isValid)
    );
  }

  /**
   * Checks if the object is an instance of SavedDataQueryListItemData.
   * @param obj
   * @returns boolean
   */
  public static isSavedDataQueryListItemData(obj: unknown): obj is SavedDataQueryListItemData {
    const item = obj as SavedDataQueryListItemData;
    return (
      TypeGuard.isObject(item) &&
      TypeGuard.isNumber(item.id) &&
      TypeGuard.isString(item.label) &&
      (TypeGuard.isString(item.comment) || item.comment === undefined) &&
      TypeGuard.isNumber(item.resultSize) &&
      TypeGuard.isString(item.lastModified) &&
      TypeGuard.isObject(item.ccdl) &&
      TypeGuard.isBoolean(item.ccdl.exists) &&
      TypeGuard.isBoolean(item.ccdl.isValid) &&
      TypeGuard.isObject(item.dataExtraction) &&
      TypeGuard.isBoolean(item.dataExtraction.exists) &&
      TypeGuard.isBoolean(item.dataExtraction.isValid)
    );
  }

  /**
   * Checks if the object is an instance of SearchResponse.
   * @param obj
   * @returns boolean
   */
  public static isSearchResponse(obj: unknown): obj is SearchResponse {
    const searchResponse = obj as SearchResponse;
    return (
      TypeGuard.isObject(searchResponse) &&
      TypeGuard.isNumber(searchResponse.totalHits) &&
      Array.isArray(searchResponse.results) &&
      searchResponse.results.every(TypeGuard.isSearchResult)
    );
  }

  /**
   * Checks if the object is an instance of SearchResult.
   * @param obj
   * @returns boolean
   */
  public static isSearchResult(obj: unknown): obj is SearchResult {
    const searchResult = obj as SearchResult;
    return (
      TypeGuard.isObject(searchResult) &&
      TypeGuard.isString(searchResult.id) &&
      TypeGuard.isDisplayData(searchResult.display)
    );
  }

  private static isOptionalStructuredQueryCriterionData(
    obj: unknown
  ): obj is StructuredQueryCriterionData {
    return obj === undefined || TypeGuard.isStructuredQueryCriterionData(obj);
  }

  /**
   * Checks if the object is an instance of StructuredQueryCriterionData.
   * @param obj
   * @returns boolean
   */
  public static isStructuredQueryCriterionData(obj: unknown): obj is StructuredQueryCriterionData {
    const structuredQueryCriterionData = obj as StructuredQueryCriterionData;
    return (
      TypeGuard.isObject(structuredQueryCriterionData) &&
      TypeGuard.isOptionalAttributeFilterData(structuredQueryCriterionData.attributeFilters) &&
      TypeGuard.isContextData(structuredQueryCriterionData.context) &&
      TypeGuard.isArray(structuredQueryCriterionData.termCodes, TypeGuard.isTerminologyCodeData) &&
      TypeGuard.isOptionalTimeRestrictionData(structuredQueryCriterionData.timeRestriction) &&
      TypeGuard.isOptionalValueFilterData(structuredQueryCriterionData.valueFilter)
    );
  }

  private static isOptionalCohortDefinition(obj: unknown): obj is StructuredQueryData {
    return obj === undefined || TypeGuard.isStructuredQueryData(obj);
  }
  /**
   * Checks if the object is an instance of StructuredQueryData.
   * @param obj
   * @returns
   */
  public static isStructuredQueryData(obj: unknown): obj is StructuredQueryData {
    const structuredQueryData = obj as StructuredQueryData;
    return (
      TypeGuard.isObject(structuredQueryData) &&
      TypeGuard.isString(structuredQueryData.version) &&
      TypeGuard.isOptionalString(structuredQueryData.display) &&
      TypeGuard.isInclusionOrExclusionCriteria(structuredQueryData.inclusionCriteria) &&
      TypeGuard.isInclusionOrExclusionCriteria(structuredQueryData.exclusionCriteria)
    );
  }

  /**
   * Checks if the given value is a valid inclusionCriteria array.
   * @param val
   * @returns boolean
   */
  /**
   * Checks if the given value is a valid inclusion or exclusion criteria array.
   * @param val - The value to check.
   * @returns boolean
   */
  public static isInclusionOrExclusionCriteria(val: unknown): boolean {
    return TypeGuard.isOptionalArray(val, (criteria) =>
      TypeGuard.isArray(criteria, TypeGuard.isStructuredQueryCriterionData)
    );
  }

  /**
   * Checks if the object is an instance of TerminologyCodeBaseData.
   * @param obj
   * @returns boolean
   */
  public static isTerminologyCodeBaseData(obj: unknown): obj is TerminologyCodeBaseData {
    const terminologyCodeBaseData = obj as TerminologyCodeBaseData;
    return (
      TypeGuard.isObject(terminologyCodeBaseData) &&
      TypeGuard.isString(terminologyCodeBaseData.code) &&
      TypeGuard.isString(terminologyCodeBaseData.system) &&
      TypeGuard.isString(terminologyCodeBaseData.display)
    );
  }

  /**
   * Checks if the object is an instance of TerminologyCodeData.
   * @param obj
   * @returns boolean
   */
  public static isTerminologyCodeData(obj: unknown): obj is TerminologyCodeData {
    const terminologyCodeData = obj as TerminologyCodeData;
    return (
      TypeGuard.isObject(terminologyCodeData) &&
      TypeGuard.isTerminologyCodeBaseData(terminologyCodeData) &&
      (TypeGuard.isOptionalString(terminologyCodeData.version) ||
        terminologyCodeData.version === '')
    );
  }

  private static isOptionalTimeRestrictionData(obj: unknown): obj is TimeRestrictionData {
    return obj === undefined || TypeGuard.isTimeRestrictionData(obj);
  }

  /**
   * Checks if the object is an instance of TimeRestrictionData.
   * @param obj
   * @returns boolean
   */
  public static isTimeRestrictionData(obj: unknown): obj is TimeRestrictionData {
    const timeRestrictionData = obj as TimeRestrictionData;
    return (
      TypeGuard.isObject(timeRestrictionData) &&
      TypeGuard.isString(timeRestrictionData.afterDate) &&
      TypeGuard.isOptionalString(timeRestrictionData.beforeDate)
    );
  }

  /**
   * Checks if the object is an instance of TranslationData.
   * @param obj
   * @returns boolean
   */
  public static isTranslationData(obj: unknown): obj is TranslationData {
    const translationData = obj as TranslationData;
    return (
      TypeGuard.isObject(translationData) &&
      TypeGuard.isString(translationData.language) &&
      TypeGuard.isString(translationData.value)
    );
  }

  /**
   * Checks if the object is an instance of UiProfileData.
   * @param obj
   * @returns boolean
   */
  public static isUiProfileData(obj: unknown): obj is UiProfileData {
    const uiProfileData = obj as UiProfileData;
    return (
      TypeGuard.isObject(uiProfileData) &&
      TypeGuard.isDisplayData(uiProfileData.display) &&
      TypeGuard.isBoolean(uiProfileData.timeRestrictionAllowed) &&
      TypeGuard.isOptionalArray(
        uiProfileData.attributeDefinitions,
        TypeGuard.isAttributeDefinitionData
      ) &&
      TypeGuard.isValueDefinitionData(uiProfileData.valueDefinition)
    );
  }

  /**
   * Checks if the object is an instance of ValueDefinitionData.
   * @param obj
   * @returns boolean
   */
  public static isValueDefinitionData(obj: unknown): obj is ValueDefinitionData {
    const valueDefinitionData = obj as ValueDefinitionData;
    return (
      TypeGuard.isObject(valueDefinitionData) &&
      TypeGuard.isDisplayData(valueDefinitionData.display) &&
      TypeGuard.isString(valueDefinitionData.type) &&
      TypeGuard.isOptionalArray<string>(
        valueDefinitionData.selectableConcepts,
        TypeGuard.isString
      ) &&
      TypeGuard.isBoolean(valueDefinitionData.optional) &&
      TypeGuard.isOptionalArray<string>(valueDefinitionData.allowedUnits) &&
      TypeGuard.isOptionalNumber(valueDefinitionData.precision) &&
      TypeGuard.isOptionalNumber(valueDefinitionData.max) &&
      TypeGuard.isOptionalNumber(valueDefinitionData.min)
    );
  }

  private static isOptionalValueFilterData(obj: unknown): obj is ValueFilterData {
    return obj === undefined || TypeGuard.isValueFilterData(obj);
  }

  /**
   * Checks if the object is an instance of ValueFilterData.
   * @param obj
   * @returns boolean
   */
  public static isValueFilterData(obj: unknown): obj is ValueFilterData {
    const valueFilterData = obj as ValueFilterData;
    return (
      TypeGuard.isObject(valueFilterData) &&
      TypeGuard.isString(valueFilterData.type) &&
      TypeGuard.isAttributeFilterBaseData(valueFilterData)
    );
  }

  /**
   * Checks if the object is an instance of QuantityUnitData.
   * @param obj
   * @returns boolean
   */
  public static isQuantityUnitData(obj: unknown): obj is QuantityUnitData {
    const quantityUnitData = obj as QuantityUnitData;
    return (
      TypeGuard.isObject(quantityUnitData) &&
      TypeGuard.isString(quantityUnitData.code) &&
      TypeGuard.isString(quantityUnitData.display)
    );
  }

  /**
   * Checks if the object is an instance of AttributeDefinitionData.
   * @param obj
   * @returns boolean
   */
  public static isAttributeDefinitionData(obj: unknown): obj is AttributeDefinitionData {
    const attributeDefinitionData = obj as AttributeDefinitionData;
    return (
      TypeGuard.isObject(attributeDefinitionData) &&
      TypeGuard.isNumber(attributeDefinitionData.min) &&
      TypeGuard.isNumber(attributeDefinitionData.max) &&
      Array.isArray(attributeDefinitionData.allowedUnits) &&
      attributeDefinitionData.allowedUnits.every(TypeGuard.isQuantityUnitData) &&
      TypeGuard.isAttributeCode(attributeDefinitionData.attributeCode) &&
      TypeGuard.isDisplayData(attributeDefinitionData.display) &&
      TypeGuard.isBoolean(attributeDefinitionData.optional) &&
      TypeGuard.isNumber(attributeDefinitionData.precision) &&
      Array.isArray(attributeDefinitionData.selectableConcepts) &&
      attributeDefinitionData.selectableConcepts.every(TypeGuard.isString) &&
      TypeGuard.isString(attributeDefinitionData.type)
    );
  }

  /**
   * Checks if the object is an instance of AttributeCode.
   * @param obj
   * @returns boolean
   */
  public static isAttributeCode(obj: unknown): obj is AttributeCode {
    const attributeCode = obj as AttributeCode;
    return (
      TypeGuard.isObject(attributeCode) &&
      TypeGuard.isString(attributeCode.code) &&
      TypeGuard.isString(attributeCode.system) &&
      TypeGuard.isString(attributeCode.display)
    );
  }

  /**
   * Checks if the object is an instance of AnnotatedCRTDLData.
   * @param obj
   * @returns boolean
   */
  public static isAnnotatedCRTDLData(obj: unknown): obj is AnnotatedCRTDLData {
    const annotatedCRTDLData = obj as AnnotatedCRTDLData;
    return (
      TypeGuard.isObject(annotatedCRTDLData) &&
      TypeGuard.isDataExtractionData(annotatedCRTDLData.dataExtraction) &&
      TypeGuard.isStructuredQueryData(annotatedCRTDLData.cohortDefinition)
    );
  }

  /**
   * Checks if the object is an instance of AttributesData.
   * @param obj
   * @returns boolean
   */
  public static isAttributesData(obj: unknown): obj is AttributesData {
    const attributesData = obj as AttributesData;
    return (
      TypeGuard.isObject(attributesData) &&
      TypeGuard.isOptionalArray<string>(attributesData.linkedGroups, TypeGuard.isString) &&
      TypeGuard.isBoolean(attributesData.mustHave) &&
      TypeGuard.isString(attributesData.attributeRef)
    );
  }

  /**
   * Checks if the object is an instance of AttributeGroupsData.
   * @param obj
   * @returns boolean
   */
  public static isAttributeGroupsData(obj: unknown): obj is AttributeGroupsData {
    const attributeGroupsData = obj as AttributeGroupsData;
    return (
      TypeGuard.isObject(attributeGroupsData) &&
      TypeGuard.isOptionalString(attributeGroupsData.id) &&
      TypeGuard.isOptionalString(attributeGroupsData.name) &&
      TypeGuard.isOptionalBoolean(attributeGroupsData.includeReferenceOnly) &&
      TypeGuard.isString(attributeGroupsData.groupReference) &&
      TypeGuard.isOptionalArray<string>(
        attributeGroupsData.attributes,
        TypeGuard.isAttributesData
      ) &&
      TypeGuard.isOptionalFilterDataArray(attributeGroupsData.filter)
    );
  }

  public static isOptionalFilterDataArray(obj: unknown): obj is FilterData[] | undefined {
    return obj === undefined || TypeGuard.isOptionalArray(obj, TypeGuard.isFilterData);
  }

  public static isFilterDataArray(obj: unknown): obj is FilterData[] | undefined {
    return TypeGuard.isArray(obj, TypeGuard.isFilterData);
  }

  /**
   * Checks if the object is an instance of CodeableConceptResult.
   * @param obj
   * @returns boolean
   */
  public static isCodeableConceptResult(obj: unknown): obj is CodeableConceptResult {
    const codeableConceptResult = obj as CodeableConceptResult;
    return (
      TypeGuard.isObject(codeableConceptResult) &&
      TypeGuard.isSearchResult(codeableConceptResult) &&
      TypeGuard.isTerminologyCodeData(codeableConceptResult.termCode)
    );
  }
}
