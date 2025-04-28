export interface Partner {
    id: string;
    methodUID: string;
    name: string;
    email: string;
    photoUrl: string;
    utcTimeZoneOffset: any; // or you can create a nested model if you want
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
  