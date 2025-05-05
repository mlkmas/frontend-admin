
import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customer.service';
import { Customer, CustomerModel } from '../../models/customer.model'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultImgDirective } from '../../directives/default-img.directive';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, RouterModule, DefaultImgDirective,FormsModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  defaultImage: string = 'assets/defaultImg.jpg';
  actionInProgress: string | null = null;
  searchTerm: string = '';
currentPage: number = 1;
itemsPerPage: number = 20;
sortColumn: string = '';
sortDirection: 'asc' | 'desc' = 'asc';


  constructor(private customersService: CustomersService) {}

  ngOnInit() {
    this.getAllCustomers();
  }
  getAllCustomers() {
    this.customersService.getAllCustomers().subscribe({
      next: (data: any[]) => {
        this.customers = data.map(CustomerModel.fromJson);  // <— Now uses the class
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

  get filteredCustomers(): Customer[] {
    let filtered = this.customers;
  
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        (customer.isSuspended ? 'suspended' : 'active').includes(term)
      );
    }
  
    // Sorting
    if (this.sortColumn) {
      filtered = filtered.sort((a, b) => {
        const aValue = a[this.sortColumn as keyof Customer]?.toString().toLowerCase() || '';
        const bValue = b[this.sortColumn as keyof Customer]?.toString().toLowerCase() || '';
        const compare = aValue.localeCompare(bValue);
        return this.sortDirection === 'asc' ? compare : -compare;
      });
    }
  
    // Always show customers with phone first if sorting is not applied
    if (!this.sortColumn) {
      filtered = filtered.sort((a, b) => Number(!!b.phoneNumber) - Number(!!a.phoneNumber));
    }
  
    return filtered.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }
  toggleSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }
  getSortClass(column: string): string {
    if (this.sortColumn !== column) return 'sort-icon';
    return this.sortDirection === 'asc' ? 'sort-icon asc' : 'sort-icon desc';
  }
  
get totalPages(): number {
  return Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
}

goToPage(page: number) {
  this.currentPage = page;
}
resetFilters() {
  this.searchTerm = '';
  this.sortColumn = '';
  this.sortDirection = 'asc';
  this.currentPage = 1;
}

}