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
import { Key } from 'protractor';
import { DataExtraction } from 'src/app/model/CRTDL/DataExtraction/DataExtraction';
import { CriteriaProfile } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';

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
      this.isObject(obj) &&
      this.isString((obj as AttributeFilterData).type) &&
      this.isAttributeFilterBaseData(obj)
    );
  }

  /**
   * Checks if the object is an instance of AttributeFilterBaseData.
   * @param obj
   * @returns boolean
   */
  public static isAttributeFilterBaseData(obj: unknown): obj is AttributeFilterBaseData {
    return this.isObject(obj) && this.isString((obj as AttributeFilterBaseData).comparator);
  }

  /**
   * Checks if the object is a valid ComparatorTypeData.
   * @param obj
   * @returns boolean
   */
  public static isComparatorTypeData(obj: unknown): obj is ComparatorTypeData {
    return this.isString(obj);
  }

  /**
   * Checks if the object is an instance of ContextData.
   * @param obj
   * @returns boolean
   */
  public static isContextData(obj: unknown): obj is ContextData {
    const contextData = obj as ContextData;
    return (
      this.isObject(contextData) &&
      this.isString(contextData.code) &&
      this.isString(contextData.system) &&
      this.isString(contextData.display) &&
      this.isString(contextData.version)
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
      this.isObject(criteriaProfileData) &&
      this.isString(criteriaProfileData.id) &&
      this.isDisplayData(criteriaProfileData.display) &&
      this.isUiProfileData(criteriaProfileData.uiProfile) &&
      this.isTerminologyCodeData(criteriaProfileData.context) &&
      Array.isArray(criteriaProfileData.termCodes) &&
      criteriaProfileData.termCodes.every(this.isTerminologyCodeData)
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
      this.isObject(crtdlData) &&
      this.isStructuredQueryData(crtdlData.cohortDefinition) &&
      this.isDataExtractionData(crtdlData.dataExtraction) &&
      this.isString(crtdlData.display) &&
      this.isString(crtdlData.version)
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
      this.isObject(dataExtractionData) &&
      Array.isArray(dataExtractionData.attributeGroups) &&
      dataExtractionData.attributeGroups.every(this.isAttributeGroupsData)
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
      this.isObject(displayData) &&
      this.isString(displayData.original) &&
      Array.isArray(displayData.translations) &&
      displayData.translations.every(this.isTranslationData)
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
      this.isObject(filterData) && this.isString(filterData.type) && this.isString(filterData.name)
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
      this.isObject(issueData) &&
      this.isString(issueData.message) &&
      this.isString(issueData.type) &&
      this.isString(issueData.code) &&
      this.isString(issueData.severity)
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
      this.isObject(queryResultData) &&
      this.isBoolean(queryResultData.detailsReceived) &&
      this.isString(queryResultData.queryId) &&
      this.isString(queryResultData.id) &&
      Array.isArray(queryResultData.issues) &&
      queryResultData.issues.every(this.isIssueData) &&
      Array.isArray(queryResultData.resultLines) &&
      queryResultData.resultLines.every(this.isQueryResultLineData) &&
      this.isNumber(queryResultData.totalNumberOfPatients)
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
      this.isObject(queryResultLineData) &&
      this.isNumber(queryResultLineData.numberOfPatients) &&
      this.isString(queryResultLineData.siteName)
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
      this.isObject(relations) &&
      this.isDisplayData(relations.display) &&
      Array.isArray(relations.parents) &&
      relations.parents.every(this.isRelatives) &&
      Array.isArray(relations.children) &&
      relations.children.every(this.isRelatives) &&
      Array.isArray(relations.relatedTerms) &&
      relations.relatedTerms.every(this.isRelatives)
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
      this.isObject(relatives) &&
      this.isString(relatives.name) &&
      this.isString(relatives.contextualizedTermcodeHash)
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
      this.isObject(savedDataQueryData) &&
      this.isCRTDLData(savedDataQueryData.content) &&
      this.isString(savedDataQueryData.comment) &&
      this.isString(savedDataQueryData.label) &&
      this.isNumber(savedDataQueryData.resultSize)
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
      this.isObject(savedDataQueryListItemData) &&
      this.isString(savedDataQueryListItemData.id) &&
      this.isString(savedDataQueryListItemData.label) &&
      this.isString(savedDataQueryListItemData.comment) &&
      this.isString(savedDataQueryListItemData.lastModified)
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
      this.isObject(searchResponse) &&
      this.isNumber(searchResponse.totalHits) &&
      Array.isArray(searchResponse.results) &&
      searchResponse.results.every(this.isSearchResult)
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
      this.isObject(searchResult) &&
      this.isString(searchResult.id) &&
      this.isDisplayData(searchResult.display)
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
      this.isObject(structuredQueryCriterionData) &&
      (!structuredQueryCriterionData.attributeFilters ||
        (Array.isArray(structuredQueryCriterionData.attributeFilters) &&
          structuredQueryCriterionData.attributeFilters.every(this.isAttributeFilterData))) &&
      this.isContextData(structuredQueryCriterionData.context) &&
      Array.isArray(structuredQueryCriterionData.termCodes) &&
      structuredQueryCriterionData.termCodes.every(this.isTerminologyCodeData) &&
      (!structuredQueryCriterionData.timeRestriction ||
        this.isTimeRestrictionData(structuredQueryCriterionData.timeRestriction)) &&
      (!structuredQueryCriterionData.valueFilter ||
        this.isValueFilterData(structuredQueryCriterionData.valueFilter))
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
      this.isObject(structuredQueryData) &&
      this.isString(structuredQueryData.version) &&
      this.isString(structuredQueryData.display) &&
      Array.isArray(structuredQueryData.inclusionCriteria) &&
      structuredQueryData.inclusionCriteria.every(
        (criteria) => Array.isArray(criteria) && criteria.every(this.isStructuredQueryCriterionData)
      ) &&
      (!structuredQueryData.exclusionCriteria ||
        (Array.isArray(structuredQueryData.exclusionCriteria) &&
          structuredQueryData.exclusionCriteria.every(
            (criteria) =>
              Array.isArray(criteria) && criteria.every(this.isStructuredQueryCriterionData)
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
      this.isObject(terminologyCodeBaseData) &&
      this.isString(terminologyCodeBaseData.code) &&
      this.isString(terminologyCodeBaseData.system) &&
      this.isString(terminologyCodeBaseData.display)
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
      this.isObject(terminologyCodeData) &&
      this.isTerminologyCodeBaseData(terminologyCodeData) &&
      terminologyCodeData.version &&
      this.isString(terminologyCodeData.version)
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
      this.isObject(timeRestrictionData) &&
      this.isString(timeRestrictionData.afterDate) &&
      (!timeRestrictionData.beforeDate || this.isString(timeRestrictionData.beforeDate))
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
      this.isObject(translationData) &&
      this.isString(translationData.language) &&
      this.isString(translationData.value)
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
      this.isObject(uiProfileData) &&
      this.isDisplayData(uiProfileData.display) &&
      this.isBoolean(uiProfileData.timeRestrictionAllowed) &&
      Array.isArray(uiProfileData.attributeDefinitions) &&
      uiProfileData.attributeDefinitions.every(this.isAttributeDefinitionData) &&
      this.isValueDefinitionData(uiProfileData.valueDefinition)
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
      this.isObject(valueDefinitionData) &&
      this.isDisplayData(valueDefinitionData.display) &&
      this.isString(valueDefinitionData.type) &&
      Array.isArray(valueDefinitionData.selectableConcepts) &&
      valueDefinitionData.selectableConcepts.every(this.isString) &&
      this.isBoolean(valueDefinitionData.optional) &&
      Array.isArray(valueDefinitionData.allowedUnits) &&
      valueDefinitionData.allowedUnits.every(this.isQuantityUnitData) &&
      this.isNumber(valueDefinitionData.precision) &&
      this.isNumber(valueDefinitionData.max) &&
      this.isNumber(valueDefinitionData.min)
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
      this.isObject(valueFilterData) &&
      this.isString(valueFilterData.type) &&
      this.isAttributeFilterBaseData(valueFilterData)
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
      this.isObject(quantityUnitData) &&
      this.isString(quantityUnitData.code) &&
      this.isString(quantityUnitData.display)
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
      this.isObject(attributeDefinitionData) &&
      this.isNumber(attributeDefinitionData.min) &&
      this.isNumber(attributeDefinitionData.max) &&
      Array.isArray(attributeDefinitionData.allowedUnits) &&
      attributeDefinitionData.allowedUnits.every(this.isQuantityUnitData) &&
      this.isAttributeCode(attributeDefinitionData.attributeCode) &&
      this.isDisplayData(attributeDefinitionData.display) &&
      this.isBoolean(attributeDefinitionData.optional) &&
      this.isNumber(attributeDefinitionData.precision) &&
      Array.isArray(attributeDefinitionData.selectableConcepts) &&
      attributeDefinitionData.selectableConcepts.every(this.isString) &&
      this.isString(attributeDefinitionData.type)
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
      this.isObject(attributeCode) &&
      this.isString(attributeCode.code) &&
      this.isString(attributeCode.system) &&
      this.isString(attributeCode.display)
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
      this.isObject(annotatedCRTDLData) &&
      this.isDataExtractionData(annotatedCRTDLData.dataExtraction) &&
      this.isStructuredQueryData(annotatedCRTDLData.cohortDefinition)
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
      this.isObject(attributesData) &&
      Array.isArray(attributesData.linkedGroups) &&
      attributesData.linkedGroups.every(this.isString) &&
      this.isBoolean(attributesData.mustHave) &&
      this.isString(attributesData.attributeRef)
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
      this.isObject(attributeGroupsData) &&
      this.isString(attributeGroupsData.id) &&
      this.isBoolean(attributeGroupsData.includeReferenceOnly) &&
      this.isString(attributeGroupsData.groupReference) &&
      this.isString(attributeGroupsData.name) &&
      Array.isArray(attributeGroupsData.attributes) &&
      attributeGroupsData.attributes.every(this.isAttributesData) &&
      Array.isArray(attributeGroupsData.filter) &&
      attributeGroupsData.filter.every(this.isFilterData)
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
      this.isObject(codeableConceptResult) &&
      this.isSearchResult(codeableConceptResult) &&
      this.isTerminologyCodeData(codeableConceptResult.termCode)
    );
  }
}
