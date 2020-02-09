import * as React from 'react';

export const compose = function (...args: Function[]): Function {
    return function (component: React.Component | Function) {
        let current = component;

        for (let i = args.length; i--;) {
            const item = args[i];

            current = item(current);
        }

        return current;
    }
};