// Base interfaces remain pure without methods
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

// Implementation class with serialization methods
export class PackageModel implements Package {
  constructor(
    public id: string = '',
    public vat: string = '',
    public country: string = '',
    public countryCode: string = '',
    public city: string = '',
    public packageName: string = '',
    public currency: string = '',
    public extraDetails: Record<string, string> = {},
    public serviceProducts: ProductModel[] = [], // Use ProductModel instead of Product
    public stockProducts: ProductModel[] = [], // Use ProductModel instead of Product
    public questions: QuestionModel[] = [], // Use QuestionModel instead of Question
    public regionDTOs: RegionModel[] = [], // Use RegionModel instead of Region
    public priceDTO: PriceDetailsModel = new PriceDetailsModel(), // Use PriceDetailsModel
    public active: boolean = false
  ) {}

  static fromJson(json?: any): PackageModel {
    return new PackageModel(
      json?.id ?? '',
      json?.vat ?? '',
      json?.country ?? '',
      json?.countryCode ?? '',
      json?.city ?? '',
      json?.packageName ?? '',
      json?.currency ?? '',
      json?.extraDetails ?? {},
      (json?.serviceProducts ?? []).map((product: any) => ProductModel.fromJson(product)),
      (json?.stockProducts ?? []).map((product: any) => ProductModel.fromJson(product)),
      (json?.questions ?? []).map((question: any) => QuestionModel.fromJson(question)),
      (json?.regionDTOs ?? []).map((region: any) => RegionModel.fromJson(region)),
      PriceDetailsModel.fromJson(json?.priceDTO),
      json?.active ?? false
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
      serviceProducts: this.serviceProducts.map(product => product.toJson()),
      stockProducts: this.stockProducts.map(product => product.toJson()),
      questions: this.questions.map(question => question.toJson()),
      regionDTOs: this.regionDTOs.map(region => region.toJson()),
      priceDTO: this.priceDTO.toJson(),
      active: this.active
    };
  }
}

// Product interface remains pure
export interface Product {
  id: string;
  productCode: string;
  internalID: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  externalID: string;
  status: 'Publish' | 'Draft' | 'Archived';
  salePercentage: number;
  systemProfitPercentage: number;
  generalCosts: number;
}

// Product implementation class
export class ProductModel implements Product {
  constructor(
    public id: string = '',
    public productCode: string = '',
    public internalID: string = '',
    public name: string = '',
    public description: string = '',
    public price: number = 0,
    public currency: string = '',
    public externalID: string = '',
    public status: 'Publish' | 'Draft' | 'Archived' = 'Draft',
    public salePercentage: number = 0,
    public systemProfitPercentage: number = 0,
    public generalCosts: number = 0
  ) {}

  static fromJson(json?: any): ProductModel {
    return new ProductModel(
      json?.id ?? '',
      json?.productCode ?? '',
      json?.internalID ?? '',
      json?.name ?? '',
      json?.description ?? '',
      json?.price ?? 0,
      json?.currency ?? '',
      json?.externalID ?? '',
      json?.status ?? 'Draft',
      json?.salePercentage ?? 0,
      json?.systemProfitPercentage ?? 0,
      json?.generalCosts ?? 0
    );
  }

  toJson(): any {
    return {
      id: this.id,
      productCode: this.productCode,
      internalID: this.internalID,
      name: this.name,
      description: this.description,
      price: this.price,
      currency: this.currency,
      externalID: this.externalID,
      status: this.status,
      salePercentage: this.salePercentage,
      systemProfitPercentage: this.systemProfitPercentage,
      generalCosts: this.generalCosts
    };
  }
}

// Repeat this pattern for all other interfaces:
// 1. Keep the original interface
// 2. Create a Model class that implements it and adds serialization methods

export interface Question {
  id: string;
  text: string;
  type: number;
  expectedAnswer: string;
  mandatory: boolean;
}

export class QuestionModel implements Question {
  constructor(
    public id: string = '',
    public text: string = '',
    public type: number = 0,
    public expectedAnswer: string = '',
    public mandatory: boolean = false
  ) {}

  static fromJson(json?: any): QuestionModel {
    return new QuestionModel(
      json?.id ?? '',
      json?.text ?? '',
      json?.type ?? 0,
      json?.expectedAnswer ?? '',
      json?.mandatory ?? false
    );
  }

  toJson(): any {
    return {
      id: this.id,
      text: this.text,
      type: this.type,
      expectedAnswer: this.expectedAnswer,
      mandatory: this.mandatory
    };
  }
}

export interface Region {
  id: string;
  countryCode: string;
  country: string;
  city: string;
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

export interface PriceDetails {
  netPrice: number;
  totalPrice: number;
  price: number;
  salePrice: number;
  vat: number;
  systemProfitPercentage: number;
  salePercentage: number;
}

export class PriceDetailsModel implements PriceDetails {
  constructor(
    public netPrice: number = 0,
    public totalPrice: number = 0,
    public price: number = 0,
    public salePrice: number = 0,
    public vat: number = 0,
    public systemProfitPercentage: number = 0,
    public salePercentage: number = 0
  ) {}

  static fromJson(json?: any): PriceDetailsModel {
    return new PriceDetailsModel(
      json?.netPrice ?? 0,
      json?.totalPrice ?? 0,
      json?.price ?? 0,
      json?.salePrice ?? 0,
      json?.vat ?? 0,
      json?.systemProfitPercentage ?? 0,
      json?.salePercentage ?? 0
    );
  }

  toJson(): any {
    return {
      netPrice: this.netPrice,
      totalPrice: this.totalPrice,
      price: this.price,
      salePrice: this.salePrice,
      vat: this.vat,
      systemProfitPercentage: this.systemProfitPercentage,
      salePercentage: this.salePercentage
    };
  }
}

export interface PackageForm {
  packageName: string;
  currency: string;
  active: boolean;
  questions: QuestionForm[];
}

export class PackageFormModel implements PackageForm {
  constructor(
    public packageName: string = '',
    public currency: string = '',
    public active: boolean = false,
    public questions: QuestionFormModel[] = [] // Use QuestionFormModel
  ) {}

  static fromJson(json?: any): PackageFormModel {
    return new PackageFormModel(
      json?.packageName ?? '',
      json?.currency ?? '',
      json?.active ?? false,
      (json?.questions ?? []).map((question: any) => QuestionFormModel.fromJson(question))
    );
  }

  toJson(): any {
    return {
      packageName: this.packageName,
      currency: this.currency,
      active: this.active,
      questions: this.questions.map(question => question.toJson())
    };
  }
}

export interface QuestionForm {
  text: string;
  type: number;
  mandatory: boolean;
}

export class QuestionFormModel implements QuestionForm {
  constructor(
    public text: string = '',
    public type: number = 0,
    public mandatory: boolean = false
  ) {}

  static fromJson(json?: any): QuestionFormModel {
    return new QuestionFormModel(
      json?.text ?? '',
      json?.type ?? 0,
      json?.mandatory ?? false
    );
  }

  toJson(): any {
    return {
      text: this.text,
      type: this.type,
      mandatory: this.mandatory
    };
  }
}