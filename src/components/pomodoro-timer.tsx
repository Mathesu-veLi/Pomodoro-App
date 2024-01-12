import React, { useEffect, useState } from 'react';
import { useInterval } from '../hooks/use-interval';

import { Button } from './button';
import { Timer } from './timer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

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
    const [resting, setResting] = useState(false);

    useEffect(() => {
        if (working) document.body.classList.add('working');
        if (resting) document.body.classList.remove('working');
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
        setResting(false);
        setMainTime(props.defaultPomodoroTime);
        audioStartWorking.play();
    };

    const configureRest = (long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);

        setMainTime(long ? props.longRestTime : props.shortRestTime);

        audioStopWorking.play();
    };

    return (
        <div className="pomodoro">
            <h2>You are: working</h2>
            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button text="Work" onClick={() => configureWork()}></Button>
                <Button text="Rest" onClick={() => configureRest(false)}></Button>
                <Button
                    className={!working && !resting ? 'hidden' : 'active'}
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
