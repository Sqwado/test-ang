import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDropdownComponent } from './filter-dropdown.component';
import { FilterSearchComponent } from './filter-search.component';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, FilterDropdownComponent, FilterSearchComponent],
  template: `
    <div class="options">
      <app-filter-dropdown 
        [currentFilter]="currentFilter" 
        (filterChange)="onFilterChange($event)">
      </app-filter-dropdown>
      <app-filter-search 
        [searchQuery]="searchQuery"
        (searchChange)="onSearchChange($event)">
      </app-filter-search>
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
  @Input() currentFilter: string = '';
  @Input() searchQuery: string = '';
  @Output() filterChange = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();

  onFilterChange(newFilter: string) {
    this.filterChange.emit(newFilter);
  }

  onSearchChange(newSearch: string) {
    this.searchChange.emit(newSearch);
  }
}
