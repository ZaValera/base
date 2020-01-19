import * as React from 'react';
import * as styles from './head.scss';
import alucard from 'front/assets/images/alucard.png';

export function Head() {
    return (
        <div className={styles.head}>
            <span className={styles.menu}>Main menu</span>
            <span className={styles.text}>Text is very long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long</span>
            <img className={styles.icon} src={alucard}/>
        </div>
    );
}