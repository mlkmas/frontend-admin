import { Customer } from './customer.model'; 
import { Partner } from './partner.model';   

export interface Reservation {
    id: string;
    number: number;
    latitude: number;
    longitude: number;
    arrivalTimeFrom: string;
    arrivalTimeTo: string;
    reservationPaymentToken: string;
    isTimePassedChecked: boolean;
    isPartnerResponseTimePassedChecked: boolean;
    isPendingPayment: boolean;
    lastPartnerAssignTime: string;
    description: string;
    taskObject: TaskObject;
    feedback: Feedback;
    reservationEvents: ReservationEvent[];
    transactions: Transaction[];
    customer: Customer;
    active: boolean;
    timePassedChecked: boolean;
    partnerResponseTimePassedChecked: boolean;
    totalItemsPrice: number;
    pendingPayment: boolean;
    totalTransactionsAmount: number;
    lastReservationEvents: ReservationEvent;
    assignedPartners: Partner[];
  }
  
  export interface TaskObject {
    id: string;
    nickName: string;
    extraDetails: ExtraDetail[];
  }
  
  export interface ExtraDetail {
    id: string;
    propertyKey: string;
    propertyValue: string;
    taskObject: string;
  }
  
  export interface Feedback {
    id: string;
    message: string;
    feedbackType: FeedbackType;
    messageOfPartner: string;
    feedbackTypeOfPartner: FeedbackTypeOfPartner;
    feedbackStars: FeedbackStars;
    partnerLatitude: number;
    partnerLongitude: number;
    created: string;
  }
  
  export enum FeedbackType {
    GREAT_WORK_IS_DONE = 'GREAT_WORK_IS_DONE',
    // Add other possible values
  }
  
  export enum FeedbackTypeOfPartner {
    DONE = 'DONE',
    // Add other possible values
  }
  
  export enum FeedbackStars {
    ZERO_STARS = 'ZERO_STARS',
    ONE_STAR = 'ONE_STAR',
    // Add up to FIVE_STARS
  }
  
  export interface ReservationEvent {
    id: string;
    partnerId: string;
    customerId: string;
    reservationStatus: ReservationStatus;
    statusColor: string;
    statusText: string;
    statusExtraText: string;
    created: string;
  }
  
  export enum ReservationStatus {
    INITIALIZED = 'INITIALIZED',
    CONFIRMED = 'CONFIRMED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
  }
  
  export interface Transaction {
    amount: Amount;
    description: string;
    related_resources: any; // Consider creating a proper interface if structure is known
  }
  
  export interface Amount {
    currency: string;
    details: AmountDetails;
    total: string;
  }
  
  export interface AmountDetails {
    subtotal: string;
    shipping: string;
    shipping_discount: string;
  }
