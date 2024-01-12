import React from 'react';
import { useInterval } from '../hooks/use-interval';

import { Button } from './button';
import { Timer } from './timer';

interface IProps {
    defaultPomodoroTime: number;
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
            <Button text="teste" onClick={() => console.log(1)}></Button>
            <Timer mainTime={mainTime} />
        </div>
    );
}
