import { Component, OnInit } from '@angular/core'
import { Query } from '../../../../model/api/query/query'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'

@Component({
  selector: 'num-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss'],
})
export class SaveDialogComponent implements OnInit {
  constructor(
    public queryProviderService: QueryProviderService,
    private dialogRef: MatDialogRef<SaveDialogComponent, void>,
    private router: Router
  ) {}

  query: Query
  title = ''
  comment = ''

  savedQueries: Array<{
    query: Query
    title: string
    comment: string
    date: number
  }> = []

  ngOnInit(): void {
    this.query = this.queryProviderService.query()
    this.savedQueries = this.queryProviderService.loadQueries()
    if (this.savedQueries === undefined) {
      this.savedQueries = []
    }
  }

  doSave(): void {
    this.savedQueries.push({
      query: this.query,
      title: this.title,
      comment: this.comment,
      date: Date.now(),
    })
    this.queryProviderService.saveQueries(this.savedQueries)
    this.dialogRef.close()
    this.router.navigate(['/querybuilder/overview'])
  }

  doDiscard(): void {
    this.dialogRef.close()
  }
}
