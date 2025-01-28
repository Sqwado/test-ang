import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="header">
      <h1>Welcome to {{ title }}!</h1>
      <nav class="nav-bar">
        <ul>
          <li>
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          </li>
          <li>
            <a routerLink="/products" routerLinkActive="active">Products</a>
          </li>
          <li>
            <a routerLink="/cart" routerLinkActive="active">Cart</a>
          </li>
          <li>
            <a routerLink="/about" routerLinkActive="active">About</a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  standalone: true,
  styles: [`
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #333;
        color: #fff;
      }

      .nav-bar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 1rem;
        background-color: #333;
        color: #fff;
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 1rem;
      }
      li {
        margin: 0;
      }
      a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
      }
      a.active {
        text-decoration: underline;
      }
      a:hover {
        color: #ddd;
      }
  `]
})
export class AppHeaderComponent {
  @Input() title: string = 'Default Title';
}
