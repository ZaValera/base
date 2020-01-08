import * as styles from './page.styl';
import {A} from '../modules/a/a';
import {ExtendedDummy} from '../modules/extendedDummy/ExtendedDummy';
import {Dummy} from '../modules/dummy/Dummy';

export class Page {
    constructor() {
        new A();
        new Dummy();
        new ExtendedDummy();

        console.log(styles);
    }
}