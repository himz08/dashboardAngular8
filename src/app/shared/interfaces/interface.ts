export interface BuildingWiseData {       // common interface of buildingwise data
    name: string,
    id: number,
    totalCarSpace: number,
    totalBikeSpace: number,
    vacantCarSpace: number,
    vacantBikeSpace: number,
    totalCars: number,
    totalBikes: number,
    percentage?: number,
    carPayment : number,
    bikePayment : number,
    titleToDisplay?: string
  }
  
  export interface TotalCountDiv {
    iconNumber: number;
    data: number;
    subTitle: string
  }
  
  export interface combinedData {
    totalCarsToday: number;
    totalBikesToday: number;
    totalBikesInside: number;
    totalCarSpaceLeft: number;
    toalBikeSpaceLeft: number;
    totalCarsInside: number;
    totalCarPayment: number;
    toalBikePayment: number;
  }
  export interface TotalCountDivs extends Array<TotalCountDiv> { } // Arrya of type totalCountDiv
  export interface AllBuildingsData extends Array<BuildingWiseData> { } // Array of type buildingData