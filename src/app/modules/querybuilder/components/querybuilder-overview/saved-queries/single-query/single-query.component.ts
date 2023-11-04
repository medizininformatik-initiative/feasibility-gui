import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'num-single-query',
  templateUrl: './single-query.component.html',
  styleUrls: ['./single-query.component.scss'],
})
export class SingleQueryComponent implements OnInit {
  @Input()
  singleQuery;

  constructor() {}

  ngOnInit(): void {}
}
