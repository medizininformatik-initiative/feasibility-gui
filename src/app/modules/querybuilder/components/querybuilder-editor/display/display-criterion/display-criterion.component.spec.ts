import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayCriterionComponent } from './display-criterion.component'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { DisplayValueFilterComponent } from '../display-value-filter/display-value-filter.component'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog'
import { EditSingleCriterionComponent } from '../../edit/edit-single-criterion/edit-single-criterion.component'
import { Query } from '../../../../model/api/query/query'
import { Criterion } from '../../../../model/api/query/criterion'
import { ComponentType } from '@angular/cdk/overlay'
import { TemplateRef } from '@angular/core'
import { Observable, of } from 'rxjs'

describe('DisplayCriterionComponent', () => {
  let component: DisplayCriterionComponent
  let fixture: ComponentFixture<DisplayCriterionComponent>
  let criterion = new Criterion()
  let query = new Query()
  let dialog
  let dialogRef

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayCriterionComponent, DisplayValueFilterComponent],
      imports: [MaterialModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    dialogRef = {
      afterClosed(): Observable<any | undefined> {
        return of(new Query())
      },
    } as MatDialogRef<any>

    // noinspection JSUnusedLocalSymbols
    dialog = {
      open<T, D = any, R = any>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: MatDialogConfig<D>
      ): MatDialogRef<T, R> {
        return dialogRef
      },
    } as MatDialog

    fixture = TestBed.createComponent(DisplayCriterionComponent)
    component = fixture.componentInstance
    component.dialog = dialog

    query = QueryProviderService.createTestQuery()
    criterion = query.groups[0].inclusionCriteria[0][0]
    component.criterion = criterion
    component.query = query

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should open dialog and store query', () => {
    jest.spyOn(component.dialog, 'open').mockReturnValue(dialogRef)
    spyOn(component.storeQuery, 'emit')

    const dialogConfig = new MatDialogConfig()

    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      criterion,
      query,
    }

    component.openDetailsPopUp()
    expect(component.dialog.open).toHaveBeenCalledWith(EditSingleCriterionComponent, dialogConfig)
    expect(component.storeQuery.emit).toBeCalled()
  })

  it('should fire delete event', () => {
    spyOn(component.delete, 'emit')
    component.doDelete()
    expect(component.delete.emit).toHaveBeenCalledWith(criterion)
  })
})
