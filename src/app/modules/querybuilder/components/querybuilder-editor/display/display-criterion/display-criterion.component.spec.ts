import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisplayCriterionComponent } from './display-criterion.component'
import { QueryProviderService } from '../../../../service/query-provider.service'
import { DisplayValueFilterComponent } from '../display-value-filter/display-value-filter.component'
import { TranslateModule } from '@ngx-translate/core'
import { MaterialModule } from '../../../../../../layout/material/material.module'
import { MatDialogConfig } from '@angular/material/dialog'
import { EditSingleCriterionComponent } from '../../edit/edit-single-criterion/edit-single-criterion.component'
import { Query } from '../../../../model/api/query/query'
import { Criterion } from '../../../../model/api/query/criterion'

describe('DisplayCriterionComponent', () => {
  let component: DisplayCriterionComponent
  let fixture: ComponentFixture<DisplayCriterionComponent>
  let criterion = new Criterion()
  let query = new Query()

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayCriterionComponent, DisplayValueFilterComponent],
      imports: [MaterialModule, TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCriterionComponent)
    component = fixture.componentInstance

    query = QueryProviderService.createTestQuery()
    criterion = query.groups[0].inclusionCriteria[0][0]
    component.criterion = criterion
    component.query = query

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fire choose event', () => {
    spyOn(component.dialog, 'open')

    const dialogConfig = new MatDialogConfig()

    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.data = {
      criterion,
      query,
    }

    component.openDetailsPopUp()
    expect(component.dialog.open).toHaveBeenCalledWith(EditSingleCriterionComponent, dialogConfig)
  })

  it('should fire delete event', () => {
    spyOn(component.delete, 'emit')
    component.doDelete()
    expect(component.delete.emit).toHaveBeenCalledWith(criterion)
  })
})
