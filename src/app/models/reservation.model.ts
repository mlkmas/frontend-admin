export interface Reservation {
  number: number;
  customer: {
    name: string;
  };
  arrivalTimeFrom?: string; // <-- Add this
  totalTransactionsAmount?: number; // <-- Add this
  verified?: boolean; // <-- If you're also using this
  lastReservationEvents?: {
    reservationStatus?: ReservationStatus;
  };
}

export class ReservationModel implements Reservation {
  constructor(
    public number: number = 0,
    public customer: { name: string } = { name: '' },
    public arrivalTimeFrom: string = '',
    public totalTransactionsAmount: number = 0,
    public verified: boolean = false,
    public lastReservationEvents: { reservationStatus?: ReservationStatus } = {}
  ) {}

  static fromJson(json?: any): ReservationModel {
    return new ReservationModel(
      json?.number ?? 0,
      json?.customer ?? { name: '' },
      json?.arrivalTimeFrom ?? '',
      json?.totalTransactionsAmount ?? 0,
      json?.verified ?? false,
      json?.lastReservationEvents ?? {}
    );
  }

  toJson(): any {
    return {
      number: this.number,
      customer: this.customer,
      arrivalTimeFrom: this.arrivalTimeFrom,
      totalTransactionsAmount: this.totalTransactionsAmount,
      verified: this.verified,
      lastReservationEvents: this.lastReservationEvents
    };
  }
}

export enum ReservationStatus {
  INITIALIZED = 'INITIALIZED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}
