import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, mergeMap, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabTitleService {
  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {}

  public initializeTitleListener() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route.root),
        map((rootRoute) => {
          while (rootRoute.firstChild) {
            rootRoute = rootRoute.firstChild;
          }
          return rootRoute;
        }),
        switchMap((route) => route.data),
        switchMap((data) => this.translate.get(data.title))
      )
      .subscribe((translatedTitle) => {
        this.titleService.setTitle(translatedTitle);
      });
  }
}
