import * as styles from './page.styl';
import {Dummy} from '../modules/dummy/Dummy';

export class Page {
    constructor() {
        new Dummy();

        console.log(styles);
    }
}