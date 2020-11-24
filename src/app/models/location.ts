import { IAddress } from './address';

export interface ILocation extends IAddress {
    name: string; // location -> name
    notes: string; // use side entrance, park in back, etc.
};