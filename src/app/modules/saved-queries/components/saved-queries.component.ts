import { Component, OnInit } from '@angular/core';
import {TerminologySystemProvider} from "../../../service/Provider/TerminologySystemProvider.service";

@Component({
  selector: 'num-saved-queries',
  templateUrl: './saved-queries.component.html',
  styleUrls: ['./saved-queries.component.scss'],
})
export class SavedQueriesComponent implements OnInit {
  constructor(private test1: TerminologySystemProvider) {}
  ngOnInit() {}
}

