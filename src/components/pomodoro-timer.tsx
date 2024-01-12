import React from 'react';
import { useInterval } from '../hooks/use-interval';

interface IProps {
    defaultPomodoroTime: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PomodoroTimer(props: IProps): JSX.Element {
    const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTime);

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, 1000);

    return <div>Hello World {mainTime}!</div>;
}
