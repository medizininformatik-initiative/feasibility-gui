import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { FeatureProviderService } from 'src/app/service/FeatureProvider.service';
import { FeatureService } from '../../../../service/Feature.service';
import { HttpClient } from '@angular/common/http';
import { IAppConfig } from '../../../../config/app-config.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { StructuredQuery } from 'src/app/model/StructuredQuery/StructuredQuery';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  // eslint-disable-next-line
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'num-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  public features: IAppConfig;
  includeContext: boolean;
  query: FeasibilityQuery;
  stylesheet: string;
  translatedQueryv2: StructuredQuery;
  pollingTime: number;
  pollingIntervall: number;
  postmanTranslate: string;
  postmanSync: string;
  getResponse: string;
  fhirport: string;
  queryVersion: string;

  constructor(
    public featureService: FeatureService,
    public featureProviderService: FeatureProviderService,
    private queryService: FeasibilityQueryProviderService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.features = this.featureProviderService.getFeatures();
    this.stylesheet = this.features.stylesheet;
    this.queryService.getActiveFeasibilityQuery().subscribe((query) => {
      this.query = query;
    });
    this.pollingTime = this.features.options.pollingtimeinseconds;
    this.pollingIntervall = this.features.options.pollingintervallinseconds;
    this.fhirport = this.features.fhirport;
    this.queryVersion = this.features.queryVersion;
    this.includeContext = this.features.options.sendsqcontexttobackend;
  }

  setFeature(checked: MatCheckboxChange): void {
    switch (checked.source.id) {
      case 'multiplevaluedefinitions': {
        this.features.features.v2.multiplevaluedefinitions = checked.checked;
        break;
      }
      case 'multiplegroups': {
        this.features.features.v2.multiplegroups = checked.checked;
        break;
      }
      case 'dependentgroups': {
        this.features.features.v2.dependentgroups = checked.checked;
        break;
      }
      case 'timerestriction': {
        this.features.features.v2.timerestriction = checked.checked;
        break;
      }
      case 'displayvaluefiltericon': {
        this.features.features.extra.displayvaluefiltericon = checked.checked;
        break;
      }
      default:
        return null;
    }
    this.featureProviderService.storeFeatures(this.features);
  }

  setPollingTimes(): void {
    this.features.options.pollingtimeinseconds = this.pollingTime;
    this.features.options.pollingintervallinseconds = this.pollingIntervall;
    this.featureProviderService.storeFeatures(this.features);
  }

  setFhirPort(): void {
    this.features.fhirport = this.fhirport;
    this.featureProviderService.storeFeatures(this.features);
  }

  setSqContextBackend() {
    this.features.options.sendsqcontexttobackend = this.includeContext;
    this.featureProviderService.storeFeatures(this.features);
  }

  updateContextInSQ() {
    this.setSqContextBackend();
  }
}
