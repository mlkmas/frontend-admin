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
    this.error = null;
    
    this.partnersService.getPartnerExtraDetails(this.data.partnerId).subscribe({
      next: (extra) => {
        const regionDTOs = extra?.regions || [];

    
        this.partnersService.getAvailableServices(regionDTOs).subscribe({
          next: (data) => {
            this.availableServices = data.services || [];
            this.availableProducts = data.products || [];
            this.isLoading = false;
          },
          error: (err) => {
            this.error = 'Failed to load services: ' + err.message;
            this.isLoading = false;
            this.availableServices = [];
            this.availableProducts = [];
          }
        });
      },
      error: (err) => {
        this.error = 'Failed to load partner details: ' + err.message;
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
  
    // Create a new question object without ID (let backend generate it)
    const questionToAdd: Question = {
      text: this.newQuestion.text,
      type: 0,
      expectedAnswer: '',
      mandatory: true
    };
  
    this.selectedPackage.questions.push(questionToAdd);
    this.saveQuestions();
    this.showQuestionForm = false;
  }
  
  

  removeQuestion(questionId: string): void {
    if (!this.selectedPackage) return;
    this.selectedPackage.questions = this.selectedPackage.questions.filter(q => q.id !== questionId);
    this.saveQuestions();
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
    // Validate required fields
    if (!this.newPackage.packageName) {
      this.error = 'Package name is required';
      return;
    }
    
    if (!this.selectedServiceId) {
      this.error = 'Please select a service';
      return;
    }
  
    // Find selected service and product
    const selectedService = this.availableServices.find(s => s.id === this.selectedServiceId);
    if (!selectedService) {
      this.error = 'Invalid service selected';
      return;
    }
  
    const selectedProduct = this.selectedProductId 
      ? this.availableProducts.find(p => p.id === this.selectedProductId)
      : null;
  
    this.isLoading = true;
    
    // Create package using PackageModel
    const packageToAdd = new PackageModel(
      this.generateGuid(),
      '',
      '',
      '',
      '',
      this.newPackage.packageName || '',
      this.newPackage.currency || 'USD',
      {},
      [selectedService],
      selectedProduct ? [selectedProduct] : [],
      [],
      [],
      {
        netPrice: 0,
        totalPrice: 0,
        price: 0,
        salePrice: 0,
        vat: 0,
        systemProfitPercentage: 0,
        salePercentage: 0
      },
      true
    );
  
    this.partnersService.getPartnerExtraDetails(this.data.partnerId).subscribe({
      next: (extra) => {
        const regions = extra?.regions ?? [];
    
        const packageToAdd = new PackageModel(
          this.generateGuid(),
          '',
          '',
          '',
          '',
          this.newPackage.packageName || '',
          this.newPackage.currency || 'USD',
          {},
          [selectedService],
          selectedProduct ? [selectedProduct] : [],
          [], // questions
          regions, // 
          {
            netPrice: 0,
            totalPrice: 0,
            price: 0,
            salePrice: 0,
            vat: 0,
            systemProfitPercentage: 0,
            salePercentage: 0
          },
          true
        );
    
        this.partnersService.addPartnerPackage(this.data.partnerId, packageToAdd.toJson())
        .subscribe({
          next: () => {
            this.loadPackages();
            this.showNewPackageForm = false;
            this.isLoading = false;
            this.error = null;
          },
          error: (err) => {
            this.error = 'Failed to add package: ' + (err.error?.message || err.message);
            this.isLoading = false;
          }
        });
        
      },
      error: (err) => {
        this.error = 'Failed to load partner region: ' + err.message;
        this.isLoading = false;
      }
    });
    
  }

  saveQuestions(): void {
    if (!this.selectedPackage) return;
    
    this.isLoading = true;
    this.error = null;
    
    // Create a clean array of questions without any undefined/null values
    const questionsToSend = this.selectedPackage.questions.map(q => ({
      text: q.text || '',          // Ensure text is never null/undefined
      type: q.type || 0,           // Default to type 0 if not specified
      expectedAnswer: q.expectedAnswer || '',
      mandatory: q.mandatory !== false // Default to true if not specified
    }));
  
    // Filter out empty questions if needed
    const validQuestions = questionsToSend.filter(q => q.text.trim().length > 0);
  
    this.partnersService.updatePackageQuestions(
      this.data.partnerId,
      this.selectedPackage.id,
      validQuestions
    ).subscribe({
      next: () => {
        this.isLoading = false;
        this.loadPackages(); // Refresh the list
        this.showQuestionForm = false; // Hide the form on success
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Failed to save questions: ' + 
          (err.error?.message || err.message || 'Unknown error');
        
        // Optional: maintain a local copy of previous state to revert to
        // instead of just popping the last question
        console.error('Question update failed:', err);
      }
    });
  }
  removePackage(packageId: string): void {
    if (!confirm('Are you sure you want to delete this package?')) return;
    
    this.isLoading = true;
    this.error = null;
    
    this.partnersService.removePackage(this.data.partnerId, packageId)
      .subscribe({
        next: () => {
          this.packages = this.packages.filter(p => p.id !== packageId);
          if (this.selectedPackage?.id === packageId) {
            this.selectedPackage = null;
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.error = err.message;
          this.isLoading = false;
          // Optional: reload packages to sync with server
          this.loadPackages();
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