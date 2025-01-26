import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  template: `
    <div class="header">
      <h1>Welcome to {{ title }}!</h1>
    </div>
  `,
  styles: [`
    .header {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    h1 {
      margin: 0;
      padding: 0;
      font-size: 2rem;
      text-align: center;
    }
    
  `]
})
export class AppHeaderComponent {
  @Input() title: string = 'Default Title';
}
