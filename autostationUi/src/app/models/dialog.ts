import { Voyage } from "./voyage";

export interface DialogData {
    type: number;
    amount: number;
    cost: number;
    voyage: Voyage
}

export class DialogOverview {
    type: number;
    amount: number;
    cost: number;
    voyage: Voyage;
}