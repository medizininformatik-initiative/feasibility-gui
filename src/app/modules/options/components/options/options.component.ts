import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { FeatureProviderService } from 'src/app/service/FeatureProvider.service';
import { HttpClient } from '@angular/common/http';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { StructuredQuery } from 'src/app/model/StructuredQuery/StructuredQuery';
import { AppConfigData } from 'src/app/config/model/AppConfig/AppConfigData';

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
  public features: AppConfigData;
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
    public featureProviderService: FeatureProviderService,
    private queryService: FeasibilityQueryProviderService
  ) {}

  ngOnInit(): void {
    this.stylesheet = this.features.stylesheet;
    this.queryService.getActiveFeasibilityQuery().subscribe((query) => {
      this.query = query;
    });
  }

  setFeature(checked: MatCheckboxChange): void {
    switch (checked.source.id) {
      default:
        return null;
    }
  }
}
