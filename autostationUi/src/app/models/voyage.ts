import { Bus } from "./bus";
import { DefaultVoyage } from "./default-voyage";

export interface Voyage {
    id: number;
    default_voyage: DefaultVoyage;
    bus: Bus;
    date_departure: Date;
    available_tickets: number;
}