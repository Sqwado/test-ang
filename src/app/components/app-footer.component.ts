import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  template: `
    <div class="footer">
      <p>&copy; {{ currentYear }} All Rights Reserved</p>
    </div>
  `,
  styles: [`
    .footer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      width: 100%;
      background-color: #333;
      color: white;
    }
  `]
})
export class AppFooterComponent {
  currentYear: number = new Date().getFullYear();
}
