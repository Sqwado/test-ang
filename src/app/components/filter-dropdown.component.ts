import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-dropdown',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-dropdown">
      <label for="filter">Filter by:</label>
      <select 
        id="filter" 
        [(ngModel)]="currentFilter" 
        (ngModelChange)="onFilterChange($event)">
        <option *ngFor="let filter of filters" [value]="filter.value">
          {{ filter.label | titlecase }}
        </option>
      </select>
    </div>
  `,
  standalone: true
})
export class FilterDropdownComponent {
  @Input() currentFilter: string = 'date-reverse'; // Valeur par défaut
  @Output() filterChange = new EventEmitter<string>();

  filters = [
    { value: 'date', label: 'Date' },
    { value: 'date-reverse', label: 'Date (Reverse)' },
    { value: 'name', label: 'Name' },
    { value: 'name-reverse', label: 'Name (Reverse)' },
    {value: 'price', label: 'Price'},
    {value: 'price-reverse', label: 'Price (Reverse)'}
  ] as const;

  onFilterChange(value: string) {
    this.filterChange.emit(value);
  }
}
