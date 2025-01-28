import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-order-modal',
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="modal" [ngClass]="{'show': isOpen}" (click)="onBackdropClick($event)">
      <div class="modal-content" (click)="onModalContentClick($event)">
        <div class="modal-header">
          <h4 class="modal-title">Order Details</h4>
          <button type="button" class="close" (click)="close.emit()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form [formGroup]="orderForm">
            <div class="form-group">
              <label for="name">Name</label>
              <input id="name" type="text" formControlName="name" class="form-control" />
              <div *ngIf="orderForm.controls['name'].invalid && orderForm.controls['name'].touched" class="error-message">
                Name is required.
              </div>
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input id="address" type="text" formControlName="address" class="form-control" />
              <div *ngIf="orderForm.controls['address'].invalid && orderForm.controls['address'].touched" class="error-message">
                Address is required and must be a valid address.
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" (click)="close.emit()">Cancel</button>
          <button type="button" (click)="confirmOrder()" [disabled]="orderForm.invalid">Confirm</button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7); /* Darker backdrop */
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        }

        .modal.show {
        display: flex;
        }

        .modal-content {
        background-color: #fff;
        padding: 1.5rem;
        border-radius: 12px; /* Softened corners */
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2); /* Stronger shadow */
        width: 90%;
        max-width: 500px;
        transition: transform 0.3s ease-in-out;
        transform: translateY(-30px); /* Slightly raised effect */
        }

        .modal.show .modal-content {
        transform: translateY(0); /* Smooth transition into view */
        }

        .modal-header, .modal-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        }

        .modal-header h4 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: bold;
        color: #333; /* Darker header text */
        }

        .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 1rem; /* Add space between buttons */
        }

        .modal-footer button {
        padding: 0.75rem 1.5rem;
        border: none;
        background-color: #007bff;
        color: white;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
        }

        .modal-footer button:hover {
        background-color: #0056b3;
        }

        .close {
        font-size: 1.5rem;
        background: none;
        border: none;
        color: #333;
        cursor: pointer;
        transition: color 0.3s ease;
        }

        .close:hover {
        color: #ff5733; /* Change close icon color on hover */
        }

        .form-group {
        margin-bottom: 1.25rem;
        }

        label {
        display: block;
        font-weight: 600;
        color: #555; /* Slightly lighter text */
        margin-bottom: 0.5rem;
        }

        input[type="text"] {
        width: calc(100% - 1.5rem);
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        color: #333;
        background-color: #f9f9f9;
        transition: border-color 0.3s ease, background-color 0.3s ease;
        }

        input[type="text"]:focus {
        border-color: #007bff;
        background-color: #fff;
        }

        .error-message {
          color: red;
          font-size: 0.875rem;
        }
  `]
})
export class OrderModalComponent {
    @Output() close = new EventEmitter<void>();
    @Output() confirm = new EventEmitter<void>();

    orderForm: FormGroup;
    isOpen: boolean = false;

    constructor() {
        this.orderForm = new FormGroup({
            name: new FormControl('', Validators.required), // Name is required
            address: new FormControl('', [Validators.required, this.addressValidator]) // Address is required and custom validator
        });
    }

    // Custom validator for address (for example, it should contain at least 5 characters)
    addressValidator(control: AbstractControl) {
        if (control.value && control.value.length < 5) {
            return { 'addressInvalid': true };
        }
        return null;
    }

    open() {
        this.isOpen = true;
    }

    closeModal() {
        this.isOpen = false;
    }

    onBackdropClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            this.closeModal();
        }
    }

    onModalContentClick(event: MouseEvent) {
        event.stopPropagation();
    }

    confirmOrder() {
        if (this.orderForm.valid) {
            this.confirm.emit();
        }
    }
}
