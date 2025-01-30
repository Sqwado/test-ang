import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDropdownComponent } from './filter-dropdown.component';
import { FilterSearchComponent } from './filter-search.component';
import {FilterClassComponent} from './filter-class.component';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, FilterDropdownComponent, FilterSearchComponent, FilterClassComponent],
  template: `
    <div class="options">
      <app-filter-dropdown/>
      <app-filter-search/>
      <app-filter-class/>
      <div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
    }

    .options {
      width: fit-content;
      display: flex;
      justify-content: space-between; 
      align-items: center;
      gap: 1rem;
      padding: 1rem;
    }

    @media (max-width: 600px) {
      .options {
        flex-direction: column;
        padding-left: 0.2rem;
        padding-right: 0;
      }
    }

  `]
})
export class AppFilterComponent {
}
