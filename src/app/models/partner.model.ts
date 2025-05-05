export interface Partner {
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
    number: number;
    stars: number;
    reviews: number;
    sendViaWhatsApp: boolean;
    sendViaNotification: boolean;
    displayName: string;
  }
  
  export class PartnerModel implements Partner {
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
      public number: number = 0,
      public stars: number = 0,
      public reviews: number = 0,
      public sendViaWhatsApp: boolean = false,
      public sendViaNotification: boolean = false,
      public displayName: string = ''
    ) {}
  
    static fromJson(json?: any): PartnerModel {
      return new PartnerModel(
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
        json?.number ?? 0,
        json?.stars ?? 0,
        json?.reviews ?? 0,
        json?.sendViaWhatsApp ?? false,
        json?.sendViaNotification ?? false,
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
        number: this.number,
        stars: this.stars,
        reviews: this.reviews,
        sendViaWhatsApp: this.sendViaWhatsApp,
        sendViaNotification: this.sendViaNotification,
        displayName: this.displayName
      };
    }
  }