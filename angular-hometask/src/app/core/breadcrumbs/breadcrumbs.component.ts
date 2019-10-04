import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET, Params } from '@angular/router';
interface Breadcrumb {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbs: Breadcrumb[] = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      }
    });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'course';
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      url += `/${routeURL}`;

      const breadcrumb: Breadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url
      };
      breadcrumbs.push(breadcrumb);
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
