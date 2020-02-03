import {hot} from 'react-hot-loader/root';
import * as React from 'react';
import * as styles from './layout.scss';
import {Body} from './modules/body/Body';
import {Head} from './modules/head/Head';

export function LayoutComponent() {
    return (
        <div className={styles.main}>
            <Head/>
            <Body/>
        </div>
    );
}

export const Layout = hot(LayoutComponent);