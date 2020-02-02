import * as React from 'react';
import {Route} from 'react-router-dom';
import * as styles from './body.scss';

const {lazy, Suspense} = React;

const MainPage = lazy(() => import(
    /* webpackChunkName: "pages/MainPage" */
    'src/pages/main/MainPage'
    )
);

const AdminPage = lazy(() => import(
    /* webpackChunkName: "pages/AdminPage" */
    'src/pages/admin/AdminPage'
    )
);

export function Body() {
    return (
        <div className={styles.body}>
            <Suspense fallback={<div>Loading...</div>}>
                <Route exact path='/' component={MainPage}/>
                <Route path='/admin' component={AdminPage}/>
            </Suspense>
        </div>
    );
}