import * as React from 'react';

const Ctx = React.createContext(null);

export const Test = () => {
    const [a, setA] = React.useState(123);
    const [b, setB] = React.useState(321);

    return (
        <>
            <Ctx.Provider value={a}>
                <Ctx.Consumer>
                    {value => (
                        <div onClick={() => setA(value + 1)}>{value}</div>
                    )}
                </Ctx.Consumer>
            </Ctx.Provider>
            <Ctx.Provider value={b}>
                <Ctx.Consumer>
                    {value => (
                        <div onClick={() => setB(value + 1)}>{value}</div>
                    )}
                </Ctx.Consumer>
            </Ctx.Provider>
        </>
    );
};