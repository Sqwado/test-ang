import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filter-search',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-search">
      <label for="search">Search:</label>
      <input 
        id="search" 
        type="text" 
        [(ngModel)]="filterService.searchQuery"
        placeholder="Search...">
    </div>
  `,
  styles: [`
    :host {
      width: fit-content;
    }

    .filter-search {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    label {
      font-weight: bold;
    }

    input {
      padding: 0.5rem;
      font-size: 1rem;
      min-width: 200px;
      width: 100%;
    }

    @media (max-width: 600px) {
      .filter-search {
        gap: 0.5rem;
        flex-direction: column;

      }
    }
  `],
  standalone: true
})
export class FilterSearchComponent {
  filterService = inject(FilterService);
}
