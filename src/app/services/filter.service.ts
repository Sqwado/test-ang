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

  filter: string = 'date-reverse'; // Valeur initiale du filtre
  searchQuery: string = ''; // Valeur initiale de la recherche

  getFilter(): string {
    return this.filter;
  }

  getSearchQuery(): string {
    return this.searchQuery;
  }

  handleFilterChange(newFilter: string) {
    this.filter = newFilter;
    console.log('Filter changed to:', this.filter);
  }

  handleSearchChange(newSearch: string) {
    this.searchQuery = newSearch;
    console.log('Search changed to:', this.searchQuery);
  }
}
