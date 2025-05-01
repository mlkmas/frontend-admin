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
  