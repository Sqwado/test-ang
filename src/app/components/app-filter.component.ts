import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDropdownComponent } from './filter-dropdown.component';
import { FilterSearchComponent } from './filter-search.component';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, FilterDropdownComponent, FilterSearchComponent],
  template: `
    <div class="options">
      <app-filter-dropdown/>
      <app-filter-search/>
      <div>
      </div>
    </div>
  `,
  styles: [`
    .options {
      display: flex;
      justify-content: space-between; 
      align-items: center;
      gap: 1rem;
      padding: 1rem;
    }

    @media (max-width: 600px) {
      .options {
        flex-direction: column;
        align-items: stretch;
      }
    }

  `]
})
export class AppFilterComponent {
}
