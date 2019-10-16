import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET, Params, UrlSegment } from '@angular/router';
import { IBreadcrumb } from 'src/app/interfaces/breadcrumb.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
  /* changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None */
})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbs: IBreadcrumb[] = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      }
    });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      if (child.outlet !== 'primary') {
        continue;
      }
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      const routeURL: string = child.snapshot.url.slice(-1).pop().path;
      const fullURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      url += `/${fullURL}`;
      let finalURL: string;

      if (routeURL === 'new') {
        finalURL = 'New video course';
      } else {
        finalURL = `Video Course ${routeURL}`;
      }

      const breadcrumb: IBreadcrumb = {
        label: finalURL,
        params: child.snapshot.params, // don't need this stuff now but maybe need later
        url // don't need this stuff now but maybe need later
      };
      breadcrumbs.push(breadcrumb);
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

}