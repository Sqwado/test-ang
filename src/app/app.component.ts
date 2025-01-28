import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './components/app-header.component';
import { AppFooterComponent } from './components/app-footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, AppHeaderComponent, AppFooterComponent, RouterModule],
  template: `
    <div class="main">
      <app-header [title]="title"/>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
      <app-footer/>
    </div>
  `,
  styles: [
    `
    html, body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      height: 100%;
    }

    .main {
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      height: 100vh;
    }

    .content {
      display: flex;
      justify-content: center;
      flex-grow: 1;
    }

    .left {
      width: calc(100% - 200px);
    }

    .right {
      width: 200px;
      height: fit-content;
    }

    @media (max-width: 600px) {
      .left {
        width: 100%;
      }
      .right {
        width: 100%;
        margin-top: 1rem;
      }
    }

    `,
  ],
})
export class AppComponent {
  title = 'NVIDIA reseller';
}
