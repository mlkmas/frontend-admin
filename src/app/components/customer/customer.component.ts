
import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultImgDirective } from '../../directives/default-img.directive';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, RouterModule, DefaultImgDirective],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  defaultImage: string = 'assets/defaultImg.jpg';
  actionInProgress: string | null = null;
  constructor(private customersService: CustomersService) {}

  ngOnInit() {
    this.getAllCustomers();
  }
  getAllCustomers() {
    this.customersService.getAllCustomers().subscribe({
      next: (data: Customer[]) => {
        this.customers = data.map(customer => ({
          ...customer,
          name: customer.name || customer.displayName || 'No Name',
          email: customer.email || '',
          phoneNumber: customer.phoneNumber || ''
        }));
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load customers.';
        this.isLoading = false;
      }
    });
  }

  toggleSuspension(customer: Customer) {
    const newSuspendedState = !customer.isSuspended;
    this.actionInProgress = customer.id;
    
    this.customersService.suspendUser(customer.id, newSuspendedState).subscribe({
      next: () => {
        customer.isSuspended = newSuspendedState;
        this.actionInProgress = null;
      },
      error: (error) => {
        this.errorMessage = `Failed to ${newSuspendedState ? 'suspend' : 'unsuspend'} user.`;
        this.actionInProgress = null;
      }
    });
  }
}