import { Component, OnDestroy, OnInit } from '@angular/core'
import { Query } from '../../../../model/api/query/query'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { BackendService } from '../../../../service/backend.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'num-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.scss'],
})
export class SaveDialogComponent implements OnInit, OnDestroy {
  private subscriptionResult: Subscription
  constructor(
    public queryProviderService: QueryProviderService,
    public backend: BackendService,
    private dialogRef: MatDialogRef<SaveDialogComponent, void>,
    private router: Router
  ) {}

  query: Query
  title = ''
  comment = ''

  ngOnInit(): void {
    this.query = this.queryProviderService.query()
  }
  ngOnDestroy(): void {
    this.subscriptionResult?.unsubscribe()
  }
  doSave(): void {
    this.subscriptionResult?.unsubscribe()
    this.subscriptionResult = this.backend
      .saveQuery(this.query, this.title, this.comment)
      .subscribe((response) => {
        console.log(response)
      })
    this.dialogRef.close()
    // this.router.navigate(['/querybuilder/overview'])
  }

  doDiscard(): void {
    this.dialogRef.close()
  }
}
