export interface PartnerDetails {
    id: string;
    nickName: string;
    preferredPhoneNumber: string;
    coverPhotoUrl: string;
    isPhoneVerified: string;
    regions: Region[];
    user: {
      id: string;
      name: string;
      email: string;
      photoUrl: string;
      displayName: string;
      isApproved: boolean;
      isSuspended: boolean;
    };
  }
  
  export interface Region {
    id: string;
    country: string;
    city: string;
  }
  