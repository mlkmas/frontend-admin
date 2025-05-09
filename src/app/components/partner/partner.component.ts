// partner.component.ts
import { Component, OnInit } from '@angular/core';
import { PartnersService } from '../../services/partners.service';
import { Partner } from '../../models/partner.model'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultImgDirective } from '../../directives/default-img.directive';
import { PartnerDetailsComponent } from './../partner-details/partner-details.component';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


type PartnerStatus = 'pending' | 'active' | 'suspended';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule, DefaultImgDirective,MatIconModule,MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule],
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  partners: Partner[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;
  defaultImage: string = 'assets/defaultImg.jpg';
  actionInProgress: string | null = null;
  originalPartners: Partner[] = [];
  filteredPartners: Partner[] = [];

  // Form Controls
  searchControl = new FormControl('');
  statusFilterControl = new FormControl<PartnerStatus[]>([]);
  phoneFilterControl = new FormControl('all');
  
  // Sorting
  sortColumn = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private partnersService: PartnersService ,private dialog: MatDialog) {}

  ngOnInit() {
    this.getAllPartners();
   // React to filter changes
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.applyFilters());
      
    this.statusFilterControl.valueChanges
      .subscribe(() => this.applyFilters());
      
    this.phoneFilterControl.valueChanges
      .subscribe(() => this.applyFilters());
  }

  getAllPartners() {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.partnersService.getAllPartners().subscribe({
      next: (data: Partner[]) => {
        this.partners = data.map(partner => ({
          ...partner,
          name: partner.name || 'No Name',
          email: partner.email || 'No Email',
          phoneNumber: partner.phoneNumber || 'No Phone'
        }));
        this.originalPartners = [...this.partners];
        this.filteredPartners = [...this.partners];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load partners.';
        this.isLoading = false;
      }
    });
  }

  togglePartnerStatus(partner: Partner) {
    if (this.actionInProgress) return; // Prevent multiple clicks
    
    this.actionInProgress = partner.id;
    
    const operation = !partner.isApproved 
      ? this.partnersService.approvePartner(partner.id, true)
      : this.partnersService.suspendPartner(partner.id, !partner.isSuspended);

    operation.subscribe({
      next: () => {
        if (!partner.isApproved) {
          partner.isApproved = true;
          partner.isSuspended = false;
        } else {
          partner.isSuspended = !partner.isSuspended;
        }
        this.actionInProgress = null;
      },
      error: (error) => {
        console.error('Error updating partner status:', error);
        this.errorMessage = `Failed to ${!partner.isApproved ? 'approve' : partner.isSuspended ? 'reactivate' : 'suspend'} partner.`;
        this.actionInProgress = null;
      }
    });
  }


  getButtonText(partner: Partner): string {
    if (!partner.isApproved) return 'Approve';
    return partner.isSuspended ? 'Reactivate' : 'Suspend';
  }

  getButtonClass(partner: Partner): string {
    if (!partner.isApproved) return 'btn-success';
    return partner.isSuspended ? 'btn-info' : 'btn-warning';
  }
  showPartnerDetails(partner: Partner) {
    const dialogRef = this.dialog.open(PartnerDetailsComponent, {
      width: '900px',
      maxWidth: '900',
      maxHeight: '90vh',
      data: { partner }, // Pass the entire partner object
      panelClass: 'custom-dialog-container',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
    });
  }

  
  applyFilters(): void {
    let filtered = [...this.originalPartners];
    
    // Apply search filter
    const searchTerm = this.searchControl.value?.toLowerCase() || '';
    if (searchTerm) {
      filtered = filtered.filter(partner =>
        partner.name.toLowerCase().includes(searchTerm) ||
        partner.email.toLowerCase().includes(searchTerm) ||
        partner.phoneNumber.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply status filter
    const statusFilters = this.statusFilterControl.value || [];
    if (statusFilters.length > 0) {
      filtered = filtered.filter(partner => {
        const status = !partner.isApproved ? 'pending' : 
                      partner.isSuspended ? 'suspended' : 'active';
        return statusFilters.includes(status as PartnerStatus);
      });
    }
    
    // Apply phone filter
    const phoneFilter = this.phoneFilterControl.value;
    if (phoneFilter === 'with') {
      filtered = filtered.filter(partner => partner.phoneNumber && partner.phoneNumber !== 'No Phone');
    } else if (phoneFilter === 'without') {
      filtered = filtered.filter(partner => !partner.phoneNumber || partner.phoneNumber === 'No Phone');
    }
    
    // Apply sorting
    filtered = filtered.sort((a, b) => {
      const aValue = a[this.sortColumn as keyof Partner]?.toString().toLowerCase() || '';
      const bValue = b[this.sortColumn as keyof Partner]?.toString().toLowerCase() || '';
      const compare = aValue.localeCompare(bValue);
      return this.sortDirection === 'asc' ? compare : -compare;
    });
    
    this.filteredPartners = filtered;
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  resetFilters(): void {
    this.searchControl.setValue('');
    this.statusFilterControl.setValue([]);
    this.phoneFilterControl.setValue('all');
    this.sortColumn = 'name';
    this.sortDirection = 'asc';
    this.applyFilters();
  }

  
  
  
}