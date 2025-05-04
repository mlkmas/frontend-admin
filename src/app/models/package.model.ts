export interface Package {
    id: string;
    vat: string;
    country: string;
    countryCode: string;
    city: string;
    packageName: string;
    currency: string;
    extraDetails: Record<string, string>;
    serviceProducts: Product[];
    stockProducts: Product[];
    questions: Question[];
    regionDTOs: Region[];
    priceDTO: PriceDetails;
    active: boolean;
  }
  
  export interface Product {
    id: string;
    productCode: string;
    internalID: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    externalID: string;
    status: 'Publish' | 'Draft' | 'Archived'; // Enum for status
    salePercentage: number;
    systemProfitPercentage: number;
    generalCosts: number;
  }
  
  export interface Question {
    id: string;
    text: string;
    type: number; // 0 = Text, 1 = Multiple Choice, etc.
    expectedAnswer: string;
    mandatory: boolean;
  }
  
  export interface Region {
    id: string;
    countryCode: string;
    country: string;
    city: string;
  }
  
  export interface PriceDetails {
    netPrice: number;
    totalPrice: number;
    price: number;
    salePrice: number;
    vat: number;
    systemProfitPercentage: number;
    salePercentage: number;
  }
  
  // For form handling
  export interface PackageForm {
    packageName: string;
    currency: string;
    active: boolean;
    questions: QuestionForm[];
  }
  
  export interface QuestionForm {
    text: string;
    type: number;
    mandatory: boolean;
  }