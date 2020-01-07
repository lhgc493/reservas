import { Hospedaje } from './hospedaje';
export class Socio {
    constructor(
        public nombre?: string,
        public img?: string,
        public usuario?: string,
        // tslint:disable-next-line: no-shadowed-variable
        public hospedaje?: string,
        // tslint:disable-next-line: variable-name
        public _id?: string
    ) { }
}
