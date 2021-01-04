import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'querybuilder',
  templateUrl: './querybuilder.component.html',
  styleUrls: ['./querybuilder.component.scss'],
})
export class QuerybuilderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // add codex backend service here
    //this.adminService.getUnapprovedUsers().subscribe()
  }
}
