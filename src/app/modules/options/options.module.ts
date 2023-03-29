import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent, SafePipe } from './components/options/options.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../../layout/material/material.module';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [OptionsComponent, SafePipe],
  imports: [CommonModule, OptionsRoutingModule, SharedModule, MaterialModule, LayoutModule],
})
export class OptionsModule {}
