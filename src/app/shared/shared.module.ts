import { CommonModule } from '@angular/common';
import { DirectivesModule } from './directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from './components/shared-components.module';
import { TranslateModule } from '@ngx-translate/core';

const SHARED_MODULES = [
  TranslateModule,
  FormsModule,
  ReactiveFormsModule,
  DirectivesModule,
  SharedComponentsModule,
];
const SHARED_DECLARATIONS = [];

@NgModule({
  declarations: [...SHARED_DECLARATIONS],
  imports: [...SHARED_MODULES, CommonModule, LayoutModule],
  exports: [...SHARED_MODULES, ...SHARED_DECLARATIONS],
})
export class SharedModule {}
