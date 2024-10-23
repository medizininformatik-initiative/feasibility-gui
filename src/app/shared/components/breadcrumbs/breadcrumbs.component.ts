import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface Breadcrumb {
  label: string
  url: string
}

@Component({
  selector: 'num-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Array<{ label: string; url: string }> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbs = this.buildBreadcrumb(this.activatedRoute.root);
      this.breadcrumbs = [{ label: 'Data Query', url: 'data-query' }, ...this.breadcrumbs];
    });
  }

  buildBreadcrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Array<{ label: string; url: string }> = []
  ): Array<{ label: string; url: string }> {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;

        const label = child.snapshot.data.breadcrumb;
        if (label) {
          breadcrumbs.push({ label, url });
        }
      }

      return this.buildBreadcrumb(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  public navigateToDataQueryEditor() {
    this.router.navigate(['/data-query'], { state: { preventReset: true } });
  }
}
