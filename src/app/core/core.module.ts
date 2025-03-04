import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  imports: [CommonModule, LayoutModule, SharedModule, OAuthModule.forRoot()],
  providers: [],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Core should only be imported to AppModule. It is already in place');
    }
  }
}
