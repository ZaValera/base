import './style/index.styl';
import {StartPage} from './pages/start/StartPage';
import {intersection} from 'lodash';
import * as moment from 'moment';

StartPage();

console.log(intersection([1,2,3], [3,2,4]));
console.log(moment());