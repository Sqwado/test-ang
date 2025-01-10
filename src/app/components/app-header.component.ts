import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDropdownComponent } from './filter-dropdown.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FilterDropdownComponent],
  template: `
    <div class="header">
      <h1>Welcome to {{ title }}!</h1>
      <div class="options">
        <app-filter-dropdown 
          [currentFilter]="currentFilter" 
          (filterChange)="onFilterChange($event)">
        </app-filter-dropdown>
      </div>
    </div>
  `,
  styles: [`
    .header {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .options {
      display: flex;
      gap: 1rem;
    }

  `]
})
export class AppHeaderComponent {
  @Input() title: string = 'Default Title';
  @Input() currentFilter: string = '';
  @Output() filterChange = new EventEmitter<string>();

  onFilterChange(newFilter: string) {
    this.filterChange.emit(newFilter);
  }
}
