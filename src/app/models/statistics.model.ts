export interface SystemStatistics {
  customersNumber: number;
  partnersNumber: number;
  carsNumber: number;
  totalReservations: number;
  problematicReservations: number;
  closedReservations: number;
}

export class SystemStatisticsModel implements SystemStatistics {
  constructor(
    public customersNumber: number = 0,
    public partnersNumber: number = 0,
    public carsNumber: number = 0,
    public totalReservations: number = 0,
    public problematicReservations: number = 0,
    public closedReservations: number = 0
  ) {}

  static fromJson(json?: any): SystemStatisticsModel {
    return new SystemStatisticsModel(
      json?.customersNumber ?? 0,
      json?.partnersNumber ?? 0,
      json?.carsNumber ?? 0,
      json?.totalReservations ?? 0,
      json?.problematicReservations ?? 0,
      json?.closedReservations ?? 0
    );
  }

  toJson(): any {
    return {
      customersNumber: this.customersNumber,
      partnersNumber: this.partnersNumber,
      carsNumber: this.carsNumber,
      totalReservations: this.totalReservations,
      problematicReservations: this.problematicReservations,
      closedReservations: this.closedReservations
    };
  }
}