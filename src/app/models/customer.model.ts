// customer.model.ts
export interface Customer {
  id: string;
  methodUID: string;
  name: string;
  email: string;
  photoUrl: string;
  phoneNumber: string;
  displayName: string;
  isAdmin: boolean;
  isApproved: boolean;
  isSuspended: boolean;
  number: number;
}

export class CustomerModel {
  constructor(
    public id: string = '',
    public methodUID: string = '',
    public name: string = '',
    public email: string = '',
    public photoUrl: string = '',
    public phoneNumber: string = '',
    public displayName: string = '',
    public isAdmin: boolean = false,
    public isApproved: boolean = false,
    public isSuspended: boolean = false,
    public number: number = 0
  ) {}

  static fromJson(json: any): CustomerModel {
    return new CustomerModel(
      json?.id ?? '',
      json?.methodUID ?? '',
      json?.name ?? json?.displayName ?? 'No Name',
      json?.email ?? 'No Email',
      json?.photoUrl ?? '',
      json?.phoneNumber ?? 'No Phone',
      json?.displayName ?? '',
      json?.isAdmin ?? false,
      json?.isApproved ?? false,
      json?.isSuspended ?? false,
      json?.number ?? 0
    );
  }

  toJson(): any {
    return {
      id: this.id,
      methodUID: this.methodUID,
      name: this.name,
      email: this.email,
      photoUrl: this.photoUrl,
      phoneNumber: this.phoneNumber,
      displayName: this.displayName,
      isAdmin: this.isAdmin,
      isApproved: this.isApproved,
      isSuspended: this.isSuspended,
      number: this.number
    };
  }
}
