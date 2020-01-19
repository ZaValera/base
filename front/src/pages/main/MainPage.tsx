import * as React from 'react';
import * as styles from './mainPage.scss';
import {Button} from 'src/components/button/Button';

export function MainPage() {
    return (
        <div className={styles.mainPage}>
            <span className={styles.text}>Your ad could be here</span>
            <Button/>
        </div>
    );
}

export default MainPage;