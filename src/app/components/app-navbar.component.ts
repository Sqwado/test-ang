import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routesInfo } from '../app.routes';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="nav-bar">
      <ul>
        <ng-container *ngFor="let route of routes">
            <ng-container *ngIf="route.showInNav && !route.specilaComponent; else specialComponent">
              <a [routerLink]="route.route.path" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: route.exact }">
                <i *ngIf="route.iconClass" class="icon" [ngClass]="route.iconClass"></i> <span class="nav-text">{{ route.route.title }}</span>
              </a>
            </ng-container>
            <ng-template #specialComponent>
              <a [routerLink]="route.route.path" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: route.exact }" [ngClass]="{'absolute-link': !route.showInNav}">
                <ng-container *ngComponentOutlet="route.specilaComponent"></ng-container>
              </a>
            </ng-template>
        </ng-container>
      </ul>
    </nav>
  `,
  standalone: true,
  styles: [`
      .nav-bar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-top: 1rem;
        padding-bottom: 1rem;
        background-color: #333;
        color: #fff;
      }

      ul {
        width: 100%;
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }

      li {
        margin: 0;
      }

      a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        display: flex;
      }

      a.active {
        text-decoration: underline;
      }

      a:hover {
        color: #ddd;
      }

      .icon {
        margin-right: 0.5rem;
      }

      .absolute-link {
        position: absolute;
      }
  `]
})
export class AppNavbarComponent {
  routes = routesInfo;
}