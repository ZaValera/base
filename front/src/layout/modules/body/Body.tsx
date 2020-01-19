import * as React from 'react';
import {Route} from 'react-router-dom';
import * as styles from './body.scss';

const MainPage = React.lazy(() => import(
    /* webpackChunkName: "pages/MainPage" */
    'src/pages/Main/MainPage'
    )
);

const AdminPage = React.lazy(() => import(
    /* webpackChunkName: "pages/AdminPage" */
    'src/pages/admin/AdminPage'
    )
);

export function Body() {
    return (
        <div className={styles.body}>
            <React.Suspense fallback={<div>Loading...</div>}>
                <Route exact path='/' component={MainPage}/>
                <Route path='/admin' component={AdminPage}/>
            </React.Suspense>
        </div>
    );
}