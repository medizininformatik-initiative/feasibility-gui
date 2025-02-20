import { Component, OnInit } from '@angular/core';
import { TerminologySystemProvider } from 'src/app/service/Provider/TerminologySystemProvider.service';

@Component({
  selector: 'num-edit-feasibility-query',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditFeasibilityQueryComponent implements OnInit {
  constructor(private terminologySystemProvider: TerminologySystemProvider) {}

  ngOnInit(): void {}
}
