import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserHasRoleDirective } from './user-has-role.directive';
import { DropGroupDirective } from './drop-group/drop-group.directive';

@NgModule({
  declarations: [UserHasRoleDirective, DropGroupDirective],
  imports: [CommonModule],
  exports: [UserHasRoleDirective, DropGroupDirective],
})
export class DirectivesModule {}
