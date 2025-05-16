export interface Location {
    id: string;
    latitude: number;
    longitude: number;
    timestamp: Date;
    speed?: number;
    heading?: number;
    battery?: number;
}

export interface Tracker {
    id: string;
    name: string;
    lastLocation: Location;
    lastUpdated: Date;
    isActive: boolean;
}

export interface TrackerHistory {
    trackerId: string;
    locations: Location[];
    startDate: Date;
    endDate: Date;
}
