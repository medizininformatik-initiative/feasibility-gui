import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataselectionRoutingModule } from './dataselection-routing.module';
import { DataselectionEditorComponent } from './components/dataselection-editor/dataselection-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/layout/layout.module';
import { ResultSimpleComponent } from './components/dataselection-editor/result/result-simple/result-simple.component';
import { SaveDialogComponent } from './components/dataselection-editor/save/save-dialog/save-dialog.component';
import { UploadDataselectionComponent } from './components/dataselection-editor/upload/upload-dataselection/upload-dataselection.component';
import { RatingDialogComponent } from './components/dataselection-editor/rating/rating-dialog/rating-dialog.component';
import { RatingOverviewComponent } from './components/dataselection-editor/rating/rating-overview/rating-overview.component';
import { QuerybuilderModule } from '../querybuilder/querybuilder.module';
import { DisplayGroupComponent } from './components/dataselection-editor/display/display-group/display-group.component';

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
