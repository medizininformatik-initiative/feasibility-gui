import { AttributeFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { BackendService } from '../modules/querybuilder/service/backend.service';
import { Criterion } from '../model/FeasibilityQuery/Criterion/Criterion';
import { CriterionHashService } from './CriterionService/CriterionHash.service';
import { FeatureService } from './Feature.service';
import { Injectable } from '@angular/core';
import { LoadUIProfileService } from './LoadUIProfile.service';
import { TerminologyCode, TerminologyEntry } from '../model/terminology/Terminology';
import { TimeRestriction } from '../model/FeasibilityQuery/TimeRestriction';
import { UIProfile } from '../model/terminology/UIProfile';
import { v3 as uuidv3 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { ValueFilter } from '../model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import {
  AttributeDefinition,
  ValueDefinition,
} from '../model/terminology/AttributeDefinitions/AttributeDefinition';
@Injectable({
  providedIn: 'root',
})
export class TermEntry2CriterionTranslatorService {
  private termEntry: TerminologyEntry;

  criterion: Criterion;

  private UiProfileService: LoadUIProfileService;

  private criterionHashService: CriterionHashService;

  constructor(private featureService: FeatureService) {
    this.criterion = new Criterion();
  }

  public translateTermEntry(termEntry: TerminologyEntry): Criterion {
    this.termEntry = termEntry;
    this.doTranslateTermEntry();
    return this.criterion;
  }

  private doTranslateTermEntry(): void {
    this.createCriterionFromTermEntry();
    this.applyUIProfileToCriterion();
  }

  private createCriterionFromTermEntry(): void {
    this.criterion.children = this.termEntry.children;
    this.criterion.context = this.termEntry.context;
    this.criterion.display = this.termEntry.display;
    this.criterion.entity = this.termEntry.entity;
    this.criterion.optional = this.termEntry.optional;
    this.criterion.termCodes = this.copyTermCodes();
    this.criterion.uniqueID = this.setuniqueID();
    this.criterion.criterionHash = this.createCriterionHash();
  }

  private createCriterionHash(): string {
    const termCode = this.criterion.termCodes[0];
    const context = this.termEntry.context;
    const hashCode = this.criterionHashService.createHash(context, termCode);
    return uuidv3(hashCode, BackendService.BACKEND_UUID_NAMESPACE);
  }

  private copyTermCodes(): TerminologyCode[] {
    const termCodes = new Array<TerminologyCode>();
    this.termEntry.termCodes?.forEach((termCode) => {
      termCodes.push(termCode);
    });
    return termCodes;
  }

  private setuniqueID(): string | undefined {
    if (!this.criterion.uniqueID) {
      return uuidv4();
    } else {
      return undefined;
    }
  }

  private applyUIProfileToCriterion(): void {
    this.UiProfileService.getUIProfile(this.criterion.criterionHash).subscribe((profile) => {
      this.addUIProfileElementsToCriterion(profile);
    });
  }

  private addUIProfileElementsToCriterion(profile: UIProfile): void {
    this.criterion.valueFilters[0] = this.getValueFilters(profile.valueDefinition);
    this.criterion.attributeFilters = this.getAttributeFilters(profile.attributeDefinitions);
    this.criterion.timeRestriction = this.addTimeRestriction();
  }

  private getValueFilters(valueDefinition: ValueDefinition): ValueFilter {
    const valueFilter = new ValueFilter();
    valueFilter.maxValue = valueDefinition.max;
    valueFilter.minValue = valueDefinition.min;
    valueFilter.precision = valueDefinition.precision;
    valueFilter.optional = valueDefinition?.optional;
    valueFilter.type = this.UiProfileService.setDefinitionType(valueDefinition.type);
    valueFilter.valueDefinition = this.UiProfileService.extractValueDefinition(valueDefinition);
    return valueFilter;
  }

  private getAttributeFilters(attributeDefinitions: AttributeDefinition[]): AttributeFilter[] {
    const attributeFilter = this.UiProfileService.extractAttributeFilters(attributeDefinitions);
    return attributeFilter;
  }

  private addTimeRestriction(): TimeRestriction | undefined {
    const useFeatureTimeRestrictions = this.featureService.useFeatureTimeRestriction();
    return this.termEntry.timeRestrictionAllowed && useFeatureTimeRestrictions
      ? new TimeRestriction()
      : undefined;
  }
}
