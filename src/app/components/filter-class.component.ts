import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filter-class',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter-dropdown">
      <label for="filter" (click)="toggleDropdown()">
        GPU Class ({{ filterService.selectedClass.length }} selected):
      </label>
      <div *ngIf="isDropdownOpen" class="dropdown-content">
        <label *ngFor="let c of filterService.class" class="checkbox-item">
          <input 
            type="checkbox" 
            [value]="c" 
            [checked]="filterService.selectedClass.includes(c)"
            (change)="onCheckboxChange($event, c)">
          {{c}}
        </label>
        <button (click)="clearClassFilter()">Clear Filter</button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      width: fit-content;
      font-family: Arial, sans-serif;
    } 

    .filter-dropdown {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: auto;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0.5rem;
      background-color: #f9f9f9;
    }

    label {
      font-weight: bold;
      cursor: pointer;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .dropdown-content {
      width: 100%;
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0.5rem;
      background-color: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .checkbox-item {
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    input[type="checkbox"] {
      margin-right: 0.5rem;
    }

    input[type="checkbox"]:hover {
      cursor: pointer;
    }

    button {
      margin-top: 0.5rem;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }
  `],
  standalone: true
})
export class FilterClassComponent {
  filterService = inject(FilterService);
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onCheckboxChange(event: Event, value: string) {
    this.filterService.handleClassChange(value);
  }

  clearClassFilter() {
    this.filterService.clearClassFilter();
  }
}
