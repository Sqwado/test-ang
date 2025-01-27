import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filter-dropdown',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-dropdown">
      <label for="filter">Filter by:</label>
      <select 
        id="filter" 
        [(ngModel)]="filterService.filter">
        <option *ngFor="let filter of filterService.filters" [value]="filter.value">
          {{ filter.label | titlecase }}
        </option>
      </select>
    </div>
  `,
  styles: [`
    .filter-dropdown {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    label {
      font-weight: bold;
    }

    select {
      padding: 0.5rem;
      font-size: 1rem;
    }
  `],
  standalone: true
})
export class FilterDropdownComponent {
  filterService = inject(FilterService);
}
