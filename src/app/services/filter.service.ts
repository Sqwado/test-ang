import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FilterService {
  filters = [
    { value: 'date', label: 'Date' },
    { value: 'date-reverse', label: 'Date (Reverse)' },
    { value: 'name', label: 'Name' },
    { value: 'name-reverse', label: 'Name (Reverse)' },
    { value: 'price', label: 'Price' },
    { value: 'price-reverse', label: 'Price (Reverse)' }
  ] as const;

  class = [
    "60",
    "70",
    "70 ti",
    "80",
    "90",
  ]

  filter: string = 'date-reverse'; // Valeur initiale du filtre
  searchQuery: string = ''; // Valeur initiale de la recherche
  selectedClass: string[] = [];

  getFilter(): string {
    return this.filter;
  }

  getSearchQuery(): string {
    return this.searchQuery;
  }

  getSelectedClass(): string[] {
    return this.selectedClass;
  }

  handleFilterChange(newFilter: string) {
    this.filter = newFilter;
    console.log('Filter changed to:', this.filter);
  }

  handleSearchChange(newSearch: string) {
    this.searchQuery = newSearch;
    console.log('Search changed to:', this.searchQuery);
  }

  clearClassFilter(): void {
    this.selectedClass = [];
  }

  handleClassChange(className: string): void {
    if (this.selectedClass.includes(className)) {
      this.selectedClass = this.selectedClass.filter(c => c !== className);
      console.log('Class removed:', className);
    } else {
      this.selectedClass = [...this.selectedClass, className];
      console.log('Class added:', className);
    }
  }
}
