import { Bus } from "./bus";
import { DefaultVoyage } from "./default-voyage";
import { Driver } from "./driver";

export interface Voyage {
    id: number;
    default_voyage: DefaultVoyage;
    bus: Bus;
    date_departure: Date;
    available_tickets: number;
    driver: Driver;
    bus_id: number;
    driver_id: number;
}