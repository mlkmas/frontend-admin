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
    id?: string;
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
    toJson?: () => any; // Add this optional method to the interface
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

  // Add these to your package.model.ts

export class PackageModel implements Package {
  constructor(
    public id: string = '',
    public vat: string = '',
    public country: string = '',
    public countryCode: string = '',
    public city: string = '',
    public packageName: string = '',
    public currency: string = 'USD',
    public extraDetails: Record<string, string> = {},
    public serviceProducts: Product[] = [],
    public stockProducts: Product[] = [],
    public questions: Question[] = [],
    public regionDTOs: Region[] = [],
    public priceDTO: PriceDetails = {
      netPrice: 0,
      totalPrice: 0,
      price: 0,
      salePrice: 0,
      vat: 0,
      systemProfitPercentage: 0,
      salePercentage: 0
    },
    public active: boolean = true
  ) {}

  static fromJson(json?: any): PackageModel {
    return new PackageModel(
      json?.id ?? '',
      json?.vat ?? '',
      json?.country ?? '',
      json?.countryCode ?? '',
      json?.city ?? '',
      json?.packageName ?? '',
      json?.currency ?? 'USD',
      json?.extraDetails ?? {},
      json?.serviceProducts?.map((p: any) => ({...p})) ?? [],
      json?.stockProducts?.map((p: any) => ({...p})) ?? [],
      json?.questions?.map((q: any) => ({...q})) ?? [],
      json?.regionDTOs?.map((r: any) => RegionModel.fromJson(r)) ?? [],
      json?.priceDTO ?? {
        netPrice: 0,
        totalPrice: 0,
        price: 0,
        salePrice: 0,
        vat: 0,
        systemProfitPercentage: 0,
        salePercentage: 0
      },
      json?.active ?? true
    );
  }

  toJson(): any {
    return {
      id: this.id,
      vat: this.vat,
      country: this.country,
      countryCode: this.countryCode,
      city: this.city,
      packageName: this.packageName,
      currency: this.currency,
      extraDetails: this.extraDetails,
      serviceProducts: this.serviceProducts,
      stockProducts: this.stockProducts,
      questions: this.questions,
      regionDTOs: this.regionDTOs.map(region => region.toJson ? region.toJson() : region),

      priceDTO: this.priceDTO,
      active: this.active
    };
  }
}

export class RegionModel implements Region {
  constructor(
    public id: string = '',
    public countryCode: string = '',
    public country: string = '',
    public city: string = ''
  ) {}

  static fromJson(json?: any): RegionModel {
    return new RegionModel(
      json?.id ?? '',
      json?.countryCode ?? '',
      json?.country ?? '',
      json?.city ?? ''
    );
  }

  toJson(): any {
    return {
      id: this.id,
      countryCode: this.countryCode,
      country: this.country,
      city: this.city
    };
  }
}