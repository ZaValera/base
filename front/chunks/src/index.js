import {Page_1} from './pages/Page_1';
import {Page_2} from './pages/Page_2';

/*setTimeout(async function () {
    const PageModule = await import('./pages/Page_1');

    new PageModule.Page_1();
}, 1000);

setTimeout(async function () {
    const PageModule = await import('./pages/Page_2');

    new PageModule.Page_2();
}, 2000);*/


new Page_1();
new Page_2();