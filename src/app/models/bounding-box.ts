import { Base } from './base';

export class BoundingBox extends Base {
    latBottomLeft: number;
    lonBottomLeft: number;
    
    latTopRight: number;
    lonTopRight: number;
};