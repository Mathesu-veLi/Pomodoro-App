import React from 'react';
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
    const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTime);

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, 1000);

    return (
        <div className="pomodoro">
            <h2>You are: working</h2>
            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button text="teste" onClick={() => console.log(1)}></Button>
                <Button text="teste" onClick={() => console.log(1)}></Button>
                <Button text="teste" onClick={() => console.log(1)}></Button>
            </div>
        </div>
    );
}
