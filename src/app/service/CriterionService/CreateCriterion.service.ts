import { AnnotatedStructuredQueryIssue } from '../../model/result/AnnotatedStructuredQuery/AnnotatedStructuredQueryIssue';
import { AttributeFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/AttributeFilter';
import { BackendService } from '../../modules/querybuilder/service/backend.service';
import { CriteriaProfileData } from 'src/app/model/FeasibilityQuery/CriteriaProfileData';
import { Criterion } from 'src/app/model/FeasibilityQuery/Criterion/Criterion';
import { CriterionHashService } from './CriterionHash.service';
import { CriterionService } from '../CriterionService.service';
import { CritGroupPosition } from 'src/app/modules/querybuilder/controller/CritGroupArranger';
import { FeatureService } from '../Feature.service';
import { Injectable } from '@angular/core';
import { LoadUIProfileService } from '../LoadUIProfile.service';
import { finalize, Observable, of, Subject, switchMap, take } from 'rxjs';
import { SearchResultListItemSelectionService } from '../ElasticSearch/SearchTermListItemService.service';
import { TerminologyCode, TerminologyEntry } from 'src/app/model/terminology/Terminology';
import { TimeRestriction } from 'src/app/model/FeasibilityQuery/TimeRestriction';
import { UIProfile } from 'src/app/model/terminology/UIProfile';
import { v4 as uuidv4 } from 'uuid';
import { ValueFilter } from 'src/app/model/FeasibilityQuery/Criterion/AttributeFilter/ValueFilter';
import {
  AttributeDefinition,
  ValueDefinition,
} from 'src/app/model/terminology/AttributeDefinitions/AttributeDefinition';

@Injectable({
  providedIn: 'root',
})
export class CreateCriterionService {
  ids: Set<string> = new Set<string>();

  constructor(
    private criterionHashService: CriterionHashService,
    private featureService: FeatureService,
    private UiProfileService: LoadUIProfileService,
    private backend: BackendService,
    private listItemService: SearchResultListItemSelectionService,
    private criterionService: CriterionService
  ) {}

  public translateListItemsToCriterions() {
    this.listItemService
      .getSelectedSearchResultListItems()
      .pipe(take(1))
      .subscribe((listItems) => {
        listItems.forEach((listItem) => {
          this.ids.add(listItem.getId());
        });
        this.getCriteriaProfileData(this.ids);
      });
  }

  private getCriteriaProfileData(ids: Set<string>) {
    this.backend
      .getCriteriaProfileData(Array.from(this.ids))
      .pipe(
        switchMap((responses: any[]) => {
          const criteriaProfileDataArray = responses.map((response) => {
            const uiProfile = response.uiProfile;
            const context = response.context;
            const termCodes = response.termCodes;
            const id = response.id;

            return new CriteriaProfileData(id, uiProfile, context, termCodes);
          });
          return of(criteriaProfileDataArray);
        }),
        finalize(() => {
          this.ids.clear();
          this.listItemService.clearSelection();
        })
      )
      .subscribe(
        (criteriaProfileDataArray: CriteriaProfileData[] | null) => {
          criteriaProfileDataArray.forEach((criteriaProfileData) => {
            this.createCriterionFromProfileData(criteriaProfileData);
          });
          this.ids.clear();
        },
        (error) => {
          console.error('Error fetching criteria profile data:', error);
        }
      );
  }

  public createCriterionFromProfileData(criteriaProfileData: CriteriaProfileData) {
    const criterion: Criterion = new Criterion();
    criterion.criterionHash = criteriaProfileData.getId();
    const localUID = uuidv4();
    //criterion.display = criteriaProfileData.getTermCodes()[0].display;
    criterion.termCodes = this.copyTermCodes(criteriaProfileData.getTermCodes(), localUID);
    //criterion.isInvalid = invalidCriteriaIssues.length > 0;
    criterion.context = criteriaProfileData.getContext();
    criterion.uniqueID = localUID;
    criterion.position = new CritGroupPosition();
    this.addUIProfileElementsToCriterion(criteriaProfileData.getUiProfile(), criterion);
    this.criterionService.setCriterionByUID(criterion);
  }

  public createCriterionFromTermCode(
    termCodes: TerminologyCode[],
    context: TerminologyCode,
    invalidCriteriaIssues: AnnotatedStructuredQueryIssue[],
    uid?: string
  ): Observable<Criterion> {
    const criterion: Criterion = new Criterion();
    const subject = new Subject<Criterion>();
    const hash = this.criterionHashService.createHash(context, termCodes[0]);
    const localUID = uid ? uid : uuidv4();
    criterion.criterionHash = hash;
    criterion.display = termCodes[0].display;
    criterion.termCodes = this.copyTermCodes(termCodes, localUID);
    criterion.isInvalid = invalidCriteriaIssues.length > 0;
    criterion.uniqueID = localUID;
    criterion.position = new CritGroupPosition();
    // if (!criterion.isInvalid) {
    //   criterion.context = context;
    //   this.applyUIProfileToCriterion(hash).subscribe((critFromProfile) => {
    //     Object.assign(criterion, critFromProfile);
    //     criterion.termCodes = this.copyTermCodes(termCodes, uid);
    //     subject.next(criterion);
    //   });
    // } else {
    //   setTimeout(() => {
    //     this.snackbar.displayErrorMessage(this.snackbar.errorCodes['VAL-20001']);
    //     subject.next(criterion);
    //   }, 10);
    // }

    return subject.asObservable();
  }

  public createCriterionFromBackendTermCode(
    termCodes: TerminologyCode[],
    context: TerminologyCode,
    hash2: string,
    invalidCriteriaIssues: AnnotatedStructuredQueryIssue[],
    uid?: string
  ): Observable<Criterion> {
    const criterion: Criterion = new Criterion();
    const subject = new Subject<Criterion>();
    const hash = this.criterionHashService.createHash(context, termCodes[0]);
    const localUID = uid ? uid : uuidv4();
    criterion.criterionHash = hash;
    criterion.display = termCodes[0].display;
    criterion.termCodes = this.copyTermCodes(termCodes, localUID);
    criterion.isInvalid = invalidCriteriaIssues.length > 0;
    criterion.uniqueID = localUID;
    criterion.position = new CritGroupPosition();
    // if (!criterion.isInvalid) {
    //   criterion.context = context;
    //   this.applyUIProfileToCriterion(hash).subscribe((critFromProfile) => {
    //     Object.assign(criterion, critFromProfile);
    //     criterion.termCodes = this.copyTermCodes(termCodes, uid);
    //     subject.next(criterion);
    //   });
    // } else {
    //   setTimeout(() => {
    //     this.snackbar.displayErrorMessage(this.snackbar.errorCodes['VAL-20001']);
    //     subject.next(criterion);
    //   }, 10);
    //}

    return subject.asObservable();
  }
  public createReferenceCriterionFromTermCode(
    termCodes: TerminologyCode[],
    context: TerminologyCode
  ): Criterion {
    const criterion: Criterion = new Criterion();
    const hash = this.criterionHashService.createHash(context, termCodes[0]);
    criterion.context = context;
    criterion.criterionHash = hash;
    criterion.display = termCodes[0].display;
    criterion.uniqueID = uuidv4();
    criterion.termCodes = this.copyTermCodes(termCodes, criterion.uniqueID);
    criterion.isLinked = true;
    criterion.position = new CritGroupPosition();
    return criterion;
  }
  public createCriterionFromTermEntry(termEntry: TerminologyEntry): Observable<Criterion> {
    let criterion: Criterion;
    const subject = new Subject<Criterion>();
    this.createCriterionFromTermCode(
      termEntry.termCodes,
      termEntry.context,
      [],
      uuidv4()
    ).subscribe((crit) => {
      criterion = crit;
      criterion.optional = termEntry.optional;
      subject.next(criterion);
      subject.complete();
    });
    return subject.asObservable();
  }

  public createCriterionFromHashTermEntry(termEntry: TerminologyEntry): Observable<Criterion> {
    let criterion: Criterion;
    const subject = new Subject<Criterion>();
    this.backend.getTerminolgyTree(termEntry.id).subscribe((termEntryFromBackend) => {
      this.createCriterionFromBackendTermCode(
        termEntryFromBackend.termCodes,
        termEntryFromBackend.context,
        termEntryFromBackend.id,
        [],
        uuidv4()
      ).subscribe((crit) => {
        criterion = crit;
        criterion.optional = termEntryFromBackend.optional;
        subject.next(criterion);
        subject.complete();
      });
    });

    return subject.asObservable();
  }
  private copyTermCodes(termCodes: TerminologyCode[], uid?: string): TerminologyCode[] {
    const termCodeResult = new Array<TerminologyCode>();
    termCodes.forEach((termCode) => {
      if (uid) {
        termCode.uid = uid;
      }
      termCodeResult.push(termCode);
    });
    return termCodeResult;
  }

  // private applyUIProfileToCriterion(hash: string): Observable<Criterion> {
  //   let criterion: Criterion;
  //   const subject = new Subject<Criterion>();
  //   this.UiProfileService.getUIProfile(hash).subscribe((profile) => {
  //     criterion = this.addUIProfileElementsToCriterion(profile);
  //     subject.next(criterion);
  //   });
  //   return subject.asObservable();
  // }

  private addUIProfileElementsToCriterion(profile: UIProfile, criterion: Criterion): Criterion {
    criterion.attributeFilters = this.getAttributeFilters(profile.attributeDefinitions);
    //criterion.valueFilters = this.getValueFilters(profile.valueDefinition);
    criterion.timeRestriction = this.addTimeRestriction(profile.timeRestrictionAllowed);
    return criterion;
  }

  private getValueFilters(valueDefinition: ValueDefinition): ValueFilter[] {
    const valueFilter = new ValueFilter();
    if (valueDefinition !== null) {
      valueFilter.value = valueDefinition.min ? valueDefinition.min : 0;
      valueFilter.minValue = valueDefinition.min ? valueDefinition.min : 0;
      valueFilter.maxValue = valueDefinition.max ? valueDefinition.max : 0;
      valueFilter.min = valueDefinition.min;
      valueFilter.max = valueDefinition.max;
      valueFilter.precision = valueDefinition.precision;
      valueFilter.optional = valueDefinition?.optional;
      valueFilter.type = this.UiProfileService.setDefinitionType(valueDefinition.type);
      valueFilter.unit =
        valueDefinition?.allowedUnits.length > 0
          ? valueDefinition?.allowedUnits[0]
          : { code: '', display: '' };
      valueFilter.valueDefinition = this.UiProfileService.extractValueDefinition(valueDefinition);
      return [valueFilter];
    } else {
      return [];
    }
  }

  private getAttributeFilters(attributeDefinitions: AttributeDefinition[]): AttributeFilter[] {
    if (attributeDefinitions.length > 0) {
      const attributeFilter = this.UiProfileService.extractAttributeFilters(attributeDefinitions);
      return attributeFilter;
    } else {
      return [];
    }
  }

  private addTimeRestriction(timeRestrictionAllowed: boolean): TimeRestriction | undefined {
    const useFeatureTimeRestrictions = this.featureService.useFeatureTimeRestriction();
    return timeRestrictionAllowed && useFeatureTimeRestrictions ? new TimeRestriction() : undefined;
  }
}
