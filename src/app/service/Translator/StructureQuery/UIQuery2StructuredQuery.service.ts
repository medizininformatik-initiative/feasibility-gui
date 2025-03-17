import { AbstractStructuredQueryFilters } from '../../../model/StructuredQuery/Criterion/Abstract/AbstractStructuredQueryFilters';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { ConceptAttributeFilter } from 'src/app/model/StructuredQuery/Criterion/AttributeFilters/ConceptFilter/ConceptAttributeFilter';
import { ConceptFilter } from '../../../model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { ConceptValueFilter } from 'src/app/model/StructuredQuery/Criterion/ValueFilter/ConceptFilter/ConceptValueFilter';
import { ConsentService } from '../../Consent/Consent.service';
import { Criterion } from '../../../model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from '../../Provider/CriterionProvider.service';
import { FeasibilityQuery } from '../../../model/FeasibilityQuery/FeasibilityQuery';
import { FeatureService } from '../../Feature.service';
import { Injectable } from '@angular/core';
import { ReferenceFilter as ReferenceFilterSQ } from '../../../model/StructuredQuery/Criterion/AttributeFilters/ReferenceFilter/ReferenceFilter';
import { ReferenceFilter as ReferenceFilterFQ } from '../../../model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ReferenceFilter';
import { StructuredQuery } from '../../../model/StructuredQuery/StructuredQuery';
import { StructuredQueryCriterion } from '../../../model/StructuredQuery/Criterion/StructuredQueryCriterion';
import { StructuredQueryQuantityFilterTranslatorService } from './Builder/StructuredQueryQuantityFilterTranslator.service';
import { TerminologyCode } from '../../../model/Terminology/TerminologyCode';
import { TerminologyCodeTranslator } from '../Shared/TerminologyCodeTranslator.service';
import { TimeRestrictionTranslationService } from '../Shared/TimeRestrictionTranslation.service';
import { ObjectHelper } from 'src/app/modules/feasibility-query/controller/ObjectHelper';
import { StructuredQueryData } from 'src/app/model/Interface/StructuredQueryData';

@Injectable({
  providedIn: 'root',
})
export class UIQuery2StructuredQueryService {
  constructor(
    private featureService: FeatureService,
    private criterionProvider: CriterionProviderService,
    private timeRestrictionTranslation: TimeRestrictionTranslationService,
    private quantityFilterTranslator: StructuredQueryQuantityFilterTranslatorService,
    private terminologyTranslator: TerminologyCodeTranslator,
    private consentService: ConsentService
  ) {}

  public translateToStructuredQuery(feasibilityQuery: FeasibilityQuery): StructuredQuery {
    const inclusionCriteria = feasibilityQuery.getInclusionCriteria();
    const exclusionCriteria = feasibilityQuery.getExclusionCriteria();
    const structuredQuery = new StructuredQuery(
      this.translateInclusionCriteria(inclusionCriteria),
      this.translateExclusionCriteria(exclusionCriteria),
      feasibilityQuery.getDisplay().length > 0 ? feasibilityQuery.getDisplay() : ''
    );

    if (feasibilityQuery.getConsent()) {
      structuredQuery.getInclusionCriteria().push(this.getConsent());
    }
    return structuredQuery;
  }

  private translateInclusionCriteria(
    inclusionCriteriaArray: string[][]
  ): StructuredQueryCriterion[][] | [] {
    const inclusionCriteria = ObjectHelper.clone(inclusionCriteriaArray);
    if (inclusionCriteria.length > 0) {
      return this.translateCriterionGroup(inclusionCriteria);
    }
  }

  private translateExclusionCriteria(
    exclusionCriteriaArray: string[][]
  ): StructuredQueryCriterion[][] | undefined {
    const exclusionCriteria = ObjectHelper.clone(exclusionCriteriaArray);
    if (exclusionCriteria.length > 0) {
      return this.translateCriterionGroup(exclusionCriteria);
    } else {
      return undefined;
    }
  }

  private translateCriterionGroup(criterionGroup: string[][]): StructuredQueryCriterion[][] {
    const structuredQueryCriterion: StructuredQueryCriterion[][] = [];
    criterionGroup.forEach((criterionIdArray) => {
      const innerArray: StructuredQueryCriterion[] = this.translateInnerArray(criterionIdArray);
      if (innerArray.length > 0) {
        structuredQueryCriterion.push(innerArray);
      }
    });
    return structuredQueryCriterion.length > 0 ? structuredQueryCriterion : undefined;
  }

  private translateInnerArray(criterionArray: string[]): StructuredQueryCriterion[] {
    const structuredQueryInnerArray: StructuredQueryCriterion[] = [];
    criterionArray.forEach((criterionID) => {
      const criterion = this.criterionProvider.getCriterionByUID(criterionID);
      structuredQueryInnerArray.push(this.assignStructuredQueryCriterionElements(criterion));
    });
    return structuredQueryInnerArray;
  }

