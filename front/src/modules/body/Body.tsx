import * as React from 'react';
import {Route} from 'react-router-dom';
import * as styles from './body.scss';
import {MainPage} from 'front/pages/Main/MainPage';

export function Body() {
    return (
        <div className={styles.body}>
            <Route path='/' component={MainPage}/>
        </div>
    );
}