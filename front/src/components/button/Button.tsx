import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import * as styles from './button.scss';


export function ButtonSimple() {
    return (
        <div className={styles.button}>
            Push me, baby
        </div>
    );
}

export const Button = hot(ButtonSimple);