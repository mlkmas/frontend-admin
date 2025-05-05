import { Region, RegionModel } from './package.model'; // Import Region and RegionModel

export interface PartnerDetails {
  id: string;
  nickName: string;
  preferredPhoneNumber: string;
  locale: Locale;
  homeLatitude: number;
  homeLongitude: number;
  workLatitude: number;
  workLongitude: number;
  coverPhotoUrl: string;
  isPhoneVerified: string;
  regions: Region[];
  user: UserDetails;
}

export class PartnerDetailsModel implements PartnerDetails {
  constructor(
    public id: string = '',
    public nickName: string = '',
    public preferredPhoneNumber: string = '',
    public locale: LocaleModel = new LocaleModel(), // Use LocaleModel instead of Locale
    public homeLatitude: number = 0,
    public homeLongitude: number = 0,
    public workLatitude: number = 0,
    public workLongitude: number = 0,
    public coverPhotoUrl: string = '',
    public isPhoneVerified: string = '',
    public regions: RegionModel[] = [], // Use RegionModel instead of Region
    public user: UserDetailsModel = new UserDetailsModel() // Use UserDetailsModel instead of UserDetails
  ) {}

  static fromJson(json?: any): PartnerDetailsModel {
    return new PartnerDetailsModel(
      json?.id ?? '',
      json?.nickName ?? '',
      json?.preferredPhoneNumber ?? '',
      LocaleModel.fromJson(json?.locale),
      json?.homeLatitude ?? 0,
      json?.homeLongitude ?? 0,
      json?.workLatitude ?? 0,
      json?.workLongitude ?? 0,
      json?.coverPhotoUrl ?? '',
      json?.isPhoneVerified ?? '',
      (json?.regions ?? []).map((region: any) => RegionModel.fromJson(region)),
      UserDetailsModel.fromJson(json?.user)
    );
  }

  toJson(): any {
    return {
      id: this.id,
      nickName: this.nickName,
      preferredPhoneNumber: this.preferredPhoneNumber,
      locale: this.locale.toJson(),
      homeLatitude: this.homeLatitude,
      homeLongitude: this.homeLongitude,
      workLatitude: this.workLatitude,
      workLongitude: this.workLongitude,
      coverPhotoUrl: this.coverPhotoUrl,
      isPhoneVerified: this.isPhoneVerified,
      regions: this.regions.map(region => region.toJson()),
      user: this.user.toJson()
    };
  }
}

export interface Locale {
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
}

export class LocaleModel implements Locale {
  constructor(
    public language: string = '',
    public displayName: string = '',
    public country: string = '',
    public variant: string = '',
    public script: string = '',
    public unicodeLocaleAttributes: string[] = [],
    public unicodeLocaleKeys: string[] = [],
    public displayLanguage: string = '',
    public displayScript: string = '',
    public displayCountry: string = '',
    public displayVariant: string = '',
    public extensionKeys: string[] = [],
    public iso3Language: string = '',
    public iso3Country: string = ''
  ) {}

  static fromJson(json?: any): LocaleModel {
    return new LocaleModel(
      json?.language ?? '',
      json?.displayName ?? '',
      json?.country ?? '',
      json?.variant ?? '',
      json?.script ?? '',
      json?.unicodeLocaleAttributes ?? [],
      json?.unicodeLocaleKeys ?? [],
      json?.displayLanguage ?? '',
      json?.displayScript ?? '',
      json?.displayCountry ?? '',
      json?.displayVariant ?? '',
      json?.extensionKeys ?? [],
      json?.iso3Language ?? '',
      json?.iso3Country ?? ''
    );
  }

  toJson(): any {
    return {
      language: this.language,
      displayName: this.displayName,
      country: this.country,
      variant: this.variant,
      script: this.script,
      unicodeLocaleAttributes: this.unicodeLocaleAttributes,
      unicodeLocaleKeys: this.unicodeLocaleKeys,
      displayLanguage: this.displayLanguage,
      displayScript: this.displayScript,
      displayCountry: this.displayCountry,
      displayVariant: this.displayVariant,
      extensionKeys: this.extensionKeys,
      iso3Language: this.iso3Language,
      iso3Country: this.iso3Country
    };
  }
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

export class UserDetailsModel implements UserDetails {
  constructor(
    public id: string = '',
    public methodUID: string = '',
    public name: string = '',
    public email: string = '',
    public photoUrl: string = '',
    public utcTimeZoneOffset: any = null,
    public fcmToken: string = '',
    public isAdmin: boolean = false,
    public isApproved: boolean = false,
    public isSuspended: boolean = false,
    public phoneNumber: string = '',
    public isPhoneVerified: string = '',
    public displayName: string = ''
  ) {}

  static fromJson(json?: any): UserDetailsModel {
    return new UserDetailsModel(
      json?.id ?? '',
      json?.methodUID ?? '',
      json?.name ?? '',
      json?.email ?? '',
      json?.photoUrl ?? '',
      json?.utcTimeZoneOffset ?? null,
      json?.fcmToken ?? '',
      json?.isAdmin ?? false,
      json?.isApproved ?? false,
      json?.isSuspended ?? false,
      json?.phoneNumber ?? '',
      json?.isPhoneVerified ?? '',
      json?.displayName ?? ''
    );
  }

  toJson(): any {
    return {
      id: this.id,
      methodUID: this.methodUID,
      name: this.name,
      email: this.email,
      photoUrl: this.photoUrl,
      utcTimeZoneOffset: this.utcTimeZoneOffset,
      fcmToken: this.fcmToken,
      isAdmin: this.isAdmin,
      isApproved: this.isApproved,
      isSuspended: this.isSuspended,
      phoneNumber: this.phoneNumber,
      isPhoneVerified: this.isPhoneVerified,
      displayName: this.displayName
    };
  }
}