export class Base {
    constructor() {}

    export(): any {
        return JSON.parse(JSON.stringify(this));
    }
}