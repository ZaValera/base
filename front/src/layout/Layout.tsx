import * as React from 'react';
import * as styles from './layout.scss';
import {Body} from 'src/modules/body/Body';
import {Head} from 'src/modules/head/Head';


export function Layout() {
    return (
        <div className={styles.main}>
            <Head/>
            <Body/>
        </div>
    );
}