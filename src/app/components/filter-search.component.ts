import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-search',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-search">
      <label for="search">Search:</label>
      <input 
        id="search" 
        type="text" 
        [(ngModel)]="searchQuery" 
        (ngModelChange)="onSearchChange($event)" 
        placeholder="Search...">
    </div>
  `,
  styles: [`
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
    }
  `],
  standalone: true
})
export class FilterSearchComponent {
  @Input() searchQuery: string = ''; // Valeur par défaut
  @Output() searchChange = new EventEmitter<string>();

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }
}
