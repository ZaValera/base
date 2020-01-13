import * as React from 'react';
import * as styles from './mainPage.scss';
import unicorn from 'assets/images/unicorn.png';

export function MainPage() {
    console.log(unicorn);
    return (
        <div className={styles.mainPage}>
            <img src={unicorn} className={styles.image}/>
        </div>
    );
}