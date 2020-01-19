import * as React from 'react';
import * as styles from './layout.scss';
import {Body} from './modules/body/Body';
import {Head} from './modules/head/Head';


export function Layout() {
    return (
        <div className={styles.main}>
            <Head/>
            <Body/>
        </div>
    );
}