import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FeatureService } from '../../../../service/Feature.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { IAppConfig } from '../../../../config/app-config.model';
import { FeatureProviderService } from '../../../querybuilder/service/feature-provider.service';
import { MatRadioChange } from '@angular/material/radio';
import { ApiTranslator } from '../../../querybuilder/controller/ApiTranslator';
import { QueryOnlyV1, QueryOnlyV2 } from '../../../querybuilder/model/api/query/query';
import { QueryProviderService } from '../../../querybuilder/service/query-provider.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { UIQuery2StructuredQueryTranslatorService } from 'src/app/service/UIQuery2StructuredQueryTranslator.service';
import { StructuredQuery } from 'src/app/model/StructuredQuery/StructuredQuery';
import { Query } from 'src/app/model/FeasibilityQuery/Query';

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
  query: Query;
  stylesheet: string;
  translatedQueryv1: QueryOnlyV1;
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
    public queryProviderService: QueryProviderService,
    private http: HttpClient,
    private apiTranslator: ApiTranslator,
    private newTranslator: UIQuery2StructuredQueryTranslatorService
  ) {}

  ngOnInit(): void {
    this.features = this.featureProviderService.getFeatures();
    this.stylesheet = this.features.stylesheet;
    this.query = this.queryProviderService.query() as unknown as Query;
    this.pollingTime = this.features.options.pollingtimeinseconds;
    this.pollingIntervall = this.features.options.pollingintervallinseconds;
    this.fhirport = this.features.fhirport;
    this.queryVersion = this.features.queryVersion;
    this.includeContext = this.features.options.sendsqcontexttobackend;
    this.translatedQueryv2 = this.newTranslator.translateToStructuredQuery(this.query);
    //this.translatedQueryv2 = this.apiTranslator.translateToV2(this.query);

    /*    this.postQuery('translate').subscribe(
      (response) => {
        this.postmanTranslate = response;
        this.getResponse =
          'http://localhost:' +
          this.fhirport +
          '/fhir/' +
          this.postmanTranslate[0][0][0].replace(/\|/g, '%7c');
      },
      (error) => {
        console.log(error);
        this.getResponse = '';
      }
    );
    this.postQuery('sync').subscribe(
      (response) => {
        this.postmanSync = response;
      },
      (error) => {
        console.log(error);
      }
    );*/
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

  setStylesheet(style: MatRadioChange): void {
    const currentTheme = this.features.stylesheet;
    this.features.stylesheet = style.value;
    this.featureProviderService.storeFeatures(this.features);
    this.featureProviderService.setTheme(currentTheme, style.value);
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
    this.translateQueryVersion();
  }

  setQueryVersion(version: MatRadioChange): void {
    this.features.queryVersion = version.value;
    this.featureProviderService.storeFeatures(this.features);
    this.translateQueryVersion();
  }

  translateQueryVersion() {
    if (this.queryVersion === 'v1') {
      //this.translatedQueryv1 = this.apiTranslator.translateToV1(this.query);
    }
    if (this.queryVersion === 'v2') {
      //this.translatedQueryv2 = this.apiTranslator.translateToV2(this.query);
      this.translatedQueryv2 = this.newTranslator.translateToStructuredQuery(this.query);
    }
  }
  postQuery(modus: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'codex/json',
        Accept: 'internal/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    let url: string;
    if (modus === 'translate') {
      url = 'http://localhost:5000/query-translate';
    }
    if (modus === 'sync') {
      url = 'http://localhost:5000/query-sync';
    }

    if (this.queryVersion === 'v1') {
      return this.http.post(url, this.translatedQueryv1, httpOptions);
    }
    if (this.queryVersion === 'v2') {
      return this.http.post(url, this.translatedQueryv2, httpOptions);
    }
  }
}
