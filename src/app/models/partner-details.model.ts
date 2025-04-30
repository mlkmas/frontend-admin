export interface PartnerDetails {
  id: string;
  nickName: string;
  preferredPhoneNumber: string;
  locale: {
      language: string;
      displayName: string;
      country: string;
      variant: string;
      script: string;
      unicodeLocaleAttributes: string[];
      unicodeLocaleKeys: string[];
      displayLanguage: string;
      displayScript: string;
      displayCountry: string;
      displayVariant: string;
      extensionKeys: string[];
      iso3Language: string;
      iso3Country: string;
  };
  homeLatitude: number;
  homeLongitude: number;
  workLatitude: number;
  workLongitude: number;
  coverPhotoUrl: string;
  isPhoneVerified: string;
  regions: Region[];
  user: UserDetails;
}

export interface Region {
  id: string;
  countryCode: string;
  country: string;
  city: string;
}

export interface UserDetails {
  id: string;
  methodUID: string;
  name: string;
  email: string;
  photoUrl: string;
  utcTimeZoneOffset: any;
  fcmToken: string;
  isAdmin: boolean;
  isApproved: boolean;
  isSuspended: boolean;
  phoneNumber: string;
  isPhoneVerified: string;
  displayName: string;
}