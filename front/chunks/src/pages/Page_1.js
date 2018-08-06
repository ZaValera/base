import {Module_1} from '../modules/Module_1';
import {Module_2} from '../modules/Module_2';

export class Page_1 {
    constructor() {
        console.log('Page_1');
        new Module_1();
        new Module_2();
    }
}