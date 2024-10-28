import { Component, OnInit } from '@angular/core';
import { FeasibilityQuery } from 'src/app/model/FeasibilityQuery/FeasibilityQuery';
import { FeasibilityQueryProviderService } from 'src/app/service/Provider/FeasibilityQueryProvider.service';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';

@Component({
  selector: 'num-edit-feasibility-query',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditFeasibilityQueryComponent implements OnInit {
  query: FeasibilityQuery;
  constructor(
    public queryService: FeasibilityQueryProviderService,
    private test1: TerminologySystemProvider
  ) {}

  ngOnInit(): void {
    this.queryService.getActiveFeasibilityQuery().subscribe((query) => {
      this.query = query;
    });
  }
}
