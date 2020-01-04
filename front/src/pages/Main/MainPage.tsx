import * as React from 'react';
import * as styles from './mainPage.scss';
import {log} from 'common/src/utils';
import {SomeModule} from 'common/src/modules/someModule/SomeModule';


export function MainPage() {
    log('MainPage');

    const someModule = new SomeModule();
    someModule.log();

    return (
        <div className={styles.mainPage}>
            MainPage
        </div>
    );
}