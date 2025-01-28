import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppNavbarComponent } from './app-navbar.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, AppNavbarComponent],
  template: `
    <div class="header">
      <h1>Welcome to {{ title }}!</h1>
      <app-navbar></app-navbar>
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
  `]
})
export class AppHeaderComponent {
  @Input() title: string = 'Default Title';
}