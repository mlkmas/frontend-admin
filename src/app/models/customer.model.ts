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