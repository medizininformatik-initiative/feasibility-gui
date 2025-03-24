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

  /**
   * Checks if the object is an instance of AttributeFilterData.
   * @param obj
   * @returns boolean
   */
  public static isAttributeFilterData(obj: unknown): obj is AttributeFilterData {
    return (
      TypeGuard.isObject(obj) &&
      TypeGuard.isString((obj as AttributeFilterData).type) &&
      TypeGuard.isAttributeFilterBaseData(obj)
    );
  }

  /**
   * Checks if the object is an instance of AttributeFilterBaseData.
   * @param obj
   * @returns boolean
   */
  public static isAttributeFilterBaseData(obj: unknown): obj is AttributeFilterBaseData {
    return (
      TypeGuard.isObject(obj) && TypeGuard.isString((obj as AttributeFilterBaseData).comparator)
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
      TypeGuard.isStructuredQueryData(crtdlData.cohortDefinition) &&
      TypeGuard.isDataExtractionData(crtdlData.dataExtraction) &&
      TypeGuard.isString(crtdlData.display) &&
      TypeGuard.isString(crtdlData.version)
    );
  }

  /**
   * Checks if the object is an instance of DataExtractionData.
   * @param obj
   * @returns boolean
   */
  public static isDataExtractionData(obj: unknown): obj is DataExtractionData {
    const dataExtractionData = obj as DataExtractionData;
    return (
      dataExtractionData === null ||
      (TypeGuard.isObject(dataExtractionData) &&
        Array.isArray(dataExtractionData.attributeGroups) &&
        dataExtractionData.attributeGroups.every(TypeGuard.isAttributeGroupsData))
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

  /**
   * Checks if the object is an instance of FilterData.
   * @param obj
   * @returns boolean
   */
  public static isFilterData(obj: unknown): obj is FilterData {
    const filterData = obj as FilterData;
    return (
      TypeGuard.isObject(filterData || null) &&
      TypeGuard.isString(filterData.type) &&
      TypeGuard.isString(filterData.name)
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
      TypeGuard.isString(savedDataQueryData.comment) &&
      TypeGuard.isString(savedDataQueryData.label) &&
      TypeGuard.isNumber(savedDataQueryData.resultSize) &&
      TypeGuard.isString(savedDataQueryData.lastModified) &&
      TypeGuard.isString(savedDataQueryData.createdBy) &&
      TypeGuard.isObject(savedDataQueryData.ccdl) &&
      TypeGuard.isBoolean(savedDataQueryData.ccdl.exists) &&
      TypeGuard.isBoolean(savedDataQueryData.ccdl.isValid) &&
      TypeGuard.isObject(savedDataQueryData.dataExtraction) &&
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
    const savedDataQueryListItemData = obj as SavedDataQueryListItemData;
    return (
      TypeGuard.isObject(savedDataQueryListItemData) &&
      TypeGuard.isNumber(savedDataQueryListItemData.id) &&
      TypeGuard.isString(savedDataQueryListItemData.label) &&
      TypeGuard.isString(savedDataQueryListItemData.comment) &&
      TypeGuard.isString(savedDataQueryListItemData.lastModified)
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

  /**
   * Checks if the object is an instance of StructuredQueryCriterionData.
   * @param obj
   * @returns boolean
   */
  public static isStructuredQueryCriterionData(obj: unknown): obj is StructuredQueryCriterionData {
    const structuredQueryCriterionData = obj as StructuredQueryCriterionData;
    return (
      TypeGuard.isObject(structuredQueryCriterionData) &&
      (!structuredQueryCriterionData.attributeFilters ||
        (Array.isArray(structuredQueryCriterionData.attributeFilters) &&
          structuredQueryCriterionData.attributeFilters.every(TypeGuard.isAttributeFilterData))) &&
      TypeGuard.isContextData(structuredQueryCriterionData.context) &&
      Array.isArray(structuredQueryCriterionData.termCodes) &&
      structuredQueryCriterionData.termCodes.every(TypeGuard.isTerminologyCodeData) &&
      (!structuredQueryCriterionData.timeRestriction ||
        TypeGuard.isTimeRestrictionData(structuredQueryCriterionData.timeRestriction)) &&
      (!structuredQueryCriterionData.valueFilter ||
        TypeGuard.isValueFilterData(structuredQueryCriterionData.valueFilter))
    );
  }

  /**
   * Checks if the object is an instance of StructuredQueryData.
   * @param obj
   * @returns boolean
   */
  public static isStructuredQueryData(obj: unknown): obj is StructuredQueryData {
    const structuredQueryData = obj as StructuredQueryData;
    return (
      TypeGuard.isObject(structuredQueryData) &&
      TypeGuard.isString(structuredQueryData.version) &&
      TypeGuard.isString(structuredQueryData.display) &&
      Array.isArray(structuredQueryData.inclusionCriteria) &&
      structuredQueryData.inclusionCriteria.every(
        (criteria) =>
          Array.isArray(criteria) && criteria.every(TypeGuard.isStructuredQueryCriterionData)
      ) &&
      (!structuredQueryData.exclusionCriteria ||
        (Array.isArray(structuredQueryData.exclusionCriteria) &&
          structuredQueryData.exclusionCriteria.every(
            (criteria) =>
              Array.isArray(criteria) && criteria.every(TypeGuard.isStructuredQueryCriterionData)
          )))
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
      terminologyCodeData.version &&
      TypeGuard.isString(terminologyCodeData.version)
    );
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
      (!timeRestrictionData.beforeDate || TypeGuard.isString(timeRestrictionData.beforeDate))
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
      Array.isArray(uiProfileData.attributeDefinitions) &&
      uiProfileData.attributeDefinitions.every(TypeGuard.isAttributeDefinitionData) &&
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
      Array.isArray(valueDefinitionData.selectableConcepts) &&
      valueDefinitionData.selectableConcepts.every(TypeGuard.isString) &&
      TypeGuard.isBoolean(valueDefinitionData.optional) &&
      Array.isArray(valueDefinitionData.allowedUnits) &&
      valueDefinitionData.allowedUnits.every(TypeGuard.isQuantityUnitData) &&
      TypeGuard.isNumber(valueDefinitionData.precision) &&
      TypeGuard.isNumber(valueDefinitionData.max) &&
      TypeGuard.isNumber(valueDefinitionData.min)
    );
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
      (Array.isArray(attributesData.linkedGroups) || attributesData.linkedGroups === null) &&
      (attributesData.linkedGroups === null ||
        attributesData.linkedGroups.every(TypeGuard.isString)) &&
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
      (TypeGuard.isString(attributeGroupsData.id) || attributeGroupsData.id === null) &&
      (TypeGuard.isString(attributeGroupsData.name) || attributeGroupsData.name === null) &&
      (TypeGuard.isBoolean(attributeGroupsData.includeReferenceOnly) ||
        attributeGroupsData.includeReferenceOnly === null) &&
      TypeGuard.isString(attributeGroupsData.groupReference) &&
      Array.isArray(attributeGroupsData.attributes) &&
      attributeGroupsData.attributes.every(TypeGuard.isAttributesData) &&
      (Array.isArray(attributeGroupsData.filter) || attributeGroupsData.filter === null) &&
      (attributeGroupsData.filter === null ||
        attributeGroupsData.filter.every(TypeGuard.isFilterData))
    );
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
