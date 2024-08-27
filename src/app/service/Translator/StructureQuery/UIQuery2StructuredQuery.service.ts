import { AbstractStructuredQueryFilters } from '../../../model/StructuredQuery/Criterion/AttributeFilters/AbstractStructuredQueryFilters';
import { ConceptAttributeFilter } from '../../../model/StructuredQuery/Criterion/AttributeFilters/ConceptFilter/ConceptAttributeFilter';
import { ConceptFilter } from '../../../model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ConceptFilter';
import { ConceptValueFilter } from '../../../model/StructuredQuery/Criterion/AttributeFilters/ConceptFilter/ConceptValueFilter';
import { Criterion } from '../../../model/FeasibilityQuery/Criterion/Criterion';
import { CriterionProviderService } from '../../Provider/CriterionProvider.service';
import { FeasibilityQuery } from '../../../model/FeasibilityQuery/FeasibilityQuery';
import { FeatureService } from '../../Feature.service';
import { Injectable } from '@angular/core';
import { ObjectHelper } from '../../../modules/querybuilder/controller/ObjectHelper';
import { ReferenceFilter as ReferenceFilterSQ } from '../../../model/StructuredQuery/Criterion/AttributeFilters/ReferenceFilter/ReferenceFilter';
import { ReferenceFilter as ReferenceFilterFQ } from '../../../model/FeasibilityQuery/Criterion/AttributeFilter/Concept/ReferenceFilter';
import { StructuredQuery } from '../../../model/StructuredQuery/StructuredQuery';
import { StructuredQueryCriterion } from '../../../model/StructuredQuery/Criterion/StructuredQueryCriterion';
import { TerminologyCode } from '../../../model/Terminology/TerminologyCode';
import { ValueFilter } from '../../../model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import { TimeRestrictionTranslationService } from '../Shared/TimeRestrictionTranslation.service';
import { QuantityFilterTranslatorService } from './QuantityFilterTranslator.service';
import { TerminologyCodeTranslator } from '../Shared/TerminologyCodeTranslator.service';

@Injectable({
  providedIn: 'root',
})
export class UIQuery2StructuredQueryService {
  constructor(
    private featureService: FeatureService,
    private criterionProvider: CriterionProviderService,
    private timeRestrictionTranslation: TimeRestrictionTranslationService,
    private quantityFilterTranslator: QuantityFilterTranslatorService,
    private terminologyTranslator: TerminologyCodeTranslator
  ) {}

  public translateToStructuredQuery(feasibilityQuery: FeasibilityQuery): StructuredQuery {
    const structuredQuery = new StructuredQuery();
    if (feasibilityQuery.getDisplay()) {
      structuredQuery.display = feasibilityQuery.getDisplay();
    }
    //const group: Group = feasibilityQuery.groups[0];
    const inclusionCriteria = feasibilityQuery.getInclusionCriteria();
    const exclusionCriteria = feasibilityQuery.getExclusionCriteria();

    structuredQuery.inclusionCriteria = this.translateInclusionCriteria(inclusionCriteria);
    structuredQuery.exclusionCriteria = this.translateExclusionCriteria(exclusionCriteria);
    if (feasibilityQuery.getConsent()) {
      structuredQuery.inclusionCriteria.push(this.getConsent());
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
    const structuredQueryCriterion = new StructuredQueryCriterion();
    structuredQueryCriterion.attributeFilters = this.translateAttributeFilters(criterion);
    structuredQueryCriterion.context = this.addContextToStructuredQuery(criterion);
    structuredQueryCriterion.termCodes = this.terminologyTranslator.translateTermCodes(
      criterion.getTermCodes()
    );
    structuredQueryCriterion.timeRestriction =
      this.timeRestrictionTranslation.translateTimeRestrictionToStructuredQuery(
        criterion.getTimeRestriction()
      );
    structuredQueryCriterion.valueFilter = this.translateValueFilter(criterion);
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
      const attributeCode = attributeFilter.getAttributeCode();
      if (attributeFilter.isConceptSet() && attributeFilter.getConcept()?.hasSelectedConcepts()) {
        const conceptFilter = this.createAttributeConceptFilter(attributeFilter.getConcept());
        conceptFilter.attributeCode = attributeCode;
        translatedFilters.push(conceptFilter);
      }
      if (
        attributeFilter.isReferenceSet() &&
        attributeFilter.getReference()?.isSelectedReferenceSet()
      ) {
        const referenceFilter = this.createReferences(attributeFilter.getReference());
        referenceFilter.attributeCode = attributeCode;
        translatedFilters.push(referenceFilter);
      }
      if (attributeFilter.isQuantitySet()) {
        const quantityFilter = this.quantityFilterTranslator.translateQuantityFilter(
          attributeFilter.getQuantity()
        );
        quantityFilter.attributeCode = attributeCode;
        translatedFilters.push(quantityFilter);
      }
    });
    return translatedFilters.length > 0 ? translatedFilters : undefined;
  }

  private createStructuredQueryValueFilters(
    criterion: Criterion
  ): AbstractStructuredQueryFilters | undefined {
    const translatedFilters: AbstractStructuredQueryFilters[] = [];
    criterion.getValueFilters().forEach((valueFilter) => {
      if (valueFilter.getConcept()?.getSelectedConcepts()) {
        translatedFilters.push(this.createAttributeConceptFilter(valueFilter.getConcept()));
      }
      if (valueFilter.getQuantity()) {
        translatedFilters.push(
          this.quantityFilterTranslator.translateQuantityFilter(valueFilter.getQuantity())
        );
      }
    });
    return translatedFilters[0];
  }

  private createAttributeConceptFilter(conceptFilter: ConceptFilter): ConceptAttributeFilter {
    const conceptAttributeFilter = new ConceptAttributeFilter();
    conceptAttributeFilter.selectedConcepts = Array.from(conceptFilter.getSelectedConcepts());
    return conceptAttributeFilter;
  }

  private setConceptValueFilter(valueFilter: ValueFilter): ConceptValueFilter | undefined {
    const conceptFilter = new ConceptValueFilter();
    if (valueFilter.getConcept()?.getSelectedConcepts().length > 0) {
      conceptFilter.selectedConcepts = Array.from(valueFilter.getConcept().getSelectedConcepts());
      return conceptFilter;
    } else {
      return undefined;
    }
  }

  private createReferences(referenceFilter: ReferenceFilterFQ): ReferenceFilterSQ {
    const translatedRefrenceFilter: ReferenceFilterSQ = new ReferenceFilterSQ();
    translatedRefrenceFilter.criteria = this.setEachLinkedCriteria(
      referenceFilter.getSelectedReferences()
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
    return [
      {
        termCodes: [
          new TerminologyCode(
            '2.16.840.1.113883.3.1937.777.24.5.3.8',
            'MDAT wissenschaftlich nutzen EU DSGVO NIVEAU',
            'urn:oid:2.16.840.1.113883.3.1937.777.24.5.3'
          ),
        ],
        context: new TerminologyCode('Einwilligung', 'Einwilligung', 'fdpg.mii.cds', '1.0.0'),
      },
    ];
  }
}
