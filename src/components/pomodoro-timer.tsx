import React, { useEffect, useState } from 'react';
import { useInterval } from '../hooks/use-interval';

import { Button } from './button';
import { Timer } from './timer';

interface IProps {
    defaultPomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PomodoroTimer(props: IProps): JSX.Element {
    const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);

    useEffect(() => {
        if (working) document.body.classList.add('working');
    }, [working]);

    useInterval(
        () => {
            setMainTime(mainTime - 1);
        },
        timeCounting ? 1000 : null,
    );

    const configureWork = () => {
        setTimeCounting(true);
        setWorking(true);
    };

    return (
        <div className="pomodoro">
            <h2>You are: working</h2>
            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button text="Work" onClick={() => configureWork()}></Button>
                <Button text="teste" onClick={() => console.log(1)}></Button>
                <Button
                    text={timeCounting ? 'Pause' : 'Play'}
                    onClick={() => (working ? setTimeCounting(!timeCounting) : configureWork())}
                ></Button>
            </div>

            <div className="details">
                <p>teste</p>
                <p>teste</p>
                <p>teste</p>
                <p>teste</p>
            </div>
        </div>
    );
}