  /**
   * @todo test terminology translator
   * @param criterion
   * @returns
   */
  private assignStructuredQueryCriterionElements(criterion: Criterion): StructuredQueryCriterion {
    const structuredQueryCriterion = new StructuredQueryCriterion(
      this.terminologyTranslator.translateTermCodes(criterion.getTermCodes()),
      this.translateAttributeFilters(criterion),
      this.addContextToStructuredQuery(criterion),
      this.timeRestrictionTranslation.translateTimeRestrictionToStructuredQuery(
        criterion.getTimeRestriction()
      ),
      this.translateValueFilter(criterion)
    );
    return structuredQueryCriterion;
  }

  private addContextToStructuredQuery(criterion: Criterion): TerminologyCode | undefined {
    if (this.featureService.getSendSQContextToBackend()) {
      return criterion.getContext();
    } else {
      return undefined;
    }
  }

  private translateAttributeFilters(
    criterion: Criterion
  ): AbstractStructuredQueryFilters[] | undefined {
    if (criterion.getAttributeFilters().length > 0) {
      return this.createStructuredQueryAttributeFilters(criterion);
    } else {
      return undefined;
    }
  }

  private translateValueFilter(criterion: Criterion): AbstractStructuredQueryFilters | undefined {
    if (criterion.getValueFilters().length > 0) {
      return this.createStructuredQueryValueFilters(criterion);
    } else {
      return undefined;
    }
  }

  private createStructuredQueryAttributeFilters(
    criterion: Criterion
  ): AbstractStructuredQueryFilters[] | undefined {
    const translatedFilters: AbstractStructuredQueryFilters[] = [];
    criterion.getAttributeFilters().forEach((attributeFilter) => {
      const filter = this.createAttributeFilter(attributeFilter);
      if (filter) {
        translatedFilters.push(filter);
      }
    });
    return translatedFilters.length > 0 ? translatedFilters : undefined;
  }

  public createAttributeFilter(attributeFilter: AttributeFilter): AbstractStructuredQueryFilters {
    const attributeCode = attributeFilter.getAttributeCode();
    if (attributeFilter.isConceptSet() && attributeFilter.getConcept()?.hasSelectedConcepts()) {
      return this.createAttributeConceptFilter(attributeCode, attributeFilter.getConcept());
    }
    if (
      attributeFilter.isReferenceSet() &&
      attributeFilter.getReference()?.isSelectedReferenceSet()
    ) {
      return this.createReferences(attributeCode, attributeFilter.getReference());
    }
    if (attributeFilter.isQuantitySet()) {
      return this.quantityFilterTranslator.translateQuantityAttributeFilter(
        attributeCode,
        attributeFilter.getQuantity()
      );
    }
  }

  private createStructuredQueryValueFilters(
    criterion: Criterion
  ): AbstractStructuredQueryFilters | undefined {
    const translatedFilters: AbstractStructuredQueryFilters[] = [];
    criterion.getValueFilters().forEach((valueFilter) => {
      if (valueFilter.getConcept()?.getSelectedConcepts().length > 0) {
        translatedFilters.push(this.createConceptValueFilter(valueFilter.getConcept()));
      }
      if (valueFilter.getQuantity()) {
        translatedFilters.push(
          this.quantityFilterTranslator.translateQuantityValueFilter(valueFilter.getQuantity())
        );
      }
    });
    return translatedFilters[0];
  }

  private createAttributeConceptFilter(
    attributeCode: TerminologyCode,
    conceptFilter: ConceptFilter
  ): ConceptAttributeFilter {
    const conceptAttributeFilter = new ConceptAttributeFilter(
      attributeCode,
      conceptFilter.getSelectedConcepts().map((concept) => concept.getTerminologyCode())
    );
    return conceptAttributeFilter;
  }

  private createConceptValueFilter(valueFilter: ConceptFilter): ConceptValueFilter | undefined {
    return new ConceptValueFilter(
      valueFilter.getSelectedConcepts().map((concept) => concept.getTerminologyCode())
    );
  }

  private createReferences(
    attributeCode: TerminologyCode,
    referenceFilter: ReferenceFilterFQ
  ): ReferenceFilterSQ {
    const translatedRefrenceFilter: ReferenceFilterSQ = new ReferenceFilterSQ(
      attributeCode,
      this.setEachLinkedCriteria(referenceFilter.getSelectedReferences())
    );
    return translatedRefrenceFilter;
  }

  private setEachLinkedCriteria(linkedCriteria: Criterion[]): StructuredQueryCriterion[] {
    const linkedCriteriaArray = new Array<StructuredQueryCriterion>();
    linkedCriteria.forEach((linkedCriterion) => {
      linkedCriteriaArray.push(this.assignStructuredQueryCriterionElements(linkedCriterion));
    });
    return linkedCriteriaArray;
  }

  private getConsent(): StructuredQueryCriterion[] {
    return [this.consentService.getConsentStructuredQueryCriterion()];
  }
}
