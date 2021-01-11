import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'num-querybuilder',
  templateUrl: './querybuilder-editor.component.html',
  styleUrls: ['./querybuilder-editor.component.scss'],
})
export class QuerybuilderEditorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // add codex backend service here
    // this.adminService.getUnapprovedUsers().subscribe()
  }
}
