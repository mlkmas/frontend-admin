import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PartnersService } from '../../services/partners.service';
import { Package, Question, Product, PackageModel } from '../../models/package.model';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import{MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-package-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './package-management.component.html',
  styleUrls: ['./package-management.component.css']
})
export class PackageManagementComponent implements OnInit {
  packages: Package[] = [];
  availableServices: Product[] = [];
  availableProducts: Product[] = [];
  displayedColumns: string[] = ['name', 'price', 'actions'];
  isLoading = false;
  error: string | null = null;
  
  // Package management
  selectedPackage: Package | null = null;
  showQuestionForm = false;
  newQuestion: Question = {
    id: '',
    text: '',
    type: 0,
    expectedAnswer: '',
    mandatory: true
  };
  
  // New package form
  showNewPackageForm = false;
  newPackage: Partial<Package> = {
    packageName: '',
    currency: 'USD',
    active: true,
    questions: [],
    serviceProducts: [],
    stockProducts: [],
    regionDTOs: []
  };
  selectedServiceId: string | null = null;
  selectedProductId: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { partnerId: string },
    private partnersService: PartnersService,
    private dialogRef: MatDialogRef<PackageManagementComponent>
  ) {}

  ngOnInit(): void {
    this.loadPackages();
    this.loadAvailableServices();
  }

  loadPackages(): void {
    this.isLoading = true;
    this.partnersService.getPartnerPackages(this.data.partnerId).subscribe({
      next: (data) => {
        this.packages = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load packages';
        this.isLoading = false;
      }
    });
  }

  loadAvailableServices(): void {
    this.isLoading = true;
    this.partnersService.getAvailableServices().subscribe({
      next: (data) => {
        this.availableServices = data.services;
        this.availableProducts = data.products;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load available services';
        this.isLoading = false;
      }
    });
  }

  selectPackage(pkg: Package): void {
    this.selectedPackage = pkg;
    this.showQuestionForm = false;
  }

  showAddQuestionForm(): void {
    this.newQuestion = {
      id: this.generateGuid(),
      text: '',
      type: 0,
      expectedAnswer: '',
      mandatory: true
    };
    this.showQuestionForm = true;
  }

  addQuestion(): void {
    if (!this.selectedPackage || !this.newQuestion.text) return;
    
    this.selectedPackage.questions.push({...this.newQuestion});
    this.saveQuestions();
    this.showQuestionForm = false;
  }

  removeQuestion(questionId: string): void {
    if (!this.selectedPackage) return;
    this.selectedPackage.questions = this.selectedPackage.questions.filter(q => q.id !== questionId);
    this.saveQuestions();
  }

  saveQuestions(): void {
    if (!this.selectedPackage) return;
    
    this.isLoading = true;
    this.partnersService.updatePackageQuestions(
      this.data.partnerId,
      this.selectedPackage.id,
      this.selectedPackage.questions
    ).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to save questions';
        this.isLoading = false;
      }
    });
  }

  showCreatePackageForm(): void {
    this.newPackage = {
      packageName: '',
      currency: 'USD',
      active: true,
      questions: [],
      serviceProducts: [],
      stockProducts: [],
      regionDTOs: []
    };
    this.selectedServiceId = null;
    this.selectedProductId = null;
    this.showNewPackageForm = true;
  }

  addNewPackage(): void {
    if (!this.newPackage.packageName || !this.selectedServiceId) {
      this.error = 'Package name and service are required';
      return;
    }

    // Find selected service and product
    const selectedService = this.availableServices.find(s => s.id === this.selectedServiceId);
    const selectedProduct = this.selectedProductId 
      ? this.availableProducts.find(p => p.id === this.selectedProductId)
      : null;

    if (!selectedService) {
      this.error = 'Please select a service';
      return;
    }

    this.isLoading = true;
    
    const packageToAdd = new PackageModel(
      this.generateGuid(),
      '', // vat
      '', // country
      '', // countryCode
      '', // city
      this.newPackage.packageName || '',
      this.newPackage.currency || 'USD',
      {}, // extraDetails
      selectedService ? [selectedService] : [],
      selectedProduct ? [selectedProduct] : [],
      [], // questions
      [], // regionDTOs
      { // priceDTO
        netPrice: 0,
        totalPrice: 0,
        price: 0,
        salePrice: 0,
        vat: 0,
        systemProfitPercentage: 0,
        salePercentage: 0
      },
      this.newPackage.active || true
    );

    this.partnersService.addPartnerPackage(this.data.partnerId, packageToAdd.toJson())
      .subscribe({
        next: () => {
          this.loadPackages();
          this.showNewPackageForm = false;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to add package';
          this.isLoading = false;
        }
      });
  }

  removePackage(packageId: string): void {
    this.isLoading = true;
    this.partnersService.removePackage(this.data.partnerId, packageId)
      .subscribe({
        next: () => {
          this.loadPackages();
          if (this.selectedPackage?.id === packageId) {
            this.selectedPackage = null;
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to remove package';
          this.isLoading = false;
        }
      });
  }

  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}