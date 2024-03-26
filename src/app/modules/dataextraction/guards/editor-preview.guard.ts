import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class PreviewPermissionSerive {
  constructor(private dataService: DataService, private router: Router) {}

  canActivate(): boolean {
    if (this.dataService.hasData()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

export const EditorPreviewGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => inject(PreviewPermissionSerive).canActivate();
