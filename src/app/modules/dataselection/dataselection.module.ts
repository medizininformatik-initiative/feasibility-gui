import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataselectionRoutingModule } from './dataselection-routing.module';
import { DataselectionEditorComponent } from './components/dataselection-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { QuerybuilderModule } from '../querybuilder/querybuilder.module';
import { DisplayGroupComponent } from './components/display-group/display-group.component';
import { ResultSimpleComponent } from './components/result/result-simple/result-simple.component';
import { SaveDialogComponent } from './components/save/save-dialog/save-dialog.component';
import { UploadDataselectionComponent } from './components/upload/upload-dataselection/upload-dataselection.component';
import { RatingDialogComponent } from './components/rating/rating-dialog/rating-dialog.component';
import { RatingOverviewComponent } from './components/rating/rating-overview/rating-overview.component';
@NgModule({
  declarations: [
    DataselectionEditorComponent,
    DisplayGroupComponent,
    ResultSimpleComponent,
    SaveDialogComponent,
    UploadDataselectionComponent,
    RatingDialogComponent,
    RatingOverviewComponent,
  ],
  imports: [
    CommonModule,
    DataselectionRoutingModule,
    SharedModule,
    LayoutModule,
    QuerybuilderModule,
  ],
})
export class DataselectionModule {}
