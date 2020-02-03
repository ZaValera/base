import * as React from 'react';
import * as styles from './button.scss';

export function Button({text}: IProps) {
    return (
        <div className={styles.button}>
            {text || 'Push me, baby'}
        </div>
    );
}

interface IProps {
    text?: string;
}